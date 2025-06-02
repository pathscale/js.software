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
