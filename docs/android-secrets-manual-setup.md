# Android Secrets Manual Setup Guide

A step-by-step guide to manually set up Android signing secrets for GitHub Actions without using the automated script.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Part 1: Android Keystore Setup](#part-1-android-keystore-setup)
  - [Option A: Create New Keystore (Recommended for New Projects)](#option-a-create-new-keystore-recommended-for-new-projects)
  - [Option B: Use Existing Keystore](#option-b-use-existing-keystore)
- [Part 2: Convert Keystore to Base64](#part-2-convert-keystore-to-base64)
- [Part 3: Required GitHub Secrets](#part-3-required-github-secrets)
- [Part 4: Optional Distribution Services](#part-4-optional-distribution-services)
  - [Option A: Firebase App Distribution](#option-a-firebase-app-distribution)
  - [Option B: Diawi Distribution](#option-b-diawi-distribution)
- [Part 5: GitHub Secrets Summary](#part-5-github-secrets-summary)
- [Optional sections](#optional-sections)
- [Part 6: Verification Commands](#part-6-verification-commands)
- [Part 7: Troubleshooting](#part-7-troubleshooting)

## Prerequisites

Before starting, ensure you have:

- ✅ **Java JDK installed** (for `keytool` command), you can see how to install in Troubleshooting section
- ✅ **OpenSSL or base64 command** (for encoding)
- ✅ **Your app's package name** decided (e.g., `com.yourcompany.yourapp`)

### Verify Prerequisites

```bash
# Check if keytool is available
keytool -help

# Check if base64 is available (macOS/Linux)
base64 --help

# Alternative on some systems
openssl base64 -help
```

---

## Part 1: Android Keystore Setup

### Option A: Create New Keystore (Recommended for New Projects)

#### Step 1: Gather Required Information

You'll need to decide on:

- **Package Name**: Your app's unique identifier (e.g., `js.software.ui`)
- **Key Alias**: A name for your signing key (e.g., `release-key`, `upload-key`)
- **Passwords**: Keystore password and key password (can be the same)

#### Step 2: Generate Keystore Name

Convert your package name to a meaningful keystore filename:

- `js.software.ui` → for example `jssoftware-ui-release.jks`

#### Step 3: Create the Keystore

```bash
# Replace the values with your information
PACKAGE_NAME="js.software.ui"
KEY_ALIAS="release-key"
KEYSTORE_NAME="jssoftware-ui-release.jks"
KEYSTORE_PASSWORD="android123"
KEY_PASSWORD="android123"       # Can be same as keystore password

# Generate the keystore
keytool -genkeypair \
    -v \
    -keystore "$KEYSTORE_NAME" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -alias "$KEY_ALIAS" \
    -storepass "$KEYSTORE_PASSWORD" \
    -keypass "$KEY_PASSWORD" \
    -dname "CN=Release Key, OU=Development, O=AndroidApp, L=Unknown, ST=Unknown, C=US"
```

**Certificate Details Explanation:**

- `CN`: Common Name (can be anything)
- `OU`: Organizational Unit (e.g., Development)
- `O`: Organization (your company name)
- `L`: Locality (city)
- `ST`: State/Province
- `C`: Country code (e.g., US, CA, UK)

> 💡 **Note**: Certificate details are metadata only and don't affect app functionality or signing security. Generic values are perfectly fine for production use.

#### Step 4: Verify Keystore Creation

```bash
# List keystore contents
keytool -list -v -keystore "$KEYSTORE_NAME" -storepass "$KEYSTORE_PASSWORD"

# Check file size (should be > 1KB)
ls -la "$KEYSTORE_NAME"
```

### Option B: Use Existing Keystore

#### Step 1: Locate Your Keystore

Search common locations:

```bash
# Search current directory
find . -name "*.jks" -o -name "*.keystore" 2>/dev/null

# Search home directory
find ~ -name "*.jks" -o -name "*.keystore" 2>/dev/null

# Search common Android locations
find ~/Android* -name "*.jks" -o -name "*.keystore" 2>/dev/null
find ~/.android -name "*.jks" -o -name "*.keystore" 2>/dev/null
```

#### Step 2: Verify Keystore Access

```bash
EXISTING_KEYSTORE="/path/to/your/keystore.jks"
KEYSTORE_PASSWORD="your_password"

# List available aliases
keytool -list -keystore "$EXISTING_KEYSTORE" -storepass "$KEYSTORE_PASSWORD"

# Verify specific alias
KEY_ALIAS="your_key_alias"
keytool -list -keystore "$EXISTING_KEYSTORE" -storepass "$KEYSTORE_PASSWORD" -alias "$KEY_ALIAS"
```

---

## Part 2: Convert Keystore to Base64

### Step 1: Convert Keystore

```bash
# Method 1: Using base64 command (macOS/Linux)
base64 -i "$KEYSTORE_NAME" | tr -d '\n' > keystore_base64.txt

# Method 2: Using openssl (if base64 command not available)
openssl base64 -in "$KEYSTORE_NAME" -out keystore_base64.txt -A

# Method 3: One-liner to get base64 string
KEYSTORE_BASE64=$(base64 -i "$KEYSTORE_NAME" | tr -d '\n')
echo $KEYSTORE_BASE64
```

### Step 2: Verify Base64 Encoding

```bash
# Test decoding to verify integrity
base64 -d keystore_base64.txt > test_keystore.jks

# Compare file sizes (should be identical)
ls -la "$KEYSTORE_NAME" test_keystore.jks

# Verify the decoded keystore works
keytool -list -keystore test_keystore.jks -storepass "$KEYSTORE_PASSWORD"

# Clean up test file
rm test_keystore.jks
```

### Step 3: Get Base64 String

```bash
# Read the base64 string (this goes into GitHub secrets)
cat keystore_base64.txt
```

---

## Part 3: Required GitHub Secrets

Add these three **required** secrets to your GitHub repository:

### Secret 1: ANDROID_KEY_BASE64

**Where to get it**: From Step 2 above (the base64-encoded keystore)

**How to add**:

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `ANDROID_KEY_BASE64`
4. Value: Paste the entire base64 string from `keystore_base64.txt`

```bash
# Get the value:
cat keystore_base64.txt
```

### Secret 2: ANDROID_KEY_PASSWORD

**Where to get it**: The password you used for the key (usually same as keystore password)

**Value**: Your key password (e.g., `android123`)

### Secret 3: ANDROID_KEY_ALIAS

**Where to get it**: The alias name you used when creating the keystore

**Value**: Your key alias (e.g., `release-key`)

```bash
# Verify your alias name:
keytool -list -keystore "$KEYSTORE_NAME" -storepass "$KEYSTORE_PASSWORD"
```

---

## Part 4: Optional Distribution Services

### Option A: Firebase App Distribution

#### Step 1: Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Note your **Project ID** from Project Settings

#### Step 2: Register Android App

1. In Firebase Console, click "Add app" → Android
2. Enter your package name (e.g., `com.yourcompany.yourapp`)
3. Download `google-services.json` its totally optional and we do not need for now, but in future it could be useful to use Firebase features
4. Copy the **App ID** (format: `1:123456789:android:abcdef123456`)

#### Step 3: Create Service Account

We already have service account, instruction is for case when accounts have not been created yet

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to IAM & Admin → Service Accounts
4. Click "Create Service Account"
5. Add "Firebase App Distribution Admin" role
6. Create and download JSON key file

#### Step 4: Convert Service Account to Base64

```bash
SERVICE_ACCOUNT_FILE="/path/to/your/service-account.json"

# Convert to base64
base64 -i "$SERVICE_ACCOUNT_FILE" | tr -d '\n' > firebase_service_account_base64.txt

# Get the value:
cat firebase_service_account_base64.txt
```

#### Step 5: Firebase GitHub Secrets

Add these optional secrets:

- **FIREBASE_PROJECT_ID**: Your Firebase project ID
- **FIREBASE_APP_ID**: Your Android app ID from Firebase
- **FIREBASE_SERVICE_ACCOUNT_KEY**: Base64-encoded service account JSON

#### Step 6: Firebase Testers (Repository Variable)

**Note**: This is a repository **VARIABLE**, not a secret.

1. Go to GitHub repository → Settings → Secrets and variables → Actions → Variables tab
2. Add variable: `FIREBASE_TESTERS`
3. Value: Comma-separated emails (e.g., `tester1@example.com,tester2@example.com`)

### Option B: Diawi Distribution

Diawi provides simple OTA distribution with direct download links.

#### Step 1: Get Diawi API Token

1. Go to [Diawi.com](https://www.diawi.com/)
2. Create account or log in
3. Navigate to Account → API Access
4. Copy your API token

#### Step 2: Add Diawi Secret

- **DIAWI_TOKEN**: Your Diawi API token

---

## Part 5: GitHub Secrets Summary

### Required Secrets (Android Signing)

| Secret Name            | Source                       | Example                       |
| ---------------------- | ---------------------------- | ----------------------------- |
| `ANDROID_KEY_BASE64`   | Base64-encoded keystore file | `MIIKf...` (very long string) |
| `ANDROID_KEY_PASSWORD` | Keystore/key password        | `android123`                  |
| `ANDROID_KEY_ALIAS`    | Key alias name               | `release-key`                 |

### Optional Secrets (Distribution)

| Secret Name                    | Source               | Purpose               |
| ------------------------------ | -------------------- | --------------------- |
| `FIREBASE_PROJECT_ID`          | Firebase Console     | Firebase distribution |
| `FIREBASE_APP_ID`              | Firebase Console     | Firebase distribution |
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Google Cloud Console | Firebase distribution |
| `DIAWI_TOKEN`                  | Diawi.com            | Diawi distribution    |

### Repository Variables (Not Secrets)

| Variable Name      | Source           | Purpose                |
| ------------------ | ---------------- | ---------------------- |
| `FIREBASE_TESTERS` | Your tester list | Firebase tester emails |

---

## Optional sections

## Part 6: Verification Commands

### Verify Your Setup

```bash
# 1. Check keystore is valid
keytool -list -v -keystore "$KEYSTORE_NAME" -storepass "$KEYSTORE_PASSWORD" -alias "$KEY_ALIAS"

# 2. Check base64 encoding/decoding works
echo "$KEYSTORE_BASE64" | base64 -d > verify_keystore.jks
keytool -list -keystore verify_keystore.jks -storepass "$KEYSTORE_PASSWORD"
rm verify_keystore.jks

# 3. Check file sizes match
original_size=$(wc -c < "$KEYSTORE_NAME")
decoded_size=$(echo "$KEYSTORE_BASE64" | base64 -d | wc -c)
echo "Original: $original_size bytes, Decoded: $decoded_size bytes"
```

### Test Firebase Service Account (Optional)

```bash
# If you have Firebase CLI installed
firebase projects:list --token "$(cat firebase_service_account_base64.txt | base64 -d | jq -r .private_key)"
```

---

## Part 7: Troubleshooting

### Common Issues

#### "keytool: command not found"

```bash
# Install Java JDK
# macOS:
brew install openjdk

# Ubuntu/Debian:
sudo apt-get install default-jdk

# Verify installation:
java -version
keytool -help
```

#### "base64: command not found"

```bash
# Use openssl instead:
openssl base64 -in "$KEYSTORE_NAME" -out keystore_base64.txt -A
```

#### Invalid keystore password

```bash
# List all aliases without password to check if keystore is valid:
keytool -list -keystore "$KEYSTORE_NAME"
# This will prompt for password
```

#### Base64 string too long for GitHub

```bash
# Check base64 string length:
wc -c keystore_base64.txt

# GitHub secrets support up to 64KB, so this should not be an issue for keystores
```

### Validation Checklist

- [ ] Keystore file exists and is accessible
- [ ] Can list keystore contents with correct password
- [ ] Base64 encoding/decoding produces identical file
- [ ] All required GitHub secrets added
- [ ] Optional distribution secrets added (if needed)
- [ ] Repository variables added (Firebase testers)
- [ ] Workflow runs successfully

---
