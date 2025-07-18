# Firebase App Distribution Setup

## Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project or select existing
3. Note **Project ID** from Project Settings

## Register Android App

1. Firebase Console → Add app → Android
2. Enter package name (e.g., `com.yourcompany.yourapp`)
3. Copy **App ID** (format: `1:123456789:android:abcdef123456`)

## Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. IAM & Admin → Service Accounts → Create Service Account
4. Add "Firebase App Distribution Admin" role
5. Create and download JSON key file

## Convert Service Account

```bash
SERVICE_ACCOUNT_FILE="/path/to/service-account.json"

# Convert to base64
base64 -i "$SERVICE_ACCOUNT_FILE" | tr -d '\n' > firebase_service_account_base64.txt

# Get value
cat firebase_service_account_base64.txt
```

## Add GitHub Secrets

Go to GitHub repository → Settings → Secrets and variables → Actions

**FIREBASE_PROJECT_ID**

**FIREBASE_APP_ID**

**FIREBASE_SERVICE_ACCOUNT_KEY**

```bash
# Value from:
cat firebase_service_account_base64.txt
```

## Add Testers (Optional)

Go to GitHub repository → Settings → Secrets and variables → Actions → **Variables** tab

**FIREBASE_TESTERS**

```bash
# Value: comma-separated emails
# Example: tester1@example.com,tester2@example.com
```

## Run Distribution Workflow

**Automatic (Recommended):**

- Runs automatically after successful "Build Signed Android APK"
- No user action needed

**Manual:**

1. Go to GitHub → Actions → "Distribute Android to Firebase"
2. Click "Run workflow"
3. Leave "Build workflow run ID" empty (uses latest build)
4. Add custom release notes (optional)

**Manual with specific build:**

1. Find build run ID from "Build Signed Android APK" workflow
2. Enter run ID in "Build workflow run ID" field

**Requirements:**

- Must have a successful Android build first
- Build creates APK artifact that distribution downloads
- Distribution fails if no build artifact found
