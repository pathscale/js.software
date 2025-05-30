#!/bin/bash

# Android Secrets Setup Script
# This script helps you generate/export Android keystore for GitHub Actions
# Similar to the iOS secrets setup script

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Title banner
echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}   Android Secrets Collection for GitHub Actions                   ${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo
echo -e "This script will help you generate/collect all necessary secrets for Android builds in GitHub Actions"
echo

# Prerequisites Section
echo -e "${YELLOW}Prerequisites:${NC}"
echo "1. Java JDK must be installed (keytool command available)"
echo "2. OpenSSL must be installed for base64 encoding"
echo "3. You should have decided on your app's package name (e.g., com.yourcompany.yourapp)"
echo "4. For production apps, use a strong password and keep the keystore safe"
echo -e "5. The keystore will be used to sign all future versions of your app\n"

# Check if keytool is available
if ! command -v keytool &> /dev/null; then
    echo -e "${RED}Error: keytool command not found. Please install Java JDK.${NC}"
    exit 1
fi

read -p "Do you meet these prerequisites? (y/n): " PREREQ_OK
if [[ $PREREQ_OK != "y" && $PREREQ_OK != "Y" ]]; then
    echo -e "${RED}Please ensure you meet the prerequisites before running this script.${NC}"
    exit 1
fi

# Create a temporary directory for outputs
TEMP_DIR=$(mktemp -d)
echo -e "${YELLOW}Creating temporary directory at ${TEMP_DIR}${NC}"

# Step 1: Choose between existing keystore or creating new one
echo -e "\n${GREEN}Step 1: Keystore Selection${NC}"
echo -e "Choose an option:"
echo -e "1) Create a new keystore (recommended for new projects)"
echo -e "2) Use an existing keystore"
read -p "Enter your choice (1/2): " KEYSTORE_OPTION

KEYSTORE_PATH=""
KEYSTORE_PASSWORD=""
KEY_PASSWORD=""
KEY_ALIAS=""

if [[ $KEYSTORE_OPTION == "1" ]]; then
    # Create new keystore
    echo -e "\n${GREEN}Creating New Android Keystore${NC}"
    
    # Get keystore details
    echo -e "\n${YELLOW}Keystore Configuration:${NC}"
    read -p "Enter your app's package name (e.g., com.yourcompany.yourapp): " PACKAGE_NAME
    read -p "Enter key alias name (e.g., upload-key, release-key): " KEY_ALIAS
    
    # Generate meaningful keystore name from package name
    echo -e "\n${YELLOW}Generating keystore name...${NC}"
    
    # Convert package name to a good filename
    # com.jssoftware.ui -> jssoftware-ui-release.jks
    # com.company.myapp -> company-myapp-release.jks
    if [[ "$PACKAGE_NAME" =~ ^com\.([^.]+)\.(.+)$ ]]; then
        COMPANY="${BASH_REMATCH[1]}"
        APP="${BASH_REMATCH[2]}"
        KEYSTORE_NAME="${COMPANY}-${APP}-release.jks"
    elif [[ "$PACKAGE_NAME" =~ ^([^.]+)\.([^.]+)\.(.+)$ ]]; then
        # Handle other patterns like org.example.app
        ORG="${BASH_REMATCH[1]}"
        COMPANY="${BASH_REMATCH[2]}"
        APP="${BASH_REMATCH[3]}"
        KEYSTORE_NAME="${COMPANY}-${APP}-release.jks"
    else
        # Fallback: use the full package name with dots replaced by dashes
        KEYSTORE_NAME="${PACKAGE_NAME//\./-}-release.jks"
    fi
    
    echo -e "Keystore will be named: ${GREEN}$KEYSTORE_NAME${NC}"
    echo -e "${BLUE}(Based on package name: $PACKAGE_NAME)${NC}"
    read -p "Use this name or enter a custom name [Enter to use generated name]: " CUSTOM_NAME
    
    if [[ -n "$CUSTOM_NAME" ]]; then
        # Ensure it has .jks extension
        if [[ "$CUSTOM_NAME" != *.jks ]]; then
            CUSTOM_NAME="${CUSTOM_NAME}.jks"
        fi
        KEYSTORE_NAME="$CUSTOM_NAME"
        echo -e "Using custom name: ${GREEN}$KEYSTORE_NAME${NC}"
    fi
    
    # Password setup
    echo -e "\n${YELLOW}Password Configuration:${NC}"
    echo -e "For GitHub Actions, we recommend using simple passwords without special characters"
    echo -e "1) Use simple password (android123) - recommended for CI/CD"
    echo -e "2) Use custom password"
    read -p "Choose password option (1/2): " PASSWORD_OPTION
    
    if [[ $PASSWORD_OPTION == "2" ]]; then
        read -sp "Enter keystore password: " KEYSTORE_PASSWORD
        echo
        read -sp "Confirm keystore password: " KEYSTORE_PASSWORD_CONFIRM
        echo
        
        if [[ "$KEYSTORE_PASSWORD" != "$KEYSTORE_PASSWORD_CONFIRM" ]]; then
            echo -e "${RED}Passwords don't match. Exiting.${NC}"
            exit 1
        fi
        
        read -sp "Enter key password (can be same as keystore): " KEY_PASSWORD
        echo
    else
        KEYSTORE_PASSWORD="android123"
        KEY_PASSWORD="android123"
    fi
    
    # Additional certificate details
    echo -e "\n${YELLOW}Certificate Details (Metadata)${NC}"
    echo -e "${BLUE}These details are embedded in the certificate as metadata and are completely optional.${NC}"
    echo -e "${BLUE}They do NOT affect app functionality, signing security, or distribution capability.${NC}"
    echo -e "${BLUE}You can safely use generic values - most developers do.${NC}\n"
    
    echo -e "${YELLOW}Options:${NC}"
    echo -e "1) Use generic default values (recommended for most users)"
    echo -e "2) Set custom certificate details"
    
    read -p "Choose option (1/2): " CERT_OPTION
    
    if [[ $CERT_OPTION == "2" ]]; then
        echo -e "\n${GREEN}Custom Certificate Details:${NC}"
        read -p "Enter your name or organization: " CERT_NAME
        read -p "Enter your organization unit (e.g., Development): " CERT_OU
        read -p "Enter your organization (e.g., Your Company): " CERT_O
        read -p "Enter your city: " CERT_L
        read -p "Enter your state/province: " CERT_ST
        read -p "Enter your country code (e.g., US, CA, UK): " CERT_C
    else
        # Use generic defaults
        echo -e "\n${GREEN}Using generic certificate details:${NC}"
        CERT_NAME="Release Key"
        CERT_OU="Development"
        CERT_O="AndroidApp"
        CERT_L="Unknown"
        CERT_ST="Unknown"
        CERT_C="US"
        
        echo -e "• Name: ${BLUE}$CERT_NAME${NC}"
        echo -e "• Organization Unit: ${BLUE}$CERT_OU${NC}"
        echo -e "• Organization: ${BLUE}$CERT_O${NC}"
        echo -e "• City: ${BLUE}$CERT_L${NC}"
        echo -e "• State: ${BLUE}$CERT_ST${NC}"
        echo -e "• Country: ${BLUE}$CERT_C${NC}"
        echo -e "\n${YELLOW}These generic values are perfectly fine for production use!${NC}"
    fi
    
    # Create keystore
    KEYSTORE_PATH="$TEMP_DIR/$KEYSTORE_NAME"
    echo -e "\n${YELLOW}Generating keystore...${NC}"
    
    keytool -genkeypair \
        -v \
        -keystore "$KEYSTORE_PATH" \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -alias "$KEY_ALIAS" \
        -storepass "$KEYSTORE_PASSWORD" \
        -keypass "$KEY_PASSWORD" \
        -dname "CN=$CERT_NAME, OU=$CERT_OU, O=$CERT_O, L=$CERT_L, ST=$CERT_ST, C=$CERT_C"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Keystore created successfully!${NC}"
    else
        echo -e "${RED}Failed to create keystore. Please check your inputs and try again.${NC}"
        exit 1
    fi

elif [[ $KEYSTORE_OPTION == "2" ]]; then
    # Use existing keystore
    echo -e "\n${GREEN}Using Existing Keystore${NC}"
    echo -e "${YELLOW}Searching for existing keystores...${NC}"
    
    # Search for keystores in common locations
    KEYSTORE_FILES=()
    SEARCH_LOCATIONS=(
        "."                                    # Current directory
        "$HOME"                                # Home directory
        "$HOME/Documents"                      # Documents folder
        "$HOME/Desktop"                        # Desktop
        "$HOME/Downloads"                      # Downloads (common place to store keystores)
        "$HOME/.android"                       # Android SDK directory
        "$HOME/android-keystores"              # Common keystore folder
        "$HOME/keystores"                      # Another common folder
        "$HOME/Android/keystores"              # Android-specific folder
        "$HOME/AndroidStudioProjects"         # Android Studio projects
        "$(pwd)/android"                       # Project android folder
        "$(pwd)/keystores"                     # Project keystores folder
        "$(pwd)/signing"                       # Project signing folder
    )
    
    # Search for Android keystore files only
    echo -e "Searching for Android keystores (.jks, .keystore files)..."
    for location in "${SEARCH_LOCATIONS[@]}"; do
        if [ -d "$location" ]; then
            # Find .jks and .keystore files only (exclude .p12 which is for iOS)
            while IFS= read -r -d '' file; do
                # Skip debug keystores and very small files
                filename=$(basename "$file")
                if [[ "$filename" != "debug.keystore" ]] && [[ -f "$file" ]]; then
                    # Check file size (Android keystores are typically > 1KB)
                    file_size=$(wc -c < "$file" 2>/dev/null || echo 0)
                    if [[ $file_size -gt 1000 ]]; then
                        # Basic validation: check if it looks like a keystore without password
                        # Use file command to detect Java keystore format, or check file structure
                        if file "$file" 2>/dev/null | grep -q -i "java keystore" || 
                           file "$file" 2>/dev/null | grep -q -i "keystore" ||
                           [[ "$filename" == *.jks ]] || [[ "$filename" == *.keystore ]]; then
                            KEYSTORE_FILES+=("$file")
                        fi
                    fi
                fi
            done < <(find "$location" -maxdepth 3 \( -name "*.jks" -o -name "*.keystore" \) -type f -print0 2>/dev/null)
        fi
    done
    
    # Remove duplicates and sort
    if [ ${#KEYSTORE_FILES[@]} -gt 0 ]; then
        # Remove duplicates
        UNIQUE_KEYSTORES=($(printf '%s\n' "${KEYSTORE_FILES[@]}" | sort -u))
        
        echo -e "\n${GREEN}Found existing keystores:${NC}"
        for i in "${!UNIQUE_KEYSTORES[@]}"; do
            file="${UNIQUE_KEYSTORES[$i]}"
            size=$(wc -c < "$file" 2>/dev/null || echo "unknown")
            echo "$((i+1))) $(basename "$file") - ${BLUE}$file${NC} (${size} bytes)"
        done
        
        echo "$((${#UNIQUE_KEYSTORES[@]}+1))) Enter custom path manually"
        echo
        
        read -p "Select a keystore (1-$((${#UNIQUE_KEYSTORES[@]}+1))): " KEYSTORE_CHOICE
        
        if [[ $KEYSTORE_CHOICE -ge 1 && $KEYSTORE_CHOICE -le ${#UNIQUE_KEYSTORES[@]} ]]; then
            # User selected an existing keystore
            EXISTING_KEYSTORE="${UNIQUE_KEYSTORES[$((KEYSTORE_CHOICE-1))]}"
            echo -e "${GREEN}Selected: $(basename "$EXISTING_KEYSTORE")${NC}"
            echo -e "${BLUE}Path: $EXISTING_KEYSTORE${NC}"
        elif [[ $KEYSTORE_CHOICE -eq $((${#UNIQUE_KEYSTORES[@]}+1)) ]]; then
            # User wants to enter custom path
            read -p "Enter the full path to your keystore: " EXISTING_KEYSTORE
        else
            echo -e "${RED}Invalid selection. Exiting.${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}No existing keystores found in common locations.${NC}"
        echo -e "Common locations searched:"
        for location in "${SEARCH_LOCATIONS[@]}"; do
            if [ -d "$location" ]; then
                echo -e "  • $location"
            fi
        done
        echo
        read -p "Enter the full path to your existing keystore: " EXISTING_KEYSTORE
    fi
    
    # Verify keystore exists
    if [ ! -f "$EXISTING_KEYSTORE" ]; then
        echo -e "${RED}Keystore file not found at: $EXISTING_KEYSTORE${NC}"
        exit 1
    fi
    
    # Display keystore info before asking for credentials
    echo -e "\n${YELLOW}Keystore Information:${NC}"
    echo -e "File: ${BLUE}$(basename "$EXISTING_KEYSTORE")${NC}"
    echo -e "Path: ${BLUE}$EXISTING_KEYSTORE${NC}"
    echo -e "Size: ${BLUE}$(wc -c < "$EXISTING_KEYSTORE") bytes${NC}"
    
    # Try to list available aliases (this helps user know what aliases exist)
    echo -e "\n${YELLOW}Attempting to list aliases in keystore...${NC}"
    echo -e "${BLUE}(You'll be prompted for the keystore password)${NC}"
    
    # Get keystore details
    read -sp "Enter keystore password: " KEYSTORE_PASSWORD
    echo
    
    # List aliases to help user choose
    echo -e "\n${YELLOW}Available aliases in this keystore:${NC}"
    ALIASES=$(keytool -list -keystore "$EXISTING_KEYSTORE" -storepass "$KEYSTORE_PASSWORD" 2>/dev/null | grep "Alias name:" | sed 's/Alias name: //' || echo "")
    
    if [ -n "$ALIASES" ]; then
        echo -e "${GREEN}Found aliases:${NC}"
        echo "$ALIASES" | while read -r alias; do
            echo -e "  • ${BLUE}$alias${NC}"
        done
        echo
    else
        echo -e "${YELLOW}Could not list aliases (incorrect password or corrupted keystore)${NC}"
    fi
    
    read -p "Enter key alias: " KEY_ALIAS
    read -sp "Enter key password: " KEY_PASSWORD
    echo
    
    # Verify keystore can be accessed
    echo -e "\n${YELLOW}Verifying keystore access...${NC}"
    keytool -list -keystore "$EXISTING_KEYSTORE" -storepass "$KEYSTORE_PASSWORD" -alias "$KEY_ALIAS" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Keystore verification successful!${NC}"
        
        # Ask for package name to generate proper keystore name
        echo -e "\n${YELLOW}Package Information:${NC}"
        read -p "Enter your app's package name for this keystore (e.g., com.yourcompany.yourapp): " PACKAGE_NAME
        
        # Generate meaningful keystore name from package name
        echo -e "\n${YELLOW}Generating keystore name...${NC}"
        
        # Convert package name to a good filename
        if [[ "$PACKAGE_NAME" =~ ^com\.([^.]+)\.(.+)$ ]]; then
            COMPANY="${BASH_REMATCH[1]}"
            APP="${BASH_REMATCH[2]}"
            KEYSTORE_NAME="${COMPANY}-${APP}-release.jks"
        elif [[ "$PACKAGE_NAME" =~ ^([^.]+)\.([^.]+)\.(.+)$ ]]; then
            ORG="${BASH_REMATCH[1]}"
            COMPANY="${BASH_REMATCH[2]}"
            APP="${BASH_REMATCH[3]}"
            KEYSTORE_NAME="${COMPANY}-${APP}-release.jks"
        else
            KEYSTORE_NAME="${PACKAGE_NAME//\./-}-release.jks"
        fi
        
        echo -e "Keystore will be named: ${GREEN}$KEYSTORE_NAME${NC}"
        echo -e "${BLUE}(Based on package name: $PACKAGE_NAME)${NC}"
        read -p "Use this name or enter a custom name [Enter to use generated name]: " CUSTOM_NAME
        
        if [[ -n "$CUSTOM_NAME" ]]; then
            if [[ "$CUSTOM_NAME" != *.jks ]]; then
                CUSTOM_NAME="${CUSTOM_NAME}.jks"
            fi
            KEYSTORE_NAME="$CUSTOM_NAME"
            echo -e "Using custom name: ${GREEN}$KEYSTORE_NAME${NC}"
        fi
        
        # Copy to temp directory with the proper name
        KEYSTORE_PATH="$TEMP_DIR/$KEYSTORE_NAME"
        cp "$EXISTING_KEYSTORE" "$KEYSTORE_PATH"
    else
        echo -e "${RED}Failed to verify keystore. Please check your password and alias.${NC}"
        echo -e "${YELLOW}Available options:${NC}"
        echo -e "1. Check if the keystore password is correct"
        echo -e "2. Verify the key alias exists (try listing aliases first)"
        echo -e "3. Ensure the key password matches the alias"
        exit 1
    fi
else
    echo -e "${RED}Invalid option. Exiting.${NC}"
    exit 1
fi

# Step 2: Display keystore information
echo -e "\n${GREEN}Step 2: Keystore Information${NC}"
echo -e "Displaying keystore details...\n"

keytool -list -v -keystore "$KEYSTORE_PATH" -storepass "$KEYSTORE_PASSWORD" -alias "$KEY_ALIAS"

# Step 3: Convert keystore to base64
echo -e "\n${GREEN}Step 3: Converting Keystore to Base64${NC}"
echo -e "Converting keystore for GitHub Actions...\n"

# Verify keystore file
if [ ! -f "$KEYSTORE_PATH" ]; then
    echo -e "${RED}Error: Keystore file not found at $KEYSTORE_PATH${NC}"
    exit 1
fi

KEYSTORE_SIZE=$(wc -c < "$KEYSTORE_PATH")
echo -e "Keystore file size: ${GREEN}$KEYSTORE_SIZE bytes${NC}"

# Convert to base64 (without line breaks for GitHub Actions)
echo -e "Converting keystore to base64..."
KEYSTORE_BASE64=$(base64 -i "$KEYSTORE_PATH" | tr -d '\n')

if [ -z "$KEYSTORE_BASE64" ]; then
    echo -e "${RED}Error: Failed to convert keystore to base64${NC}"
    exit 1
fi

KEYSTORE_BASE64_LENGTH=${#KEYSTORE_BASE64}
echo -e "Keystore base64 length: ${GREEN}$KEYSTORE_BASE64_LENGTH characters${NC}"

# Verify base64 encoding
echo -e "${YELLOW}Verifying base64 encoding...${NC}"
TEMP_KEYSTORE="$TEMP_DIR/verify_keystore.jks"
echo "$KEYSTORE_BASE64" | base64 -d > "$TEMP_KEYSTORE" 2>/dev/null

if [ $? -eq 0 ] && [ -f "$TEMP_KEYSTORE" ]; then
    VERIFY_SIZE=$(wc -c < "$TEMP_KEYSTORE")
    if [ "$VERIFY_SIZE" -eq "$KEYSTORE_SIZE" ]; then
        echo -e "${GREEN}Base64 encoding verification: SUCCESS${NC}"
    else
        echo -e "${RED}Base64 encoding verification: FAILED (size mismatch)${NC}"
        exit 1
    fi
else
    echo -e "${RED}Base64 encoding verification: FAILED${NC}"
    exit 1
fi

# Step 4: Generate GitHub secrets file
echo -e "\n${GREEN}Step 4: Generating GitHub Secrets${NC}"

OUTPUT_FILE="$TEMP_DIR/github_android_secrets.txt"
{
    echo "# GitHub Secrets for Android builds"
    echo "# Generated on $(date)"
    echo "# Project: $PACKAGE_NAME"
    echo 
    echo "# Add these secrets to your GitHub repository at:"
    echo "# Settings > Secrets and variables > Actions > New repository secret"
    echo
    echo "# Android Keystore (Base64 encoded - COPY AS ONE CONTINUOUS LINE)"
    echo "ANDROID_KEY_BASE64=$KEYSTORE_BASE64"
    echo
    echo "# Key Password (used for both keystore and key passwords)"
    echo "ANDROID_KEY_PASSWORD=$KEY_PASSWORD"
    echo
    echo "# Key Alias"
    echo "ANDROID_KEY_ALIAS=$KEY_ALIAS"
    echo
    echo "# Optional: Package name for reference"
    echo "# ANDROID_PACKAGE_NAME=$PACKAGE_NAME"
    echo
    echo "# Keystore Details:"
    echo "# - Original file size: $KEYSTORE_SIZE bytes"
    echo "# - Base64 length: $KEYSTORE_BASE64_LENGTH characters"
    echo "# - Key alias: $KEY_ALIAS"
    echo "# - Validity: 10000 days (if newly created)"
    echo
} > "$OUTPUT_FILE"

# Step 5: Security recommendations
echo -e "\n${GREEN}Step 5: Security Recommendations${NC}"
echo -e "${YELLOW}Important Security Notes:${NC}"
echo "• Keep your keystore file safe - you'll need it for all future app updates"
echo "• Store the keystore password in a secure location"
echo "• For production apps, consider using a hardware security module (HSM)"
echo "• Never commit the keystore file to version control"
echo "• The GitHub secrets are encrypted and only accessible during builds"
echo "• Consider rotating passwords periodically for enhanced security"
echo

# Display preview of secrets
echo -e "${BLUE}Preview of generated secrets:${NC}"
echo -e "ANDROID_KEY_BASE64: ${KEYSTORE_BASE64:0:50}...${KEYSTORE_BASE64: -10} (${KEYSTORE_BASE64_LENGTH} chars total)"
echo -e "ANDROID_KEY_PASSWORD: $KEY_PASSWORD"
echo -e "ANDROID_KEY_ALIAS: $KEY_ALIAS"
echo

# Final instructions
echo -e "\n${BLUE}==================================================================${NC}"
echo -e "${GREEN}Android Secrets Generation Complete!${NC}"
echo -e "\n${YELLOW}Generated files:${NC}"
echo -e "• Secrets file: $OUTPUT_FILE"
echo -e "• Keystore file: $KEYSTORE_PATH"

# Step-by-step clipboard copying (macOS)
if command -v pbcopy &> /dev/null; then
    echo -e "\n${GREEN}Step-by-Step Secret Setup (macOS)${NC}"
    echo -e "${BLUE}We'll copy each secret to your clipboard one by one to avoid copy/paste errors${NC}"
    echo -e "After each copy, go to GitHub and paste it immediately before continuing.\n"
    
    read -p "Ready to start? Press Enter to continue..."
    
    # 1. Android Keystore
    echo -e "\n${YELLOW}1/3: Copying ANDROID_KEY_BASE64 to clipboard...${NC}"
    echo "$KEYSTORE_BASE64" | pbcopy
    echo -e "${GREEN}✓ ANDROID_KEY_BASE64 copied to clipboard (${KEYSTORE_BASE64_LENGTH} characters)${NC}"
    echo -e "${BLUE}Preview:${NC} ${KEYSTORE_BASE64:0:50}...${KEYSTORE_BASE64: -10}"
    echo -e "Go to GitHub → Settings → Secrets → Actions → New repository secret"
    echo -e "Name: ${YELLOW}ANDROID_KEY_BASE64${NC}"
    echo -e "Value: ${YELLOW}Paste from clipboard (Cmd+V)${NC}"
    read -p "Press Enter after you've added this secret in GitHub..."
    
    # 2. Key Password
    echo -e "\n${YELLOW}2/3: Copying ANDROID_KEY_PASSWORD to clipboard...${NC}"
    echo "$KEY_PASSWORD" | pbcopy
    echo -e "${GREEN}✓ ANDROID_KEY_PASSWORD copied to clipboard${NC}"
    echo -e "${BLUE}Value:${NC} $KEY_PASSWORD"
    echo -e "Name: ${YELLOW}ANDROID_KEY_PASSWORD${NC}"
    echo -e "Value: ${YELLOW}Paste from clipboard (Cmd+V)${NC}"
    read -p "Press Enter after you've added this secret in GitHub..."
    
    # 3. Key Alias
    echo -e "\n${YELLOW}3/3: Copying ANDROID_KEY_ALIAS to clipboard...${NC}"
    echo "$KEY_ALIAS" | pbcopy
    echo -e "${GREEN}✓ ANDROID_KEY_ALIAS copied to clipboard${NC}"
    echo -e "${BLUE}Value:${NC} $KEY_ALIAS"
    echo -e "Name: ${YELLOW}ANDROID_KEY_ALIAS${NC}"
    echo -e "Value: ${YELLOW}Paste from clipboard (Cmd+V)${NC}"
    read -p "Press Enter after you've added this secret in GitHub..."
    
    echo -e "\n${GREEN}🎉 All secrets should now be configured in GitHub Actions!${NC}"
    
else
    # Fallback for non-macOS systems
    echo -e "\n${YELLOW}Manual Setup Required (non-macOS system)${NC}"
    echo -e "Since pbcopy is not available, you'll need to copy secrets manually:"
    echo -e "\n${BLUE}Go to GitHub → Settings → Secrets → Actions and add these secrets:${NC}\n"
    
    echo -e "${YELLOW}1. ANDROID_KEY_BASE64${NC}"
    echo -e "   Copy the entire line below (without the name part):"
    echo -e "   ${KEYSTORE_BASE64}"
    echo
    
    echo -e "${YELLOW}2. ANDROID_KEY_PASSWORD${NC}"
    echo -e "   Value: ${KEY_PASSWORD}"
    echo
    
    echo -e "${YELLOW}3. ANDROID_KEY_ALIAS${NC}"
    echo -e "   Value: ${KEY_ALIAS}"
    echo
fi

echo -e "\n${BLUE}Verification Steps:${NC}"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings → Secrets and variables → Actions"
echo "3. Verify you have these 3 secrets:"
echo "   - ANDROID_KEY_BASE64"
echo "   - ANDROID_KEY_PASSWORD"
echo "   - ANDROID_KEY_ALIAS"
echo "4. Run your build-android-release.yml workflow to test"

echo -e "\n${RED}CRITICAL REMINDERS:${NC}"
echo "• Save your keystore file in a secure location"
echo "• Never lose your keystore - you can't update your app without it"
echo "• Keep passwords secure and documented"
echo "• Delete temporary files after adding secrets to GitHub"
echo -e "${BLUE}==================================================================${NC}"

# Offer to view the complete secrets file for reference
read -p "Would you like to view the complete secrets file for reference? (y/n): " VIEW_FILE
if [[ $VIEW_FILE == "y" || $VIEW_FILE == "Y" ]]; then
    echo -e "\n${YELLOW}=== COMPLETE SECRETS FILE (for reference) ===${NC}"
    cat "$OUTPUT_FILE"
    echo -e "${YELLOW}=== END SECRETS FILE ===${NC}\n"
fi

# Cleanup options
echo -e "\n${YELLOW}Cleanup Options:${NC}"
echo -e "${BLUE}Your keystore is currently in a temporary directory and will be lost if not saved!${NC}"
echo "1. Keep all files for manual backup (in temp directory)"
echo -e "2. ${GREEN}Save keystore to current directory${NC} (recommended)"
echo "3. Delete all temporary files (NOT recommended - you'll lose your keystore!)"
read -p "Choose cleanup option (1/2/3): " CLEANUP_OPTION

case $CLEANUP_OPTION in
    1)
        echo -e "${GREEN}All files preserved in: $TEMP_DIR${NC}"
        echo -e "${YELLOW}IMPORTANT: Copy your keystore from this temp directory before it gets deleted!${NC}"
        echo -e "Keystore location: ${BLUE}$KEYSTORE_PATH${NC}"
        echo -e "Secrets file: ${BLUE}$OUTPUT_FILE${NC}"
        echo -e "${RED}Note: Temp directories may be cleaned up on reboot!${NC}"
        ;;
    2)
        # Move keystore to current directory with better error handling
        FINAL_KEYSTORE="./$KEYSTORE_NAME"
        echo -e "${YELLOW}Copying keystore to current directory...${NC}"
        
        if cp "$KEYSTORE_PATH" "$FINAL_KEYSTORE" 2>/dev/null; then
            echo -e "${GREEN}✓ Keystore successfully saved to: $(pwd)/$KEYSTORE_NAME${NC}"
            echo -e "${BLUE}File size: $(wc -c < "$FINAL_KEYSTORE") bytes${NC}"
            
            # Verify the copied file
            if keytool -list -keystore "$FINAL_KEYSTORE" -storepass "$KEYSTORE_PASSWORD" -alias "$KEY_ALIAS" > /dev/null 2>&1; then
                echo -e "${GREEN}✓ Keystore verification: File is valid and accessible${NC}"
            else
                echo -e "${YELLOW}⚠ Could not verify copied keystore (but file exists)${NC}"
            fi
            
            # Clean up temp directory
            rm -rf "$TEMP_DIR"
            echo -e "${GREEN}✓ Temporary files cleaned up${NC}"
        else
            echo -e "${RED}✗ Failed to copy keystore to current directory!${NC}"
            echo -e "${YELLOW}Your keystore is still safe at: $KEYSTORE_PATH${NC}"
            echo -e "${YELLOW}You can manually copy it later with:${NC}"
            echo -e "  ${BLUE}cp \"$KEYSTORE_PATH\" ./$KEYSTORE_NAME${NC}"
        fi
        ;;
    3)
        echo -e "${RED}⚠ WARNING: This will delete your keystore file permanently!${NC}"
        read -p "Are you sure? Type 'DELETE' to confirm: " CONFIRM_DELETE
        
        if [[ "$CONFIRM_DELETE" == "DELETE" ]]; then
            rm -rf "$TEMP_DIR"
            echo -e "${RED}All temporary files deleted (including keystore)${NC}"
            echo -e "${YELLOW}You'll need to run this script again to create a new keystore!${NC}"
        else
            echo -e "${GREEN}Deletion cancelled. Files preserved in: $TEMP_DIR${NC}"
        fi
        ;;
    *)
        echo -e "${YELLOW}Invalid option. Files preserved in: $TEMP_DIR${NC}"
        echo -e "${BLUE}Your keystore is safe at: $KEYSTORE_PATH${NC}"
        ;;
esac

echo -e "\n${GREEN}Android secrets setup complete!${NC}"
echo -e "${BLUE}Your Android release workflow should now work with these secrets.${NC}" 