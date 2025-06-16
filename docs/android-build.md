# Android Build Secrets Setup

## Prerequisites

- Java JDK installed (for `keytool` command)
- Your app's package name (e.g., `com.yourcompany.yourapp`)

```bash
# Verify keytool is available
keytool -help
```

## Create Keystore

```bash
# Prepare your values
PACKAGE_NAME="js.software.ui"
KEY_ALIAS="release-key"
KEYSTORE_NAME="jssoftware-ui-release.jks"
KEYSTORE_PASSWORD="android123"
KEY_PASSWORD="android123"

# Generate keystore
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

## Convert to Base64

```bash
# Convert keystore to base64
base64 -i "$KEYSTORE_NAME" | tr -d '\n' > keystore_base64.txt

# Verify
base64 -d -i 'keystore_base64.txt' -o 'test_keystore.jks'
keytool -list -keystore test_keystore.jks -storepass "$KEYSTORE_PASSWORD"
rm test_keystore.jks

# Get base64 string
cat keystore_base64.txt
```

## Add GitHub Secrets

Go to GitHub repository → Settings → Secrets and variables → Actions

Add these 3 secrets:

**ANDROID_KEY_BASE64**

```bash
# Value from:
cat keystore_base64.txt
```

**ANDROID_KEY_PASSWORD**

Value: your keystore password

**ANDROID_KEY_ALIAS**

Value: your key alias

## Run Build Workflow

**Manual trigger:**

1. Go to GitHub → Actions → "Build Signed Android APK"
2. Click "Run workflow"
3. APK will be available as artifact: `{app-name}-android-{run-number}`

**Output:**

- Signed release APK
- Auto-triggers Firebase distribution (if configured)
