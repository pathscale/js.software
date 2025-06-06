# iOS Build Setup Guide

This guide walks you through setting up iOS builds in GitHub Actions using our unified setup script and reusable workflow.

## Overview

This setup supports two workflows:

- **Development Mode**: For personal testing and development
- **Distribution Mode**: For sharing with external testers via OTA distribution

The process works for both individual developers and team collaboration scenarios.

## Prerequisites

- **macOS** (iOS development requires macOS)
- **Xcode** installed from App Store
- **Xcode Command Line Tools**: Run `xcode-select --install`
- **Apple ID** (free or paid Apple Developer account)
- **Rust with iOS target**: Run `rustup target add aarch64-apple-ios`
- **Bun/Node.js** for the Tauri project

## Important: Required Tauri Configuration

Before running the workflow, ensure your `src-tauri/tauri.conf.json` has these required fields properly configured:

```json
{
  "identifier": "your.app.bundle.id",
  "productName": "Your App Name"
  // ... other configuration
}
```

### Required Fields:

- **`identifier`**: Your app's bundle ID (e.g., `com.yourcompany.appname`)

  - Must be unique and follow reverse domain naming convention
  - Will be used for provisioning profile matching and Xcode configuration
  - Example: `"software.js.ui"`, `"com.mycompany.myapp"`

- **`productName`**: Your app's display name (e.g., `"My Awesome App"`)
  - Used for IPA file naming in the build process
  - Spaces are automatically converted to underscores for file names
  - Example: `"JS Software UI"` becomes `JS_Software_UI_Distribution.ipa`

**⚠️ Important**: The workflow automatically detects these values and configures the build accordingly. Without these fields properly set, the build will fail.

## Step 1: Choose Your Workflow Type

### Development Mode

- ✅ **Use Case**: Personal testing, internal development
- ✅ **Certificate**: iPhone Developer certificates
- ✅ **Setup**: Simpler, works with automatic signing
- ✅ **Devices**: Limited to devices in your personal Apple ID
- ✅ **Account**: Works with free Apple Developer accounts

### Distribution Mode

- 🚀 **Use Case**: Sharing with external testers, OTA distribution
- 🚀 **Certificate**: iPhone Distribution certificates
- 🚀 **Setup**: Requires ad-hoc provisioning profiles
- 🚀 **Devices**: Can distribute to multiple testers via Diawi/TestFlight
- 🚀 **Account**: Requires paid Apple Developer account

> **Choose Distribution Mode** if you plan to share builds with testers or teammates.

## Step 2: Certificate and Profile Setup

### Option A: You Have Certificate/Profile Files (Team Collaboration)

If a teammate shared certificate (.p12) and profile (.mobileprovision) files with you:

1. **Save the files** to a known location (Downloads folder)
2. **Run the unified setup script**:
   ```bash
   ./scripts/ios-secrets-setup-unified.sh
   ```
3. **Choose your workflow type** (Development or Distribution)
4. **For certificates**: Choose "Install a certificate file (.p12) that I received"
5. **For profiles**: Choose "I have the profile file(s) ready to install"
6. **Follow the guided installation** - the script will help you install them

### Option B: Create Your Own Certificates and Profiles

#### Create Development Certificate in Xcode

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
   - Select "Apple Development" (or "Apple Distribution" for distribution builds)
   - Click "Done"

#### Initialize Tauri iOS Project

Run the following command in your project root:

```bash
bun run tauri ios init
```

This command will:

- Add iOS-specific configuration to your Tauri project
- Generate an Xcode project in `src-tauri/gen/apple/`
- Set up the iOS build environment

#### Configure Signing in Xcode

1. **Open the generated Xcode project**:

   ```bash
   open src-tauri/gen/apple/app.xcodeproj
   ```

2. **Select your app target** in the project navigator

3. **Go to "Signing & Capabilities" tab**

4. **Configure signing**:

   - Check "Automatically manage signing"
   - Select your **Team** (your Apple ID)
   - Verify the **Bundle Identifier** matches your app

5. **Generate Provisioning Profile**:

   - Xcode will automatically create a provisioning profile
   - You should see "Provisioning Profile: Xcode Managed Profile" appear

6. **Test the setup** (optional but recommended):
   ```bash
   bun run tauri ios build --debug
   ```

## Step 3: Generate GitHub Secrets

Run the unified setup script:

```bash
./scripts/ios-secrets-setup-unified.sh
```

### The Script Will:

1. **Ask for workflow type** (Development vs Distribution)
2. **Find or install certificates** with smart detection
3. **Find or install provisioning profiles** with recommendations
4. **Show profile recommendations**:
   - 🌟 **HIGHLY RECOMMENDED**: Perfect match for your workflow
   - ⭐ **RECOMMENDED**: Good match
   - ✓ **SUITABLE**: Usable option
5. **Convert everything to base64** format
6. **Copy secrets to clipboard one by one** (macOS)

### Generated Secrets:

**Development Mode:**

- `APPLE_TEAM_ID`
- `IOS_DEVELOPMENT_CERTIFICATE`
- `IOS_DEVELOPMENT_CERTIFICATE_PASSWORD`
- `IOS_ADHOC_PROVISIONING_PROFILE`

**Distribution Mode:**

- `APPLE_TEAM_ID`
- `IOS_DISTRIBUTION_CERTIFICATE`
- `IOS_DISTRIBUTION_CERTIFICATE_PASSWORD`
- `IOS_ADHOC_PROVISIONING_PROFILE`

### Step-by-Step GitHub Setup:

The script will copy each secret to your clipboard (macOS) and guide you through:

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click **"New repository secret"**
4. Paste the secret name and value
5. Repeat for each secret

## Step 4: Optional Features

### Diawi Integration (Optional)

For OTA distribution to testers, you can optionally add:

- **`DIAWI_TOKEN`**: Get from [diawi.com](https://www.diawi.com/)
- Enables automatic upload and shareable links
- **Can be substituted** with other OTA services in the future

### Future OTA Services

The workflow is designed to be flexible. Diawi can be replaced with:

- TestFlight (requires App Store Connect API)
- Firebase App Distribution
- Custom OTA solutions

## Step 5: Using in Other Projects (Reusability)

This setup is **fully reusable**! To use in another Tauri iOS project:

1. **Copy the workflow file**: `.github/workflows/build-ios-distribution.yml`
2. **Copy the setup script**: `scripts/ios-secrets-setup-unified.sh`
3. **Run the script** to generate project-specific secrets
4. **The workflow auto-detects**:
   - Bundle ID from `src-tauri/tauri.conf.json`
   - App name from Tauri configuration
   - Current bundle ID in Xcode project (no hardcoded values!)

**No manual configuration needed** - everything is read from your project files!

## Team Collaboration Workflow

### For the Certificate Owner (e.g., Account Holder):

1. **Run the setup script** once to generate secrets
2. **Share with teammates**:
   - Certificate file (.p12)
   - Provisioning profile (.mobileprovision)
   - Setup script (`ios-secrets-setup-unified.sh`)

### For Team Members:

1. **Receive files** from certificate owner
2. **Run the setup script**
3. **Choose "I have files ready to install"**
4. **The script guides through installation**
5. **Generate their own GitHub secrets**

### Security Best Practices:

- **Share via secure channels** (password managers, encrypted archives)
- **Rotate credentials periodically**
- **Use separate certificates for CI** (Apple allows 3 distribution certificates)
- **Never commit certificates** to version control

## Troubleshooting

### "No certificates found after installation"

- Verify the .p12 file was installed correctly
- Check Keychain Access to see if certificate appears
- Try installing via Keychain Access manually: File → Import Items

### "No provisioning profiles found"

- Double-click the .mobileprovision file to install
- Check if it appears in Xcode: Settings → Accounts → Download Manual Profiles
- Verify the profile matches your bundle ID

### Script fails with "Profile not suitable"

- The profile might be for a different bundle ID
- Check if you're using Development profile for Distribution workflow (or vice versa)
- Generate a new profile with correct type and bundle ID

### Certificate export fails

- Use simple passwords without special characters
- The script offers default password "ios123" for GitHub Actions
- Verify certificate exists with: `security find-identity -p codesigning -v`

### Build fails in GitHub Actions

- Verify all 4 secrets are correctly added to GitHub
- Check that certificate and profile match (same team ID)
- Ensure bundle ID in secrets matches your Tauri config

## Important Notes

### Free vs Paid Apple Developer Accounts

**Free Account Limitations:**

- Apps expire after 7 days
- Can only install on registered devices (up to 3 devices)
- Limited to 3 apps per week
- No TestFlight distribution

**Paid Account Benefits:**

- 1-year certificate validity
- 100 devices for ad-hoc distribution
- TestFlight access
- App Store distribution

### Security Considerations

- **Certificates are sensitive**: Never share publicly or commit to git
- **Rotate regularly**: Update certificates and passwords periodically
- **Team access**: Consider using separate CI certificates
- **GitHub secrets are encrypted**: Only accessible during workflow runs

### Certificate Renewal

- **Development certificates**: Expire after 1 year (paid) or 7 days (free)
- **Provisioning profiles**: Expire after 1 year
- **Renewal process**: Re-run this setup guide when certificates expire

## Next Steps

After completing this setup:

1. **GitHub Actions workflows** can automatically build and sign your iOS app
2. **Built IPAs** are available as workflow artifacts
3. **Optional Diawi integration** provides OTA distribution links
4. **Team members** can use the same setup with shared credentials
5. **Other projects** can reuse the same workflow files

The workflow automatically detects your project configuration and works across any Tauri iOS project 🚀

## Firebase App Distribution (Optional)

After successfully building signed IPAs, you can distribute them to testers using Firebase App Distribution. The iOS workflow includes integration with **Firebase App Distribution** for seamless distribution to your testing team.

### Overview

Firebase App Distribution is Google's service for distributing pre-release versions of your iOS apps to trusted testers. It provides:

- ✅ **Automatic email notifications** to testers when new builds are available
- ✅ **Centralized tester management** with groups and permissions
- ✅ **Release notes and version tracking**
- ✅ **Deep integration** with other Firebase services
- ✅ **Free tier** with generous limits

### Prerequisites

- **Google account** with access to Firebase Console
- **Firebase project** (can be existing or new)
- **Service account** with App Distribution permissions

### Step 1: Create/Configure Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/

2. **Create or select a project**:

   - Click "Add project" for new project
   - Or select existing project from the list

3. **Configure project settings**:
   - Enter project name (e.g., "JS Software UI")
   - Choose whether to enable Google Analytics (optional)
   - Complete project creation

### Step 2: Add iOS App to Firebase

1. **In Firebase Console**, click "Add app" → iOS icon

2. **Register your app**:

   - **iOS bundle ID**: Enter your app's identifier from `tauri.conf.json`
     - Example: `software.js.ui`
   - **App nickname**: Optional descriptive name (e.g., "JS Software UI iOS")
   - **App Store ID**: Skip this for now (only needed for App Store apps)

3. **Download GoogleService-Info.plist** (optional):

   - This step can be skipped if you're only using App Distribution
   - The file is only required if you want to integrate Firebase SDK features

4. **Skip "Add Firebase SDK" section**:

   - ✅ **For App Distribution only**: You can skip this entirely
   - ❌ **Only needed if**: You want Firebase features inside your app (Analytics, Crashlytics, etc.)

5. **Complete setup** by clicking "Continue to console"

### Step 3: Set Up App Distribution

1. **In Firebase Console**, go to your project

2. **Navigate to App Distribution**:

   - Left sidebar → "Release & Monitor" → "App Distribution"

3. **Get your App ID**:
   - Click on your iOS app in App Distribution
   - Copy the **App ID** (format: `1:123456789:ios:abcdef123456`)
   - **Save this** - you'll need it for GitHub secrets

### Step 4: Create Service Account

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Select your Firebase project** from the project dropdown

3. **Navigate to Service Accounts**:

   - Left menu → "IAM & Admin" → "Service Accounts"

4. **Create service account**:

   - Click "Create Service Account"
   - **Name**: `ios-app-distribution`
   - **Description**: `Service account for iOS App Distribution CI/CD`
   - Click "Create and Continue"

5. **Assign roles**:
   - Click "Select a role"
   - Search for and select: **"Firebase App Distribution Admin"**
   - Click "Continue" → "Done"

### Step 5: Generate Service Account Key

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

### Step 6: Configure GitHub Secrets

Add these secrets to your GitHub repository (**Settings** → **Secrets and variables** → **Actions**):

1. **FIREBASE_SERVICE_ACCOUNT_KEY**:

   - Value: The base64-encoded service account JSON from Step 5

2. **FIREBASE_PROJECT_ID**:

   - Value: Your Firebase project ID (found in Firebase Console → Project Settings)

3. **FIREBASE_APP_ID_IOS**:
   - Value: The iOS App ID from Step 3 (format: `1:123456789:ios:abcdef123456`)

### Step 7: Add Testers (Optional)

To automatically distribute to specific testers, add this **repository variable**:

1. **Go to GitHub repository** → **Settings** → **Secrets and variables** → **Actions** → **Variables tab**

2. **Add new variable**:
   - **Name**: `FIREBASE_TESTERS`
   - **Value**: Comma-separated email list (e.g., `tester1@example.com,tester2@example.com`)

### Step 8: Test Distribution

1. **Run your iOS workflow** (`build-ios-distribution-clean.yml`)

2. **Check Firebase Console** → **App Distribution** → **Releases**:
   - You should see your new IPA release listed
   - Testers will receive email notifications with download links

### Firebase Features

- ✅ **Email notifications**: Testers automatically notified of new builds
- ✅ **Release notes**: Automatic generation with build info and commit messages
- ✅ **Tester groups**: Organize testers into teams/departments
- ✅ **Download analytics**: Track who downloaded which versions
- ✅ **Device compatibility**: Automatic device compatibility checking
- ✅ **Security**: 1-hour security hold for iOS apps (normal Apple security measure)

### Usage Tips

- **Security hold**: iOS apps have a 1-hour hold before installation (this is normal)
- **Tester management**: Use Firebase Console to add/remove testers and create groups
- **Release notes**: Customize in workflow or let it auto-generate from commit messages
- **Version tracking**: Firebase tracks all your releases with download statistics

### Troubleshooting Firebase Issues

**"App not found"**:

- Verify `FIREBASE_APP_ID_IOS` matches your Firebase Console iOS app
- Ensure you're using the iOS App ID, not the Android one

**"Permission denied"**:

- Check service account has "Firebase App Distribution Admin" role
- Verify the service account is for the correct Firebase project

**"Invalid service account"**:

- Verify base64 encoding of service account JSON is correct
- Ensure the JSON file was downloaded completely

**"No testers specified"**:

- Add `FIREBASE_TESTERS` repository variable or use Firebase Console to add testers manually
- Testers must accept the invitation email before they can download builds

**"Upload failed"**:

- Check that the IPA file was built successfully
- Verify Firebase project is properly configured for iOS apps
