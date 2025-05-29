# iOS Build Setup Guide

This guide walks you through the preparation steps needed before setting up GitHub Actions for iOS builds.

## Overview

Before you can build iOS apps in GitHub Actions, you need to:

1. Create a local development certificate in Xcode
2. Initialize the Tauri iOS project
3. Generate a provisioning profile in Xcode
4. Export the certificate and profile for GitHub Actions

## Prerequisites

- **macOS** (iOS development requires macOS)
- **Xcode** installed from App Store
- **Xcode Command Line Tools**: Run `xcode-select --install`
- **Apple ID** (free or paid Apple Developer account)
- **Rust with iOS target**: Run `rustup target add aarch64-apple-ios`

## Step 1: Create Development Certificate in Xcode

1. **Open Xcode**
2. **Go to Xcode → Settings** (or Preferences in older versions)
3. **Click on "Accounts" tab**
4. **Add your Apple ID**:
   - Click the "+" button
   - Select "Apple ID"
   - Sign in with your Apple ID
5. **Create Certificate**:
   - Select your Apple ID in the list
   - Click "Manage Certificates..."
   - Click the "+" button
   - Select "Apple Development"
   - Click "Done"

> **Note**: If you're using a free Apple Developer account, certificates expire after 7 days and apps can only be installed on your registered devices.

## Step 2: Initialize Tauri iOS Project

Run the following command in your project root:

```bash
bun run tauri ios init
```

This command will:

- Add iOS-specific configuration to your Tauri project
- Generate an Xcode project in `src-tauri/gen/apple/`
- Set up the iOS build environment

## Step 3: Configure Signing in Xcode

1. **Open the generated Xcode project**:

   ```bash
   open src-tauri/gen/apple/app.xcodeproj
   ```

2. **Select your app target** in the project navigator (usually named after your app)

3. **Go to "Signing & Capabilities" tab**

4. **Configure signing**:

   - Check "Automatically manage signing"
   - Select your **Team** (your Apple ID)
   - Verify the **Bundle Identifier** matches your app (e.g., `com.jssoftware.ui`)

5. **Generate Provisioning Profile**:

   - Xcode will automatically create a provisioning profile
   - You should see "Provisioning Profile: Xcode Managed Profile" appear
   - If you see any errors, resolve them by following Xcode's suggestions

6. **Test the setup** (optional but recommended):
   ```bash
   bun run tauri ios build --debug
   ```

## Step 4: Export Certificates and Profiles

Now you're ready to run the setup script that will export your certificates and provisioning profiles for GitHub Actions.

1. **Run the setup script**:

   ```bash
   ./scripts/ios-secrets-setup-v2.sh
   ```

2. **Follow the script prompts**:

   - It will find your development certificate
   - It will locate your provisioning profile
   - It will convert both to base64 format
   - It will generate a file with GitHub secrets

3. **Copy the secrets to GitHub**:
   - Go to your GitHub repository
   - Navigate to **Settings → Secrets and variables → Actions**
   - Add each secret from the generated file:
     - `APPLE_TEAM_ID`
     - `IOS_DEVELOPMENT_CERTIFICATE`
     - `IOS_DEVELOPMENT_CERTIFICATE_PASSWORD`
     - `IOS_ADHOC_PROVISIONING_PROFILE`

## Troubleshooting

### "No development certificates found"

- Make sure you completed Step 1 correctly
- Try running `security find-identity -p codesigning -v` to verify certificates exist

### "No provisioning profiles found"

- Make sure you opened the Xcode project and configured signing
- Check that Xcode successfully created a managed profile

### Tauri iOS init fails

- Ensure you have the iOS Rust target: `rustup target add aarch64-apple-ios`
- Make sure your `tauri.conf.json` is properly configured
- Try running `bun tauri ios init` directly instead of through npm script

### Certificate export fails

- Make sure you're using the correct password
- Try using a simple password without special characters
- Verify the certificate exists in your Keychain Access

## Important Notes

- **Free Developer Account Limitations**:

  - Apps expire after 7 days
  - Can only install on registered devices
  - Limited to 3 apps per week

- **Security**:

  - The generated secrets file contains sensitive information
  - Delete it after copying secrets to GitHub
  - Never commit certificates or profiles to your repository

- **Certificate Renewal**:
  - Development certificates expire after 1 year (paid) or 7 days (free)
  - You'll need to repeat this process when they expire

## Next Steps

After completing this setup:

1. Your iOS GitHub Action workflow should be able to build and sign your app
2. Built `.ipa` files will be available as workflow artifacts
3. You can download and install them on registered devices (for testing)

For production releases, you'll need a paid Apple Developer account and distribution certificates.
