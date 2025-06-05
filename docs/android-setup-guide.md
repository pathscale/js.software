# Android Build Setup Guide

## Table of Contents

**🚀 Quick Start**

- [Prerequisites](#prerequisites)
- [Step-by-Step Setup](#step-1-set-up-android-development-environment)
- [Generate Keystore & Secrets](#step-5-generate-release-keystore-and-credentials)

**📖 Reference**

- [Using in Other Projects](#-using-in-other-projects)
- [Distribution Services](#distribution-services-optional)
- [Troubleshooting](#troubleshooting)
- [Verification Checklist](#verification-checklist)

**⚙️ Advanced**

- [Script Features](#script-features)
- [Security Best Practices](#security-best-practices)

---

This guide walks you through the preparation steps needed before setting up GitHub Actions for Android release builds.

**Important note**
The Android CI/CD workflow features **automatic project detection** - it dynamically extracts all configuration from your `tauri.conf.json` file, making it reusable across different projects with zero configuration changes.

### **What's Automatically Detected:**

- ✅ **Bundle ID** (`identifier` from tauri.conf.json)
- ✅ **App Name** (`productName` from tauri.conf.json)
- ✅ **Keystore Name** (generated from Bundle ID using naming convention)
- ✅ **Artifact Name** (generated from App Name)
- ✅ **Release Notes** (uses dynamic App Name)

### **⚠️ CRITICAL: Do Not Modify After Setup**

Once you've run the `android-secrets-setup.sh` script and generated your GitHub secrets:

**DO NOT CHANGE** the following in your `tauri.conf.json`:

- **`identifier`** field - changing this will break keystore detection
- **`productName`** field - changing this will break artifact naming

The workflow **automatically generates keystore names** from your bundle identifier. If you change the identifier after setup, the workflow won't find your keystore file.

### **Example: Automatic Keystore Detection**

- **Bundle ID**: `software.js.ui` → **Keystore**: `js-ui-release.jks`
- **Bundle ID**: `com.mycompany.myapp` → **Keystore**: `mycompany-myapp-release.jks`
- **Bundle ID**: `org.example.app` → **Keystore**: `example-app-release.jks`

## Overview

Before you can build signed Android APKs in GitHub Actions, you need to:

1. Set up Android development environment
2. Initialize the Tauri Android project
3. Generate a keystore and signing key
4. Export the keystore for GitHub Actions

## Prerequisites

- **Java Development Kit (JDK) 17 or higher**
- **Android Studio** (recommended) or Android SDK command line tools
- **Android NDK** (version 25.2.9519653 or compatible)
- **Rust with Android targets**: Run the following commands:
  ```bash
  rustup target add aarch64-linux-android
  rustup target add armv7-linux-androideabi
  rustup target add i686-linux-android
  rustup target add x86_64-linux-android
  ```

## Step 1: Set Up Android Development Environment

### Option A: Using Android Studio (Recommended)

1. **Download and install Android Studio** from [developer.android.com](https://developer.android.com/studio)

2. **Open Android Studio** and complete the setup wizard

3. **Install required SDK components**:

   - Go to **Tools → SDK Manager**
   - In **SDK Platforms** tab, install **Android 13 (API 33)** or higher
   - In **SDK Tools** tab, install:
     - Android SDK Build-Tools
     - Android NDK (Side by side) - version 25.2.9519653
     - Android SDK Command-line Tools

4. **Set environment variables** (add to your shell profile):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
   export ANDROID_HOME=$HOME/Android/Sdk          # Linux
   export ANDROID_NDK_HOME=$ANDROID_HOME/ndk/25.2.9519653
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

### Option B: Command Line Tools Only

1. **Download Android SDK command line tools** from [developer.android.com](https://developer.android.com/studio#command-tools)

2. **Install required packages**:
   ```bash
   sdkmanager "platform-tools" "platforms;android-33" "build-tools;34.0.0"
   sdkmanager "ndk;25.2.9519653"
   ```

## Step 2: Verify Java Installation

Ensure you have JDK 17 or higher:

```bash
java -version
javac -version
```

If you need to install Java:

- **macOS**: `brew install openjdk@17`
- **Ubuntu/Debian**: `sudo apt install openjdk-17-jdk`
- **Windows**: Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or use OpenJDK

## Step 3: Initialize Tauri Android Project

Run the following command in your project root:

```bash
bun run tauri android init
```

This command will:

- Add Android-specific configuration to your Tauri project
- Generate an Android project in `src-tauri/gen/android/`
- Set up the Android build environment
- Create necessary Gradle files

## Step 4: Test Debug Build (Optional but Recommended)

Before generating release credentials, verify your setup works:

```bash
bun run tauri android build --debug
```

This should:

- Build your frontend
- Compile the Rust backend for Android
- Generate a debug APK in `src-tauri/gen/android/app/build/outputs/apk/debug/`

> **Note**: Debug APKs are signed with a debug certificate and cannot be distributed. This step just verifies your development environment is working.

## Step 5: Generate Release Keystore and Credentials

Now you're ready to create a production keystore and generate credentials for GitHub Actions.

1. **Run the Android secrets setup script**:

   ```bash
   ./scripts/android-secrets-setup.sh
   ```

2. **Choose your keystore option**:

   - **Option 1**: Create a new keystore (recommended for new projects)
   - **Option 2**: Use an existing keystore (script will automatically search for `.jks` and `.keystore` files)

3. **For new keystores, follow the script prompts**:

   - **Package name**: Enter your app's package name (e.g., `com.jssoftware.ui`)
   - **Key alias**: Use a descriptive name (e.g., `release-key`)
   - **Password setup**: Choose simple password (`android123`) or custom password
   - **Certificate details**: Choose generic defaults or enter custom details
     - **Generic option**: Uses sensible defaults (recommended for most users)
     - **Custom option**: Enter your organization details if required
   - **Keystore naming**: Script automatically generates meaningful names like `jssoftware-ui-release.jks`

4. **For existing keystores**:

   - Script searches common locations and shows available keystores
   - Select from the list or enter a custom path
   - Script shows available aliases to help you choose the right one

5. **The script will automatically**:

   - Generate/locate your keystore file
   - Convert it to base64 format
   - Create GitHub secrets ready for copy/paste
   - Use step-by-step clipboard copying (macOS) to avoid errors
   - Save keystore with a meaningful name to your project directory

6. **Copy secrets to GitHub** (the script guides you through this):
   - Go to your GitHub repository
   - Navigate to **Settings → Secrets and variables → Actions**
   - Add these 3 secrets as the script prompts:
     - `ANDROID_KEY_BASE64` (base64-encoded keystore file)
     - `ANDROID_KEY_PASSWORD` (password for both keystore and key)
     - `ANDROID_KEY_ALIAS` (the key alias name)

## Step 6: Verify Release Build

Test that your setup works with a signed release build:

```bash
# This builds a signed release APK (release mode is default)
bun run tauri android build
```

Look for the signed APK in:

- `src-tauri/gen/android/app/build/outputs/apk/release/`
- `src-tauri/gen/android/app/build/outputs/bundle/release/` (if building AAB)

## Script Features

### **Smart Keystore Discovery**

The script automatically searches for existing keystores in common locations:

- Current directory
- Home directory (`~/`)
- Documents, Desktop, Downloads folders
- Android-specific directories (`~/Android/keystores/`, `~/keystores/`)
- Project directories (`./keystores/`, `./signing/`)

### **🎯 Automatic Naming (Workflow Compatible)**

Generates keystore names that match the CI/CD workflow's detection logic:

- `com.jssoftware.ui` → `jssoftware-ui-release.jks`
- `com.company.myapp` → `company-myapp-release.jks`
- `org.example.app` → `example-app-release.jks`
- `software.js.ui` → `js-ui-release.jks`

**⚠️ Important**: The generated keystore name **must match** your `tauri.conf.json` identifier. The script asks for your package name specifically to ensure compatibility.

### **Certificate Metadata Options**

Certificate details (organization name, country, etc.) are **optional metadata**:

- **Don't affect app functionality** or security
- **Generic defaults** work perfectly for production
- **Custom details** available if required by your organization

### **Secure Clipboard Process**

On macOS, secrets are copied to clipboard one by one to prevent copy/paste errors.

## Troubleshooting

### **Dynamic Detection Issues**

**"Keystore not found in CI"**:

- Verify your `tauri.conf.json` has the correct `identifier`
- Ensure the identifier matches the package name you used in `android-secrets-setup.sh`
- Check that your keystore was generated with the correct naming convention

**"Generated keystore name doesn't match"**:

- The workflow generates keystore names from your bundle ID
- If you changed the `identifier` in `tauri.conf.json` after running the setup script, regenerate your secrets
- Use the exact same package name in both `tauri.conf.json` and the setup script

**"APK artifact has wrong name"**:

- Artifact names are generated from the `productName` in `tauri.conf.json`
- Changing `productName` after setup is safe but will change artifact names

### **Traditional Issues**

### "Android SDK not found"

- Verify `ANDROID_HOME` environment variable is set correctly
- Check that Android SDK is properly installed
- Restart your terminal after setting environment variables

### "NDK not found"

- Ensure Android NDK is installed: `sdkmanager "ndk;25.2.9519653"`
- Verify `ANDROID_NDK_HOME` points to the correct NDK version
- Some systems may need `NDK_HOME` instead of `ANDROID_NDK_HOME`

### "Rust target not found"

- Install Android targets: `rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android`
- Update Rust: `rustup update`

### Tauri Android init fails

- Ensure your `tauri.conf.json` has a valid `identifier` (e.g., `com.yourcompany.yourapp`)
- Check that all prerequisites are installed
- Try running with verbose output: `bun run tauri android init -v`

### Gradle build errors

- Update Android Gradle Plugin and Gradle wrapper
- Clean build: `cd src-tauri/gen/android && ./gradlew clean`
- Check Java version compatibility

### Keystore generation fails

- Ensure `keytool` is in your PATH (comes with Java)
- Use simple passwords without special characters if you encounter issues
- Verify you have write permissions to the keystore location

## Important Notes

- **Keystore Security**:

  - **Never commit your keystore file to version control**
  - **Keep multiple secure backups** of your keystore
  - **If you lose your keystore**, you cannot update your published app
  - **Store keystore password securely** (password manager recommended)

- **Key Validity**:

  - **Use 25+ years validity** for production keystores
  - **Google Play requires** keys valid until at least October 22, 2033
  - **Plan for key rotation** well before expiration

- **App Signing**:

  - **Release APKs** are signed with your keystore
  - **Debug APKs** use a temporary debug keystore
  - **Google Play App Signing** can provide additional security (optional)

- **Distribution**:
  - **Signed APKs** can be installed on any Android device
  - **Unsigned/debug APKs** cannot be distributed publicly
  - **Google Play** requires signed APKs for upload

## Next Steps

After completing this setup:

1. **Your Android GitHub Action workflow** (`build-android-release.yml`) will build signed release APKs
2. **Built APK files** will be available as workflow artifacts with meaningful names
3. **You can distribute** these APKs directly to testers or upload to app stores
4. **Your keystore** is safely stored with a descriptive name for easy identification

## 🔄 **Using in Other Projects**

The workflow is now **fully reusable**! To use it in another Tauri project:

### **Step 1: Copy Workflow File**

```bash
# Copy the workflow to your new project
cp .github/workflows/build-android-release.yml /path/to/new-project/.github/workflows/
```

### **Step 2: Generate New Keystore & Secrets**

```bash
# In your new project directory
cd /path/to/new-project
./scripts/android-secrets-setup.sh
```

### **Step 3: Set Up Distribution Services** (Optional)

- Follow the Firebase App Distribution setup for your new Firebase project
- Add the same GitHub secrets with new values for your new project

### **Step 4: Update Build Command** (If Different)

If your new project uses different build commands, update line ~52:

```yaml
- name: Build frontend
  run: npm run build # or yarn build, pnpm build, etc.
```

**That's it!** The workflow will automatically:

- ✅ Detect your project's bundle ID and app name
- ✅ Generate the correct keystore filename
- ✅ Create properly named artifacts
- ✅ Use your app name in release notes

## Next Steps

For Google Play Store distribution:

- Create a Google Play Developer account ($25 one-time fee)
- Follow Google Play's app publishing guidelines
- Consider using Android App Bundle (AAB) format for smaller downloads
- Set up Google Play App Signing for additional security

## Security Best Practices

- **Keystore Storage**: Keep your keystore in a secure, backed-up location
- **Password Management**: Use a password manager for keystore passwords
- **Access Control**: Limit who has access to production keystores
- **CI/CD Security**: GitHub secrets are encrypted and only accessible during builds
- **Key Rotation**: Plan for eventual key updates (advanced topic)

## Distribution Services (Optional)

After successfully building signed APKs, you can distribute them to testers using various services. The workflow includes integration with **Firebase App Distribution** and **Diawi** for seamless distribution.

### Firebase App Distribution Setup

Firebase App Distribution is Google's service for distributing pre-release versions of your Android apps to trusted testers.

#### Prerequisites

- **Google account** with access to Firebase Console
- **Firebase project** (can be existing or new)
- **Service account** with App Distribution permissions

#### Step 1: Create/Configure Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/

2. **Create or select a project**:

   - Click "Add project" for new project
   - Or select existing project from the list

3. **Configure project settings**:
   - Enter project name (e.g., "JS Software UI")
   - Choose whether to enable Google Analytics (optional)
   - Complete project creation

#### Step 2: Add Android App to Firebase

1. **In Firebase Console**, click "Add app" → Android icon

2. **Register your app**:

   - **Android package name**: Enter your app's identifier from `tauri.conf.json`
     - Example: `software.js.ui`
   - **App nickname**: Optional descriptive name (e.g., "JS Software UI Android")
   - **Debug signing certificate**: Skip this for now

3. **Download google-services.json** (optional):

   - This step can be skipped if you're only using App Distribution
   - The file is only required if you want to integrate Firebase SDK features

4. **Skip "Add Firebase SDK" section**:

   - ✅ **For App Distribution only**: You can skip this entirely
   - ❌ **Only needed if**: You want Firebase features inside your app (Analytics, Crashlytics, etc.)

5. **Complete setup** by clicking "Continue to console"

#### Step 3: Set Up App Distribution

1. **In Firebase Console**, go to your project

2. **Navigate to App Distribution**:

   - Left sidebar → "Release & Monitor" → "App Distribution"

3. **Get your App ID**:
   - Click on your Android app in App Distribution
   - Copy the **App ID** (format: `1:123456789:android:abcdef123456`)
   - **Save this** - you'll need it for GitHub secrets

#### Step 4: Create Service Account

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Select your Firebase project** from the project dropdown

3. **Navigate to Service Accounts**:

   - Left menu → "IAM & Admin" → "Service Accounts"

4. **Create service account**:

   - Click "Create Service Account"
   - **Name**: `android-app-distribution`
   - **Description**: `Service account for Android App Distribution CI/CD`
   - Click "Create and Continue"

5. **Assign roles**:
   - Click "Select a role"
   - Search for and select: **"Firebase App Distribution Admin"**
   - Click "Continue" → "Done"

#### Step 5: Generate Service Account Key

1. **In Service Accounts list**, click on your new service account

2. **Go to Keys tab** → "Add Key" → "Create new key"

3. **Choose JSON format** and click "Create"

4. **Download the JSON file** - this contains your service account credentials

5. **Convert to base64** for GitHub Secrets:

   ```bash
   # macOS/Linux
   base64 -i path/to/your-service-account.json | tr -d '\n'

   # Copy the output - this is your FIREBASE_SERVICE_ACCOUNT_KEY
   ```

#### Step 6: Configure GitHub Secrets

Add these secrets to your GitHub repository (**Settings** → **Secrets and variables** → **Actions**):

1. **FIREBASE_SERVICE_ACCOUNT_KEY**:

   - Value: The base64-encoded service account JSON from Step 5

2. **FIREBASE_PROJECT_ID**:

   - Value: Your Firebase project ID (found in Firebase Console → Project Settings)

3. **FIREBASE_APP_ID**:
   - Value: The App ID from Step 3 (format: `1:123456789:android:abcdef123456`)

#### Step 7: Add Testers (Optional)

To automatically distribute to specific testers, add this **repository variable**:

1. **Go to GitHub repository** → **Settings** → **Secrets and variables** → **Actions** → **Variables tab**

2. **Add new variable**:
   - **Name**: `FIREBASE_TESTERS`
   - **Value**: Comma-separated email list (e.g., `tester1@example.com,tester2@example.com`)

#### Step 8: Test Distribution

1. **Run your workflow** (`build-android-release.yml`)

2. **Check Firebase Console** → **App Distribution** → **Releases**:
   - You should see your new release listed
   - Testers will receive email notifications

### Diawi Setup

Diawi is a simple service for distributing iOS and Android apps directly via download links. Perfect for quick testing and bypassing app store restrictions.

#### Prerequisites

- **Diawi account** (free tier available)
- **API token** from Diawi

#### Step 1: Create Diawi Account

1. **Go to Diawi**: https://www.diawi.com/

2. **Sign up** for a free account or log in

3. **Verify your email** if required

#### Step 2: Get API Token

1. **In Diawi dashboard**, go to **Account** → **API Access**

2. **Generate or copy your API token**

3. **Save the token** - you'll need it for GitHub secrets

#### Step 3: Configure GitHub Secrets

Add this secret to your GitHub repository (**Settings** → **Secrets and variables** → **Actions**):

1. **DIAWI_TOKEN**:
   - Value: Your Diawi API token from Step 2

#### Step 4: Test Upload

1. **Run your workflow** (`build-android-release.yml`)

2. **Check workflow logs** for Diawi section:
   - Look for the download URL (format: `https://i.diawi.com/HASH`)
   - Share this URL with testers

#### Diawi Features

- ✅ **Direct download links**: No app store needed
- ✅ **QR codes**: Easy mobile scanning
- ✅ **Install instructions**: Automatic per-device
- ✅ **Access control**: Password protection available
- ✅ **Analytics**: Download tracking
- ✅ **Cross-platform**: Works for both Android and iOS

#### Usage Tips

- **Free tier limitations**: Limited uploads per month, consider paid plans for heavy usage
- **Download expiration**: Links expire after set time (configurable)
- **Device compatibility**: Automatically detects device type and provides appropriate instructions
- **Testing workflow**: Perfect for internal testing before store submission

### Distribution Comparison

| Feature               | Firebase App Distribution          | Diawi                      |
| --------------------- | ---------------------------------- | -------------------------- |
| **Cost**              | Free (part of Firebase)            | Free tier + paid plans     |
| **Setup complexity**  | Medium (requires Firebase project) | Simple (just API token)    |
| **Tester management** | Advanced (groups, permissions)     | Basic (link sharing)       |
| **Analytics**         | Comprehensive                      | Basic                      |
| **Integration**       | Deep Google ecosystem              | Standalone service         |
| **Notifications**     | Email + in-app                     | Email only                 |
| **Best for**          | Professional team testing          | Quick sharing & prototypes |

### Troubleshooting Distribution

#### Firebase Issues

- **"App not found"**: Verify `FIREBASE_APP_ID` matches your Firebase Console
- **"Permission denied"**: Check service account has "Firebase App Distribution Admin" role
- **"Invalid service account"**: Verify base64 encoding of service account JSON
- **"No testers specified"**: Add `FIREBASE_TESTERS` variable or use Firebase Console to add testers

#### Diawi Issues

- **"Invalid token"**: Check `DIAWI_TOKEN` secret is correct
- **"Upload failed"**: Verify APK is signed and under size limits
- **"Processing timeout"**: Large APKs may take time, check manually using job ID URL
- **"Download not working"**: Some corporate networks block Diawi, try mobile data

## Verification Checklist

Before running your GitHub Actions workflow, ensure:

### **Core Setup Requirements**

- ✅ Android SDK and NDK are properly installed
- ✅ Rust Android targets are installed
- ✅ `bun run tauri android init` completed successfully
- ✅ Debug build works: `bun run tauri android build --debug`
- ✅ Release build works locally: `bun run tauri android build`

### **🎯 Dynamic Configuration Requirements**

- ✅ `src-tauri/tauri.conf.json` has valid `identifier` (e.g., `software.js.ui`)
- ✅ `src-tauri/tauri.conf.json` has valid `productName` (e.g., `JS Software UI`)
- ✅ Package name in `android-secrets-setup.sh` **exactly matches** the `identifier`
- ✅ Generated keystore name follows convention (e.g., `js-ui-release.jks`)

### **GitHub Secrets**

- ✅ GitHub secrets are configured correctly (3 required secrets):
  - `ANDROID_KEY_BASE64`
  - `ANDROID_KEY_PASSWORD`
  - `ANDROID_KEY_ALIAS`

### **Storage & Backup**

- ✅ Keystore is generated and backed up securely
- ✅ Your keystore file is saved with a meaningful name (e.g., `yourapp-release.jks`)

**Optional - Distribution Services:**

- ✅ Firebase App Distribution (if using):
  - `FIREBASE_SERVICE_ACCOUNT_KEY`
  - `FIREBASE_PROJECT_ID`
  - `FIREBASE_APP_ID`
  - `FIREBASE_TESTERS` (repository variable, optional)
- ✅ Diawi (if using):
  - `DIAWI_TOKEN`
