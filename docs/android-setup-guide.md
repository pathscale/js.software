# Android Build Setup Guide

This guide walks you through the preparation steps needed before setting up GitHub Actions for Android release builds.

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

### **Automatic Naming**

Generates meaningful keystore names based on your package name:

- `com.jssoftware.ui` → `jssoftware-ui-release.jks`
- `com.company.myapp` → `company-myapp-release.jks`
- `org.example.app` → `example-app-release.jks`

### **Certificate Metadata Options**

Certificate details (organization name, country, etc.) are **optional metadata**:

- **Don't affect app functionality** or security
- **Generic defaults** work perfectly for production
- **Custom details** available if required by your organization

### **Secure Clipboard Process**

On macOS, secrets are copied to clipboard one by one to prevent copy/paste errors.

## Troubleshooting

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

## Verification Checklist

Before running your GitHub Actions workflow, ensure:

- ✅ Android SDK and NDK are properly installed
- ✅ Rust Android targets are installed
- ✅ `bun run tauri android init` completed successfully
- ✅ Debug build works: `bun run tauri android build --debug`
- ✅ Keystore is generated and backed up securely
- ✅ GitHub secrets are configured correctly (3 secrets):
  - `ANDROID_KEY_BASE64`
  - `ANDROID_KEY_PASSWORD`
  - `ANDROID_KEY_ALIAS`
- ✅ Release build works locally: `bun run tauri android build`
- ✅ Your keystore file is saved with a meaningful name (e.g., `yourapp-release.jks`)
