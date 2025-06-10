#!/bin/bash

# iOS Secrets Setup - Unified Script
# Combines development and distribution workflows with step-by-step clipboard support
# Based on ios-secrets-setup-v2-old.sh, ios-secrets-setup-v2.sh, and android-secrets-setup.sh

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Title banner
echo -e "${BLUE}==================================================================${NC}"
echo -e "${BLUE}   iOS Secrets Setup - Unified Script (Development & Distribution) ${NC}"
echo -e "${BLUE}==================================================================${NC}"
echo
echo -e "This script helps you generate all necessary secrets for iOS builds in GitHub Actions"
echo -e "Supports both ${GREEN}development${NC} and ${CYAN}distribution${NC} workflows with step-by-step guidance"
echo

# Step 1: Choose workflow type
echo -e "${YELLOW}Step 1: Choose Your Workflow Type${NC}"
echo
echo -e "${GREEN}Development Mode:${NC}"
echo "• For personal testing and development"
echo "• Uses iPhone Developer certificates"
echo "• Simpler setup, automatic signing friendly"
echo "• Limited to devices in your personal Apple ID"
echo
echo -e "${CYAN}Distribution Mode:${NC}"
echo "• For sharing with external testers (OTA distribution)"
echo "• Uses iPhone Distribution certificates"
echo "• Requires ad-hoc provisioning profiles"
echo "• Can distribute to multiple testers via Diawi/Firebase"
echo
echo -e "${BLUE}TestFlight Mode:${NC}"
echo "• For sharing with unlimited internal/external testers"
echo "• Uses Apple Distribution certificates"
echo "• Requires App Store provisioning profiles"
echo "• No UDID management needed - Apple handles it automatically"
echo "• Built-in beta testing features and crash reports"
echo
echo -e "${YELLOW}Choose your mode:${NC}"
echo "1) Development Mode (easier, for personal use)"
echo "2) Distribution Mode (for sharing via OTA)"
echo "3) TestFlight Mode (for beta testing via TestFlight)"
echo
read -p "Enter your choice (1/2/3): " WORKFLOW_MODE

if [[ $WORKFLOW_MODE == "1" ]]; then
    WORKFLOW_TYPE="development"
    CERT_PATTERN="iPhone Developer\|Apple Development"
    SECRET_PREFIX="IOS_DEVELOPMENT"
    WORKFLOW_NAME="Development"
    echo -e "${GREEN}Selected: Development Mode${NC}"
elif [[ $WORKFLOW_MODE == "2" ]]; then
    WORKFLOW_TYPE="distribution"
    CERT_PATTERN="iPhone Distribution\|Apple Distribution"
    SECRET_PREFIX="IOS_DISTRIBUTION"
    WORKFLOW_NAME="Distribution"
    echo -e "${CYAN}Selected: Distribution Mode${NC}"
elif [[ $WORKFLOW_MODE == "3" ]]; then
    WORKFLOW_TYPE="testflight"
    CERT_PATTERN="Apple Distribution"
    SECRET_PREFIX="IOS_APPSTORE"
    WORKFLOW_NAME="TestFlight"
    echo -e "${BLUE}Selected: TestFlight Mode${NC}"
else
    echo -e "${RED}Invalid choice. Exiting.${NC}"
    exit 1
fi

# Prerequisites Section
echo -e "\n${YELLOW}Prerequisites for $WORKFLOW_NAME Mode:${NC}"
echo "1. Xcode must be installed and set up"
echo "2. Command Line Tools must be installed (xcode-select --install)"
if [[ $WORKFLOW_TYPE == "development" ]]; then
    echo "3. You must have an iOS development certificate"
    echo "4. You must have a development provisioning profile"
    echo "5. An Apple Developer account (free or paid)"
elif [[ $WORKFLOW_TYPE == "testflight" ]]; then
    echo "3. You must have an Apple Distribution certificate"
    echo "4. You must have an App Store provisioning profile"
    echo "5. A paid Apple Developer account (required for App Store Connect)"
    echo "6. App Store Connect access with Developer role"
    echo "7. Your app must be registered in App Store Connect"
    echo "8. App Store Connect API key with Developer role"
else
    echo "3. You must have an iPhone Distribution certificate"
    echo "4. You must have an ad-hoc provisioning profile"
    echo "5. A paid Apple Developer account (required for distribution)"
    echo "6. Optional: Diawi account for OTA distribution"
fi
echo -e "7. The 'security' and 'openssl' commands must be available\n"

read -p "Do you meet these prerequisites? (y/n): " PREREQ_OK
if [[ $PREREQ_OK != "y" && $PREREQ_OK != "Y" ]]; then
    echo -e "${RED}Please ensure you meet the prerequisites before running this script.${NC}"
    exit 1
fi

# Create a temporary directory for outputs
TEMP_DIR=$(mktemp -d)
echo -e "${YELLOW}Creating temporary directory at ${TEMP_DIR}${NC}"

# Step 2: Get Team ID
echo -e "\n${GREEN}Step 2: Finding Apple Team ID${NC}"
echo -e "Attempting to extract Team ID from existing certificates...\n"

# Look for Team ID in certificate subject - prioritize based on workflow type
if [[ $WORKFLOW_TYPE == "distribution" ]]; then
    TEAM_ID=$(security find-certificate -c "iPhone Distribution" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
    if [ -n "$TEAM_ID" ]; then
        echo -e "Found Team ID from iPhone Distribution cert: ${GREEN}${TEAM_ID}${NC}"
    else
        TEAM_ID=$(security find-certificate -c "Apple Development" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
        if [ -n "$TEAM_ID" ]; then
            echo -e "Found Team ID from Apple Development cert: ${GREEN}${TEAM_ID}${NC}"
        fi
    fi
elif [[ $WORKFLOW_TYPE == "testflight" ]]; then
    TEAM_ID=$(security find-certificate -c "Apple Distribution" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
    if [ -n "$TEAM_ID" ]; then
        echo -e "Found Team ID from Apple Distribution cert: ${GREEN}${TEAM_ID}${NC}"
    else
        TEAM_ID=$(security find-certificate -c "Apple Development" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
        if [ -n "$TEAM_ID" ]; then
            echo -e "Found Team ID from Apple Development cert: ${GREEN}${TEAM_ID}${NC}"
        fi
    fi
else
    TEAM_ID=$(security find-certificate -c "Apple Development" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
    if [ -n "$TEAM_ID" ]; then
        echo -e "Found Team ID from Apple Development cert: ${GREEN}${TEAM_ID}${NC}"
    fi
fi

# If still no Team ID found, prompt user
if [ -z "$TEAM_ID" ]; then
    echo -e "${YELLOW}Could not automatically extract Team ID.${NC}"
    read -p "Please enter your Apple Team ID (found in Xcode → Settings → Accounts): " TEAM_ID
fi

# Step 2.5: Certificate Installation (if needed)
echo -e "\n${GREEN}Step 2.5: Certificate Setup${NC}"
echo -e "Choose how to proceed with certificates:\n"

# Check if we found any certificates in keychain
EXISTING_CERTS_COUNT=$(security find-identity -p codesigning -v | grep "$CERT_PATTERN" | wc -l | tr -d ' ')

if [[ $EXISTING_CERTS_COUNT -gt 0 ]]; then
    echo -e "${GREEN}Found $EXISTING_CERTS_COUNT existing ${WORKFLOW_NAME} certificate(s) in your keychain.${NC}"
    echo -e "1) Use existing certificates from keychain"
    echo -e "2) Install a new certificate file (.p12) that I received"
    read -p "Choose option (1/2): " CERT_SETUP_OPTION
else
    echo -e "${YELLOW}No ${WORKFLOW_NAME} certificates found in your keychain.${NC}"
    echo -e "1) Install a certificate file (.p12) that I received"
    echo -e "2) Skip - I'll install certificates manually later"
    read -p "Choose option (1/2): " CERT_SETUP_OPTION
    if [[ $CERT_SETUP_OPTION == "1" ]]; then
        CERT_SETUP_OPTION="2"  # Adjust for the install option
    else
        echo -e "${YELLOW}Please install your certificates in Keychain Access and run this script again.${NC}"
        exit 1
    fi
fi

# Handle certificate installation if requested
if [[ $CERT_SETUP_OPTION == "2" ]]; then
    echo -e "\n${YELLOW}Certificate Installation Guide:${NC}"
    echo -e "You'll need a .p12 certificate file (usually named something like 'distribution.p12' or 'ios_cert.p12')"
    echo -e "\n${BLUE}You can install the certificate by:${NC}"
    echo -e "1. Double-clicking the .p12 file (opens in Keychain Access)"
    echo -e "2. Using Keychain Access: File → Import Items"
    echo -e "3. Or provide the file path and we'll install it for you"
    echo
    
    echo -e "${BLUE}What would you like to do?${NC}"
    echo -e "1) I've already installed the certificate - re-scan for certificates"
    echo -e "2) Install the certificate file for me (provide file path)"
    echo -e "3) Skip certificate setup for now"
    read -p "Choose option (1/2/3): " CERT_INSTALL_OPTION
    
    if [[ $CERT_INSTALL_OPTION == "1" ]]; then
        # Re-scan for certificates after installation
        echo -e "\n${YELLOW}Re-scanning for newly installed certificates...${NC}"
        
        # Check again for certificates
        NEW_CERTS_COUNT=$(security find-identity -p codesigning -v | grep "$CERT_PATTERN" | wc -l | tr -d ' ')
        
        if [[ $NEW_CERTS_COUNT -gt 0 ]]; then
            echo -e "${GREEN}✅ Found $NEW_CERTS_COUNT ${WORKFLOW_NAME} certificate(s) in your keychain!${NC}"
            
            # Update Team ID from newly found certificates if we didn't have one
            if [ -z "$TEAM_ID" ]; then
                if [[ $WORKFLOW_TYPE == "distribution" ]]; then
                    TEAM_ID=$(security find-certificate -c "iPhone Distribution" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
                else
                    TEAM_ID=$(security find-certificate -c "Apple Development" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
                fi
                
                if [ -n "$TEAM_ID" ]; then
                    echo -e "Extracted Team ID from installed certificate: ${GREEN}$TEAM_ID${NC}"
                fi
            fi
            
            TEMP_CERT_INSTALLED=false  # User installed manually, so we don't need cleanup
        else
            echo -e "${YELLOW}⚠️ No ${WORKFLOW_NAME} certificates found after re-scan.${NC}"
            echo -e "Make sure you installed the certificate correctly and it's the right type."
            echo -e "\nYou can:"
            echo -e "1. Try installing the certificate again"
            echo -e "2. Check Keychain Access to verify the certificate is there"
            echo -e "3. Continue without certificate (you'll need to add secrets manually)"
            read -p "Would you like to continue anyway? (y/n): " CONTINUE_WITHOUT_CERT
            
            if [[ $CONTINUE_WITHOUT_CERT != "y" && $CONTINUE_WITHOUT_CERT != "Y" ]]; then
                echo -e "${RED}Exiting. Please install your certificate and run the script again.${NC}"
                exit 1
            fi
            
            TEMP_CERT_INSTALLED=false
        fi
        
    elif [[ $CERT_INSTALL_OPTION == "2" ]]; then
        # Install certificate via file path (original flow)
        echo -e "\n${YELLOW}Certificate File Installation:${NC}"
        read -p "Enter the full path to your .p12 certificate file: " P12_PATH
        
        if [ ! -f "$P12_PATH" ]; then
            echo -e "${RED}Certificate file not found at: $P12_PATH${NC}"
            echo -e "${YELLOW}Skipping certificate setup. You can add certificate secrets manually later.${NC}"
            TEMP_CERT_INSTALLED=false
        else
            echo -e "Certificate file found: ${GREEN}$(basename "$P12_PATH")${NC}"
            echo -e "File size: $(wc -c < "$P12_PATH") bytes"
            
            read -sp "Enter the password for this .p12 file: " P12_IMPORT_PASSWORD
            echo
            
            echo -e "\n${YELLOW}Installing certificate temporarily...${NC}"
            
            # Import the certificate
            if security import "$P12_PATH" -k ~/Library/Keychains/login.keychain-db -P "$P12_IMPORT_PASSWORD" -T /usr/bin/codesign -T /usr/bin/security 2>/dev/null; then
                echo -e "${GREEN}✅ Certificate installed successfully!${NC}"
                
                # Store cleanup info for later
                TEMP_CERT_INSTALLED=true
                TEMP_CERT_NAME=$(security find-identity -p codesigning -v | grep "$CERT_PATTERN" | tail -1 | sed -n 's/.*"\(.*\)"/\1/p')
                echo -e "Installed certificate: ${GREEN}$TEMP_CERT_NAME${NC}"
                
                # Update Team ID from newly installed cert if we didn't have one
                if [ -z "$TEAM_ID" ]; then
                    if [[ $WORKFLOW_TYPE == "distribution" ]]; then
                        TEAM_ID=$(security find-certificate -c "iPhone Distribution" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
                    else
                        TEAM_ID=$(security find-certificate -c "Apple Development" -p 2>/dev/null | openssl x509 -subject -noout 2>/dev/null | grep -o "OU=[A-Z0-9]*" | cut -d= -f2)
                    fi
                    
                    if [ -n "$TEAM_ID" ]; then
                        echo -e "Extracted Team ID from installed certificate: ${GREEN}$TEAM_ID${NC}"
                    fi
                fi
            else
                echo -e "${RED}❌ Failed to install certificate. Please check the file and password.${NC}"
                echo -e "${YELLOW}Skipping certificate setup. You can add certificate secrets manually later.${NC}"
                TEMP_CERT_INSTALLED=false
            fi
        fi
        
    else
        # Skip certificate setup
        echo -e "${YELLOW}Skipping certificate setup.${NC}"
        echo -e "${BLUE}You'll need to add certificate secrets manually later.${NC}"
        TEMP_CERT_INSTALLED=false
    fi
else
    TEMP_CERT_INSTALLED=false
fi

# Step 3: Certificate Selection and Export
echo -e "\n${GREEN}Step 3: Certificate Selection and Export${NC}"
echo -e "Finding and listing ${WORKFLOW_NAME} certificates...\n"

# Clean up certificate list to show only unique certs
CERTS=()
CERT_NAMES=()
COUNT=0

while read -r line; do
    CERT_HASH=$(echo "$line" | awk -F'"' '{print $1}' | awk '{print $2}')
    CERT_NAME=$(echo "$line" | sed -n 's/.*"\(.*\)"/\1/p')
    
    # Skip if we've already processed this certificate name
    SKIP=0
    for name in "${CERT_NAMES[@]}"; do
        if [[ "$name" == "$CERT_NAME" ]]; then
            SKIP=1
            break
        fi
    done
    
    if [[ $SKIP -eq 1 ]]; then
        continue
    fi
    
    # Store certificate info
    CERTS+=("$line")
    CERT_NAMES+=("$CERT_NAME")
    
    # Display certificate with proper dates
    COUNT=$((COUNT+1))
    echo "$COUNT) $CERT_NAME"
    # Get certificate info from Keychain and display it
    CERT_INFO=$(security find-certificate -c "$CERT_NAME" -p 2>/dev/null | openssl x509 -noout -startdate -enddate 2>/dev/null)
    CREATED=$(echo "$CERT_INFO" | grep "notBefore" | sed 's/notBefore=//')
    EXPIRES=$(echo "$CERT_INFO" | grep "notAfter" | sed 's/notAfter=//')
    echo "   Created: $CREATED"
    echo "   Expires: $EXPIRES"
    echo "   Hash: $CERT_HASH"
    echo
done < <(security find-identity -p codesigning -v | grep "$CERT_PATTERN")

if [[ $COUNT -eq 0 ]]; then
    echo -e "${RED}No ${WORKFLOW_NAME} certificates found in your keychain.${NC}"
    if [[ $WORKFLOW_TYPE == "development" ]]; then
        echo "Please create a development certificate in Xcode before continuing."
    else
        echo "Please create a distribution certificate in your Apple Developer account before continuing."
    fi
    exit 1
fi

# Let user select certificate
if [[ $WORKFLOW_TYPE == "distribution" ]]; then
    read -p "Enter the certificate number (prefer iPhone Distribution for app distribution): " CERT_NUM
else
    read -p "Enter the certificate number: " CERT_NUM
fi

if [[ $CERT_NUM -gt $COUNT || $CERT_NUM -lt 1 ]]; then
    echo -e "${RED}Invalid certificate number.${NC}"
    exit 1
fi

CERT_NUM=$((CERT_NUM-1))
SELECTED_CERT_NAME="${CERT_NAMES[$CERT_NUM]}"

echo -e "${GREEN}Selected: ${SELECTED_CERT_NAME}${NC}"

# Determine certificate type for validation
ACTUAL_CERT_TYPE="development"
if [[ "$SELECTED_CERT_NAME" == *"Distribution"* ]]; then
    ACTUAL_CERT_TYPE="distribution"
fi

# Validate certificate type matches workflow
if [[ $WORKFLOW_TYPE == "distribution" && $ACTUAL_CERT_TYPE == "development" ]]; then
    echo -e "${YELLOW}Warning: You selected a development certificate for distribution workflow.${NC}"
    echo -e "For distribution builds, an iPhone Distribution certificate is recommended."
    read -p "Continue anyway? (y/n): " CONTINUE_CERT
    if [[ $CONTINUE_CERT != "y" && $CONTINUE_CERT != "Y" ]]; then
        echo -e "${RED}Exiting. Please select a distribution certificate.${NC}"
        exit 1
    fi
elif [[ $WORKFLOW_TYPE == "development" && $ACTUAL_CERT_TYPE == "distribution" ]]; then
    echo -e "${BLUE}Note: Using distribution certificate for development workflow.${NC}"
    echo -e "This will work but development certificates are typically used for development."
fi

# Password setup
DEFAULT_PASSWORD="ios123"
echo -e "\n${YELLOW}Password selection for certificate:${NC}"
echo -e "1) Use default simple password (${GREEN}$DEFAULT_PASSWORD${NC}) - recommended for GitHub Actions"
echo -e "2) Enter a custom password"
read -p "Choose an option (1/2): " PASSWORD_OPTION

if [[ $PASSWORD_OPTION == "2" ]]; then
    read -sp "Enter your custom password: " CERT_PASSWORD
    echo
    # Confirm password
    read -sp "Confirm password: " CERT_PASSWORD_CONFIRM
    echo
    
    if [[ "$CERT_PASSWORD" != "$CERT_PASSWORD_CONFIRM" ]]; then
        echo -e "${RED}Passwords don't match. Exiting.${NC}"
        exit 1
    fi
    
    # Warn about special characters
    if [[ "$CERT_PASSWORD" != "${CERT_PASSWORD//[^a-zA-Z0-9]/}" ]]; then
        echo -e "${YELLOW}Warning: Your password contains special characters which might cause issues with GitHub Actions.${NC}"
        read -p "Continue anyway? (y/n): " CONTINUE
        if [[ $CONTINUE != "y" && $CONTINUE != "Y" ]]; then
            echo -e "${RED}Exiting.${NC}"
            exit 1
        fi
    fi
else
    CERT_PASSWORD="$DEFAULT_PASSWORD"
fi

# Export certificate
P12_FILE="$TEMP_DIR/ios_${WORKFLOW_TYPE}.p12"

echo -e "\nExporting certificate to P12 file with the selected password."
echo -e "${YELLOW}REMEMBER THIS PASSWORD as you'll need it for GitHub secrets!${NC}"

security export -t identities -f pkcs12 -k ~/Library/Keychains/login.keychain-db -P "$CERT_PASSWORD" -o "$P12_FILE" "$SELECTED_CERT_NAME"

if [ ! -f "$P12_FILE" ]; then
    echo -e "${RED}Failed to export certificate. Please try again.${NC}"
    exit 1
fi

echo -e "${GREEN}Certificate exported successfully to $P12_FILE${NC}"
echo -e "Certificate size: $(wc -c < "$P12_FILE") bytes"

# Step 4: Provisioning Profile Discovery and Selection
echo -e "\n${GREEN}Step 4: Provisioning Profile Discovery${NC}"
echo "Searching for iOS provisioning profiles in all standard locations..."

# Create a list of possible profile locations
PROFILES_FOUND=false
ALL_PROFILES=()

# Check standard locations
SEARCH_LOCATIONS=(
    "$HOME/Library/MobileDevice/Provisioning Profiles"
    "$HOME/Library/Developer/Xcode/UserData/Provisioning Profiles"
    "$HOME/Downloads"
    "$(pwd)"
    "$(pwd)/ios-credentials"
    "$(pwd)/credentials"
    "$(pwd)/certificates"
)

echo -e "${BLUE}Searching in standard locations:${NC}"
for location in "${SEARCH_LOCATIONS[@]}"; do
    if [ -d "$location" ]; then
        echo -e "  📁 Checking: $location"
        
        # Original loop with null check
        while IFS= read -r profile; do
            if [ -n "$profile" ]; then  # Keep null check
                ALL_PROFILES+=("$profile")
                PROFILES_FOUND=true
            fi
        done < <(find "$location" -name "*.mobileprovision" -type f 2>/dev/null)
    fi
done

# Check DerivedData for embedded profiles
echo -e "  📁 Checking Xcode DerivedData..."
while IFS= read -r profile; do
    ALL_PROFILES+=("$profile")
    PROFILES_FOUND=true
done < <(find ~/Library/Developer/Xcode/DerivedData -name "*.mobileprovision" -type f 2>/dev/null)

# Option to skip local installation if user has files ready
echo -e "\n${YELLOW}Provisioning Profile Options:${NC}"
if [ "$PROFILES_FOUND" = true ]; then
    echo "1) Use existing profiles found on this system"
    echo "2) I have the profile file(s) ready to install"
    echo "3) Skip - I'll add the profile manually later"
    read -p "Choose option (1/2/3): " PROFILE_OPTION
else
    echo "No profiles found in standard locations."
    echo "1) I have the profile file(s) ready to install"
    echo "2) Skip - I'll add the profile manually later"
    read -p "Choose option (1/2): " PROFILE_OPTION
    PROFILE_OPTION=$((PROFILE_OPTION + 1))  # Adjust for missing option 1
fi

SELECTED_PROFILE=""
SELECTED_PROFILE_NAME=""
SELECTED_TEAM_ID=""

if [[ $PROFILE_OPTION == "1" && "$PROFILES_FOUND" = true ]]; then
    # Use existing profiles
    echo -e "\n${GREEN}Available provisioning profiles:${NC}"
    COUNT=1
    declare -a PROFILE_PATHS
    declare -a PROFILE_NAMES
    declare -a PROFILE_TEAM_IDS

    for profile_path in "${ALL_PROFILES[@]}"; do
        # Extract profile info
        PROFILE_CONTENT=$(security cms -D -i "$profile_path" 2>/dev/null)
        PROFILE_NAME=$(echo "$PROFILE_CONTENT" | plutil -extract Name xml1 -o - - 2>/dev/null | plutil -p - 2>/dev/null | tr -d '"')
        
        # Extract team ID from the profile
        PROFILE_TEAM_ID=$(echo "$PROFILE_CONTENT" | plutil -extract TeamIdentifier.0 xml1 -o - - 2>/dev/null | plutil -p - 2>/dev/null | tr -d '"')
        
        # Store in arrays
        PROFILE_PATHS+=("$profile_path")
        PROFILE_NAMES+=("$PROFILE_NAME")
        PROFILE_TEAM_IDS+=("$PROFILE_TEAM_ID")
        
        # Extract app identifier (bundle ID)
        APP_ID=$(echo "$PROFILE_CONTENT" | plutil -extract Entitlements.application-identifier xml1 -o - - 2>/dev/null | plutil -p - 2>/dev/null | tr -d '"' | sed "s/^$PROFILE_TEAM_ID\\.//")
        
        # Determine profile type
        PROFILE_TYPE="Unknown"
        if echo "$PROFILE_CONTENT" | grep -q "<key>get-task-allow</key>"; then
            PROFILE_TYPE="Development"
        elif echo "$PROFILE_CONTENT" | grep -q "<key>ProvisionedDevices</key>"; then
            PROFILE_TYPE="Ad-Hoc"
        else
            PROFILE_TYPE="App Store"
        fi
        
        # Smart recommendation logic
        RECOMMENDATION=""
        MARKER=""
        RECOMMENDATION_SCORE=0
        
        # Primary criteria: Profile type matches workflow
        if [[ $WORKFLOW_TYPE == "distribution" && "$PROFILE_TYPE" == "Ad-Hoc" ]]; then
            RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 10))
        elif [[ $WORKFLOW_TYPE == "development" && "$PROFILE_TYPE" == "Development" ]]; then
            RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 10))
        fi
        
        # Secondary criteria: Team ID matches
        if [[ "$PROFILE_TEAM_ID" == "$TEAM_ID" ]]; then
            RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 5))
        fi
        
        # Tertiary criteria: Specific bundle ID (not wildcard)
        if [[ "$APP_ID" != "*" && -n "$APP_ID" ]]; then
            RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 3))
        fi
        
        # Quaternary criteria: Not in embedded/build locations (prefer system installed)
        if [[ "$profile_path" == *"/Library/MobileDevice/Provisioning Profiles/"* ]]; then
            RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 2))
        elif [[ "$profile_path" == *"/DerivedData/"* || "$profile_path" == *"/build/"* || "$profile_path" == *"embedded.mobileprovision"* ]]; then
            RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE - 2))
        fi
        
        # Set recommendation markers based on score
        if [[ $RECOMMENDATION_SCORE -ge 15 ]]; then
            RECOMMENDATION=" 🌟 HIGHLY RECOMMENDED"
            MARKER="🌟 "
        elif [[ $RECOMMENDATION_SCORE -ge 10 ]]; then
            RECOMMENDATION=" ⭐ RECOMMENDED"
            MARKER="⭐ "
        elif [[ $RECOMMENDATION_SCORE -ge 5 ]]; then
            RECOMMENDATION=" ✓ SUITABLE"
            MARKER="✓ "
        fi
        
        echo "${MARKER}${COUNT}) $PROFILE_NAME${RECOMMENDATION}"
        echo "   Type: $PROFILE_TYPE | Team ID: $PROFILE_TEAM_ID | App ID: $APP_ID"
        echo "   Path: $profile_path"
        echo
        
        COUNT=$((COUNT+1))
    done

    TOTAL_PROFILES=${#PROFILE_PATHS[@]}
    
    if [ $TOTAL_PROFILES -eq 0 ]; then
        echo -e "${RED}No valid provisioning profiles could be processed.${NC}"
        exit 1
    fi

    # User selection
    if [[ $WORKFLOW_TYPE == "development" ]]; then
        echo -e "${BLUE}For development workflow, select a Development profile.${NC}"
    else
        echo -e "${BLUE}For distribution workflow, select an Ad-Hoc profile.${NC}"
    fi
    
    read -p "Select a provisioning profile (enter number 1-$TOTAL_PROFILES): " PROFILE_NUM

    if [[ $PROFILE_NUM -gt $TOTAL_PROFILES || $PROFILE_NUM -lt 1 ]]; then
        echo -e "${RED}Invalid profile number.${NC}"
        exit 1
    fi

    # Get the selected profile info
    PROFILE_INDEX=$((PROFILE_NUM-1))
    SELECTED_PROFILE="${PROFILE_PATHS[$PROFILE_INDEX]}"
    SELECTED_PROFILE_NAME="${PROFILE_NAMES[$PROFILE_INDEX]}"
    SELECTED_TEAM_ID="${PROFILE_TEAM_IDS[$PROFILE_INDEX]}"

elif [[ $PROFILE_OPTION == "2" || ($PROFILE_OPTION == "1" && "$PROFILES_FOUND" = false) ]]; then
    # User has profile files ready
    echo -e "\n${YELLOW}Profile Installation Guide:${NC}"
    echo -e "If you have received the profile file (.mobileprovision), you can:"
    echo -e "1. Double-click the .mobileprovision file (opens in Xcode/System and installs automatically)"
    echo -e "2. Manually copy to: ~/Library/MobileDevice/Provisioning Profiles/"
    echo -e "3. Or provide the file path and we'll read it directly"
    echo
    
    echo -e "${BLUE}What would you like to do?${NC}"
    echo -e "1) I've already installed the profile - re-scan for profiles"
    echo -e "2) Specify the file path to read the profile directly"  
    echo -e "3) Skip profile setup for now"
    read -p "Choose option (1/2/3): " PROFILE_INSTALL_OPTION
    
    if [[ $PROFILE_INSTALL_OPTION == "1" ]]; then
        # Re-scan for profiles after installation
        echo -e "\n${YELLOW}Re-scanning for newly installed profiles...${NC}"
        
        # Clear previous results and re-scan
        ALL_PROFILES=()
        PROFILES_FOUND=false
        
        # Re-run the profile discovery logic
        for location in "${SEARCH_LOCATIONS[@]}"; do
            if [ -d "$location" ]; then
                while IFS= read -r profile; do
                    if [ -n "$profile" ]; then
                        ALL_PROFILES+=("$profile")
                        PROFILES_FOUND=true
                    fi
                done < <(find "$location" -name "*.mobileprovision" -type f 2>/dev/null)
            fi
        done
        
        # Check DerivedData again
        while IFS= read -r profile; do
            ALL_PROFILES+=("$profile")
            PROFILES_FOUND=true
        done < <(find ~/Library/Developer/Xcode/DerivedData -name "*.mobileprovision" -type f 2>/dev/null)
        
        if [ "$PROFILES_FOUND" = true ]; then
            echo -e "${GREEN}Found profiles! Displaying updated list...${NC}"
            
            # Re-display the profile selection logic
            echo -e "\n${GREEN}Available provisioning profiles:${NC}"
            COUNT=1
            declare -a PROFILE_PATHS
            declare -a PROFILE_NAMES
            declare -a PROFILE_TEAM_IDS

            for profile_path in "${ALL_PROFILES[@]}"; do
                # Extract profile info
                PROFILE_CONTENT=$(security cms -D -i "$profile_path" 2>/dev/null)
                PROFILE_NAME=$(echo "$PROFILE_CONTENT" | plutil -extract Name xml1 -o - - 2>/dev/null | plutil -p - 2>/dev/null | tr -d '"')
                
                # Extract team ID from the profile
                PROFILE_TEAM_ID=$(echo "$PROFILE_CONTENT" | plutil -extract TeamIdentifier.0 xml1 -o - - 2>/dev/null | plutil -p - 2>/dev/null | tr -d '"')
                
                # Store in arrays
                PROFILE_PATHS+=("$profile_path")
                PROFILE_NAMES+=("$PROFILE_NAME")
                PROFILE_TEAM_IDS+=("$PROFILE_TEAM_ID")
                
                # Extract app identifier (bundle ID)
                APP_ID=$(echo "$PROFILE_CONTENT" | plutil -extract Entitlements.application-identifier xml1 -o - - 2>/dev/null | plutil -p - 2>/dev/null | tr -d '"' | sed "s/^$PROFILE_TEAM_ID\\.//")
                
                # Determine profile type
                PROFILE_TYPE="Unknown"
                if echo "$PROFILE_CONTENT" | grep -q "<key>get-task-allow</key>"; then
                    PROFILE_TYPE="Development"
                elif echo "$PROFILE_CONTENT" | grep -q "<key>ProvisionedDevices</key>"; then
                    PROFILE_TYPE="Ad-Hoc"
                else
                    PROFILE_TYPE="App Store"
                fi
                
                # Smart recommendation logic
                RECOMMENDATION=""
                MARKER=""
                RECOMMENDATION_SCORE=0
                
                # Primary criteria: Profile type matches workflow
                if [[ $WORKFLOW_TYPE == "distribution" && "$PROFILE_TYPE" == "Ad-Hoc" ]]; then
                    RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 10))
                elif [[ $WORKFLOW_TYPE == "development" && "$PROFILE_TYPE" == "Development" ]]; then
                    RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 10))
                fi
                
                # Secondary criteria: Team ID matches
                if [[ "$PROFILE_TEAM_ID" == "$TEAM_ID" ]]; then
                    RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 5))
                fi
                
                # Tertiary criteria: Specific bundle ID (not wildcard)
                if [[ "$APP_ID" != "*" && -n "$APP_ID" ]]; then
                    RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 3))
                fi
                
                # Quaternary criteria: Not in embedded/build locations (prefer system installed)
                if [[ "$profile_path" == *"/Library/MobileDevice/Provisioning Profiles/"* ]]; then
                    RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE + 2))
                elif [[ "$profile_path" == *"/DerivedData/"* || "$profile_path" == *"/build/"* || "$profile_path" == *"embedded.mobileprovision"* ]]; then
                    RECOMMENDATION_SCORE=$((RECOMMENDATION_SCORE - 2))
                fi
                
                # Set recommendation markers based on score
                if [[ $RECOMMENDATION_SCORE -ge 15 ]]; then
                    RECOMMENDATION=" 🌟 HIGHLY RECOMMENDED"
                    MARKER="🌟 "
                elif [[ $RECOMMENDATION_SCORE -ge 10 ]]; then
                    RECOMMENDATION=" ⭐ RECOMMENDED"
                    MARKER="⭐ "
                elif [[ $RECOMMENDATION_SCORE -ge 5 ]]; then
                    RECOMMENDATION=" ✓ SUITABLE"
                    MARKER="✓ "
                fi
                
                echo "${MARKER}${COUNT}) $PROFILE_NAME${RECOMMENDATION}"
                echo "   Type: $PROFILE_TYPE | Team ID: $PROFILE_TEAM_ID | App ID: $APP_ID"
                echo "   Path: $profile_path"
                echo
                
                COUNT=$((COUNT+1))
            done

            TOTAL_PROFILES=${#PROFILE_PATHS[@]}
            
            if [ $TOTAL_PROFILES -eq 0 ]; then
                echo -e "${RED}No valid provisioning profiles could be processed.${NC}"
                SELECTED_PROFILE=""
            else
                # User selection
                if [[ $WORKFLOW_TYPE == "development" ]]; then
                    echo -e "${BLUE}For development workflow, select a Development profile.${NC}"
                else
                    echo -e "${BLUE}For distribution workflow, select an Ad-Hoc profile.${NC}"
                fi
                
                read -p "Select a provisioning profile (enter number 1-$TOTAL_PROFILES): " PROFILE_NUM

                if [[ $PROFILE_NUM -gt $TOTAL_PROFILES || $PROFILE_NUM -lt 1 ]]; then
                    echo -e "${RED}Invalid profile number.${NC}"
                    SELECTED_PROFILE=""
                else
                    # Get the selected profile info
                    PROFILE_INDEX=$((PROFILE_NUM-1))
                    SELECTED_PROFILE="${PROFILE_PATHS[$PROFILE_INDEX]}"
                    SELECTED_PROFILE_NAME="${PROFILE_NAMES[$PROFILE_INDEX]}"
                    SELECTED_TEAM_ID="${PROFILE_TEAM_IDS[$PROFILE_INDEX]}"
                fi
            fi
        else
            echo -e "${YELLOW}No profiles found after re-scan. You may need to install the profile first.${NC}"
            SELECTED_PROFILE=""
        fi
        
    elif [[ $PROFILE_INSTALL_OPTION == "2" ]]; then
        # Specify file path directly
        echo -e "\n${YELLOW}Direct File Path Option:${NC}"
        read -p "Enter the full path to your provisioning profile: " PROVIDED_PROFILE
        
        if [ ! -f "$PROVIDED_PROFILE" ]; then
            echo -e "${RED}Profile file not found at: $PROVIDED_PROFILE${NC}"
            echo -e "${YELLOW}Skipping profile setup. You can add the profile secret manually later.${NC}"
            SELECTED_PROFILE=""
        else
            SELECTED_PROFILE="$PROVIDED_PROFILE"
            
            # Extract profile info
            PROFILE_CONTENT=$(security cms -D -i "$SELECTED_PROFILE" 2>/dev/null)
            SELECTED_PROFILE_NAME=$(echo "$PROFILE_CONTENT" | plutil -extract Name xml1 -o - - 2>/dev/null | plutil -p - 2>/dev/null | tr -d '"')
            SELECTED_TEAM_ID=$(echo "$PROFILE_CONTENT" | plutil -extract TeamIdentifier.0 xml1 -o - - 2>/dev/null | plutil -p - 2>/dev/null | tr -d '"')
            
            echo -e "${GREEN}Profile loaded: $SELECTED_PROFILE_NAME${NC}"
        fi
        
    else
        # Skip profile setup
        echo -e "${YELLOW}Skipping provisioning profile setup.${NC}"
        if [[ $WORKFLOW_TYPE == "testflight" ]]; then
            echo -e "${BLUE}You'll need to add IOS_APPSTORE_PROVISIONING_PROFILE secret manually later.${NC}"
        else
            echo -e "${BLUE}You'll need to add IOS_ADHOC_PROVISIONING_PROFILE secret manually later.${NC}"
        fi
        SELECTED_PROFILE=""
    fi
    
else
    # Skip profile setup
    echo -e "${YELLOW}Skipping provisioning profile setup.${NC}"
    if [[ $WORKFLOW_TYPE == "testflight" ]]; then
        echo -e "${BLUE}You'll need to add IOS_APPSTORE_PROVISIONING_PROFILE secret manually later.${NC}"
    else
        echo -e "${BLUE}You'll need to add IOS_ADHOC_PROVISIONING_PROFILE secret manually later.${NC}"
    fi
    SELECTED_PROFILE=""
fi

# Update Team ID if found from profile
if [ -n "$SELECTED_TEAM_ID" ]; then
    TEAM_ID="$SELECTED_TEAM_ID"
    echo -e "Using Team ID from selected profile: ${GREEN}${TEAM_ID}${NC}"
fi

# Display selection summary
echo -e "\n${GREEN}Selection Summary:${NC}"
echo -e "Workflow: ${CYAN}$WORKFLOW_NAME${NC}"
echo -e "Certificate: ${GREEN}$SELECTED_CERT_NAME${NC}"
if [ -n "$SELECTED_PROFILE_NAME" ]; then
    echo -e "Profile: ${GREEN}$SELECTED_PROFILE_NAME${NC}"
fi
echo -e "Team ID: ${GREEN}$TEAM_ID${NC}"

# Step 5: Convert files to base64
echo -e "\n${GREEN}Step 5: Converting Files to Base64${NC}"

# Convert certificate
echo -e "Converting certificate to base64..."
P12_BASE64=$(base64 -i "$P12_FILE" | tr -d '\n')
if [ -z "$P12_BASE64" ]; then
    echo -e "${RED}Error: Failed to create base64 for certificate.${NC}"
    exit 1
fi

# Convert provisioning profile if available
PROFILE_BASE64=""
if [ -n "$SELECTED_PROFILE" ] && [ -f "$SELECTED_PROFILE" ]; then
    echo -e "Converting provisioning profile to base64..."
    PROFILE_BASE64=$(base64 -i "$SELECTED_PROFILE" | tr -d '\n')
    if [ -z "$PROFILE_BASE64" ]; then
        echo -e "${RED}Error: Failed to create base64 for profile.${NC}"
        exit 1
    fi
fi

# Verification
P12_LEN=${#P12_BASE64}
echo -e "${GREEN}Certificate base64 length: ${P12_LEN} characters${NC}"

if [ -n "$PROFILE_BASE64" ]; then
    PROFILE_LEN=${#PROFILE_BASE64}
    echo -e "${GREEN}Profile base64 length: ${PROFILE_LEN} characters${NC}"
fi

# Step 6: Generate GitHub Secrets with Step-by-Step Clipboard Support
echo -e "\n${GREEN}Step 6: GitHub Secrets Setup${NC}"

# Generate the secrets
SECRETS=()
SECRET_NAMES=()
SECRET_VALUES=()

# Always add team ID and certificate
SECRETS+=("APPLE_TEAM_ID")
SECRET_NAMES+=("APPLE_TEAM_ID")
SECRET_VALUES+=("$TEAM_ID")

SECRETS+=("${SECRET_PREFIX}_CERTIFICATE")
SECRET_NAMES+=("${SECRET_PREFIX}_CERTIFICATE")
SECRET_VALUES+=("$P12_BASE64")

SECRETS+=("${SECRET_PREFIX}_CERTIFICATE_PASSWORD")
SECRET_NAMES+=("${SECRET_PREFIX}_CERTIFICATE_PASSWORD")
SECRET_VALUES+=("$CERT_PASSWORD")

# Add profile if available
if [ -n "$PROFILE_BASE64" ]; then
    if [[ $WORKFLOW_TYPE == "testflight" ]]; then
        SECRETS+=("IOS_APPSTORE_PROVISIONING_PROFILE")
        SECRET_NAMES+=("IOS_APPSTORE_PROVISIONING_PROFILE")
        SECRET_VALUES+=("$PROFILE_BASE64")
    else
        SECRETS+=("IOS_ADHOC_PROVISIONING_PROFILE")
        SECRET_NAMES+=("IOS_ADHOC_PROVISIONING_PROFILE")
        SECRET_VALUES+=("$PROFILE_BASE64")
    fi
fi

# Optional Diawi token for distribution
if [[ $WORKFLOW_TYPE == "distribution" ]]; then
    echo -e "\n${YELLOW}Optional: Diawi Token for OTA Distribution${NC}"
    echo -e "If you want automatic upload to Diawi for OTA testing:"
    read -p "Enter your Diawi token (or press Enter to skip): " DIAWI_TOKEN
    
    if [ -n "$DIAWI_TOKEN" ]; then
        SECRETS+=("DIAWI_TOKEN")
        SECRET_NAMES+=("DIAWI_TOKEN")
        SECRET_VALUES+=("$DIAWI_TOKEN")
    fi
fi

# App Store Connect API Setup (Required for TestFlight)
if [[ $WORKFLOW_TYPE == "testflight" ]]; then
    echo -e "\n${BLUE}App Store Connect API Setup (Required for TestFlight)${NC}"
    echo -e "${BLUE}You'll need to create an App Store Connect API key for uploading to TestFlight.${NC}"
    echo -e "${BLUE}This is different from your Apple Developer account - it's for programmatic access.${NC}"
    echo
    
    echo -e "${YELLOW}Step-by-step App Store Connect API setup:${NC}"
    echo -e "1. Go to App Store Connect: https://appstoreconnect.apple.com/"
    echo -e "2. Click 'Users and Access' in the sidebar"
    echo -e "3. Click 'Keys' tab (next to 'Users')"
    echo -e "4. Click '+' to create a new API key"
    echo -e "5. Give it a name (e.g., 'GitHub Actions CI')"
    echo -e "6. Select 'Developer' role"
    echo -e "7. Click 'Generate'"
    echo -e "8. Download the .p8 key file immediately (you can only download it once)"
    echo -e "9. Copy the Key ID and Issuer ID from the page"
    echo
    
    # App Store Connect API Key ID
    echo -e "${YELLOW}App Store Connect API Key ID${NC}"
    echo -e "This is shown on the Keys page after creating the API key"
    echo -e "Format: Usually 10 characters like 'ABC123DEF4'"
    read -p "Enter your API Key ID: " API_KEY_ID
    
    if [ -n "$API_KEY_ID" ]; then
        SECRETS+=("APP_STORE_CONNECT_API_KEY_ID")
        SECRET_NAMES+=("APP_STORE_CONNECT_API_KEY_ID")
        SECRET_VALUES+=("$API_KEY_ID")
        echo -e "${GREEN}✓ API Key ID: $API_KEY_ID${NC}"
    else
        echo -e "${RED}API Key ID is required for TestFlight. Exiting.${NC}"
        exit 1
    fi
    
    # App Store Connect Issuer ID
    echo -e "\n${YELLOW}App Store Connect Issuer ID${NC}"
    echo -e "This is shown at the top of the Keys page"
    echo -e "Format: UUID like '12345678-1234-1234-1234-123456789012'"
    read -p "Enter your Issuer ID: " ISSUER_ID
    
    if [ -n "$ISSUER_ID" ]; then
        SECRETS+=("APP_STORE_CONNECT_ISSUER_ID")
        SECRET_NAMES+=("APP_STORE_CONNECT_ISSUER_ID")
        SECRET_VALUES+=("$ISSUER_ID")
        echo -e "${GREEN}✓ Issuer ID: $ISSUER_ID${NC}"
    else
        echo -e "${RED}Issuer ID is required for TestFlight. Exiting.${NC}"
        exit 1
    fi
    
    # App Store Connect API Key File
    echo -e "\n${YELLOW}App Store Connect API Key File (.p8)${NC}"
    echo -e "This is the .p8 file you downloaded when creating the API key"
    echo -e "It's usually named something like 'AuthKey_ABC123DEF4.p8'"
    echo -e "${BLUE}Examples:${NC}"
    echo -e "  /Users/\$USER/Downloads/AuthKey_ABC123DEF4.p8"
    echo -e "  \$HOME/Downloads/AuthKey_ABC123DEF4.p8"
    echo -e "  ~/Downloads/AuthKey_ABC123DEF4.p8"
    read -p "Enter the full path to your .p8 key file: " API_KEY_PATH
    
    # Expand tilde and environment variables
    API_KEY_PATH=$(eval echo "$API_KEY_PATH")
    
    if [ -f "$API_KEY_PATH" ]; then
        echo -e "${YELLOW}Converting API key to base64...${NC}"
        API_KEY_BASE64=$(base64 -i "$API_KEY_PATH" | tr -d '\n')
        
        if [ -n "$API_KEY_BASE64" ]; then
            SECRETS+=("APP_STORE_CONNECT_API_KEY")
            SECRET_NAMES+=("APP_STORE_CONNECT_API_KEY")
            SECRET_VALUES+=("$API_KEY_BASE64")
            echo -e "${GREEN}✓ API key converted to base64 (${#API_KEY_BASE64} characters)${NC}"
            echo -e "${BLUE}🔍 Debug: Main API key stored with ${#API_KEY_BASE64} characters${NC}"
            echo -e "${BLUE}🔍 Debug: Main API key preview: ${API_KEY_BASE64:0:50}...${NC}"
        else
            echo -e "${RED}Failed to convert API key to base64${NC}"
            exit 1
        fi
    else
        echo -e "${RED}API key file not found: $API_KEY_PATH${NC}"
        echo -e "${YELLOW}Please check the file path and try again.${NC}"
        echo -e "${BLUE}Tip: Use absolute path like /Users/\$(whoami)/Downloads/filename.p8${NC}"
        echo -e "${RED}The .p8 file is required for TestFlight. Exiting.${NC}"
        exit 1
    fi
    
    # Additional P8 Keys (for enhanced security/multiple purposes)
    echo -e "\n${YELLOW}Additional P8 Keys (Optional)${NC}"
    echo -e "You can add additional P8 keys for different purposes:"
    echo -e "• Separate tester management key (App Manager role)"
    echo -e "• Team-specific keys for different projects"
    echo -e "• Backup keys with different permissions"
    echo
    
    while true; do
        read -p "Do you have another P8 key to add? (y/n): " ADD_ANOTHER_KEY
        
        if [[ $ADD_ANOTHER_KEY == "y" || $ADD_ANOTHER_KEY == "Y" ]]; then
            echo -e "\n${CYAN}Additional P8 Key Setup${NC}"
            
            # Get purpose/name for this key
            echo -e "${YELLOW}What is this key for?${NC}"
            echo -e "1) Tester Management (App Manager role)"
            echo -e "2) Team/Project specific key"
            echo -e "3) Backup key"
            echo -e "4) Custom purpose"
            read -p "Choose option (1-4): " KEY_PURPOSE_OPTION
            
            case $KEY_PURPOSE_OPTION in
                1)
                    KEY_PURPOSE="TESTER"
                    KEY_DESCRIPTION="App Store Connect Tester Management Key"
                    SUGGESTED_NAME="APP_STORE_CONNECT_TESTER_API_KEY"
                    ;;
                2)
                    read -p "Enter team/project name (e.g., 'TEAM1', 'PROJECT_X'): " CUSTOM_NAME
                    KEY_PURPOSE=$(echo "$CUSTOM_NAME" | tr '[:lower:]' '[:upper:]' | tr ' -' '_')
                    KEY_DESCRIPTION="App Store Connect Key for $CUSTOM_NAME"
                    SUGGESTED_NAME="APP_STORE_CONNECT_${KEY_PURPOSE}_API_KEY"
                    ;;
                3)
                    KEY_PURPOSE="BACKUP"
                    KEY_DESCRIPTION="App Store Connect Backup Key"
                    SUGGESTED_NAME="APP_STORE_CONNECT_BACKUP_API_KEY"
                    ;;
                4)
                    read -p "Enter custom purpose (e.g., 'DEPLOYMENT', 'STAGING'): " CUSTOM_PURPOSE
                    KEY_PURPOSE=$(echo "$CUSTOM_PURPOSE" | tr '[:lower:]' '[:upper:]' | tr ' -' '_')
                    KEY_DESCRIPTION="App Store Connect Key for $CUSTOM_PURPOSE"
                    SUGGESTED_NAME="APP_STORE_CONNECT_${KEY_PURPOSE}_API_KEY"
                    ;;
                *)
                    echo -e "${RED}Invalid option. Using custom purpose.${NC}"
                    KEY_PURPOSE="CUSTOM"
                    KEY_DESCRIPTION="App Store Connect Custom Key"
                    SUGGESTED_NAME="APP_STORE_CONNECT_CUSTOM_API_KEY"
                    ;;
            esac
            
            # Get custom secret name if user wants
            echo -e "\n${BLUE}Suggested secret name: ${SUGGESTED_NAME}${NC}"
            read -p "Press Enter to use suggested name, or type custom name: " CUSTOM_SECRET_NAME
            
            if [ -n "$CUSTOM_SECRET_NAME" ]; then
                FINAL_SECRET_NAME="$CUSTOM_SECRET_NAME"
            else
                FINAL_SECRET_NAME="$SUGGESTED_NAME"
            fi
            
            # Get corresponding API Key ID
            echo -e "\n${YELLOW}API Key ID for this key${NC}"
            echo -e "This should be different from your main API Key ID"
            read -p "Enter the API Key ID for this $KEY_DESCRIPTION: " ADDITIONAL_API_KEY_ID
            
            if [ -n "$ADDITIONAL_API_KEY_ID" ]; then
                # Add API Key ID secret - Fix naming convention
                if [[ "$FINAL_SECRET_NAME" == "APP_STORE_CONNECT_TESTER_API_KEY" ]]; then
                    ADDITIONAL_KEY_ID_NAME="APP_STORE_CONNECT_TESTER_API_KEY_ID"
                else
                    # For other keys, append _ID to the base name
                    ADDITIONAL_KEY_ID_NAME="${FINAL_SECRET_NAME}_ID"
                fi
                
                SECRETS+=("$ADDITIONAL_KEY_ID_NAME")
                SECRET_NAMES+=("$ADDITIONAL_KEY_ID_NAME")
                SECRET_VALUES+=("$ADDITIONAL_API_KEY_ID")
                echo -e "${GREEN}✓ Added: $ADDITIONAL_KEY_ID_NAME${NC}"
            fi
            
            # Get P8 file path
            echo -e "\n${YELLOW}P8 File for $KEY_DESCRIPTION${NC}"
            read -p "Enter the full path to this .p8 key file: " ADDITIONAL_API_KEY_PATH
            
            # Expand tilde and environment variables
            ADDITIONAL_API_KEY_PATH=$(eval echo "$ADDITIONAL_API_KEY_PATH")
            
            # Check if this is the same file as the main API key
            if [ "$ADDITIONAL_API_KEY_PATH" = "$API_KEY_PATH" ]; then
                echo -e "${RED}⚠️ Warning: You're using the same .p8 file as your main API key!${NC}"
                echo -e "${YELLOW}This means both secrets will have identical content.${NC}"
                echo -e "${BLUE}For different roles, you need different API keys from App Store Connect.${NC}"
                echo
                read -p "Continue anyway? (y/n): " CONTINUE_SAME_FILE
                if [[ $CONTINUE_SAME_FILE != "y" && $CONTINUE_SAME_FILE != "Y" ]]; then
                    echo -e "${YELLOW}Skipping this additional key...${NC}"
                    continue
                fi
            fi
            
            if [ -f "$ADDITIONAL_API_KEY_PATH" ]; then
                echo -e "${YELLOW}Converting additional API key to base64...${NC}"
                ADDITIONAL_API_KEY_BASE64=$(base64 -i "$ADDITIONAL_API_KEY_PATH" | tr -d '\n')
                
                if [ -n "$ADDITIONAL_API_KEY_BASE64" ]; then
                    # Check if this base64 content is the same as main API key
                    if [ "$ADDITIONAL_API_KEY_BASE64" = "$API_KEY_BASE64" ]; then
                        echo -e "${RED}⚠️ Warning: This API key has identical content to your main API key!${NC}"
                        echo -e "${YELLOW}Both keys will have the same permissions and capabilities.${NC}"
                        echo -e "${BLUE}Consider using different API keys for different roles.${NC}"
                        echo
                    fi
                    
                    SECRETS+=("$FINAL_SECRET_NAME")
                    SECRET_NAMES+=("$FINAL_SECRET_NAME")
                    SECRET_VALUES+=("$ADDITIONAL_API_KEY_BASE64")
                    echo -e "${GREEN}✓ $KEY_DESCRIPTION converted to base64 (${#ADDITIONAL_API_KEY_BASE64} characters)${NC}"
                    echo -e "${BLUE}Secret name: $FINAL_SECRET_NAME${NC}"
                    echo -e "${BLUE}🔍 Debug: Additional API key stored with ${#ADDITIONAL_API_KEY_BASE64} characters${NC}"
                    echo -e "${BLUE}🔍 Debug: Additional API key preview: ${ADDITIONAL_API_KEY_BASE64:0:50}...${NC}"
                    echo -e "${BLUE}🔍 Debug: Files used - Main: $(basename "$API_KEY_PATH"), Additional: $(basename "$ADDITIONAL_API_KEY_PATH")${NC}"
                else
                    echo -e "${RED}Failed to convert additional API key to base64${NC}"
                fi
            else
                echo -e "${RED}Additional API key file not found: $ADDITIONAL_API_KEY_PATH${NC}"
                echo -e "${YELLOW}Skipping this key...${NC}"
            fi
            
        else
            break
        fi
    done
    
    # TestFlight Internal Testers
    echo -e "\n${YELLOW}TestFlight Internal Testers (Optional)${NC}"
    echo -e "You can specify internal testers as a repository variable"
    echo -e "These must be team members added to your App Store Connect team"
    echo -e "Format: comma-separated emails (e.g., dev1@company.com,dev2@company.com)"
    read -p "Enter internal tester emails (or press Enter to skip): " TESTFLIGHT_TESTERS
    
    if [ -n "$TESTFLIGHT_TESTERS" ]; then
        echo -e "${GREEN}✓ Internal Testers: $TESTFLIGHT_TESTERS${NC}"
        echo -e "${BLUE}Note: Add this as a repository VARIABLE (not secret) named 'TESTFLIGHT_INTERNAL_TESTERS'${NC}"
    else
        echo -e "${YELLOW}Skipped internal testers - you can add them in App Store Connect later${NC}"
    fi
    
    echo -e "\n${GREEN}✅ App Store Connect API setup complete!${NC}"
    echo -e "${BLUE}Your builds will now upload to TestFlight automatically${NC}"
fi

# Firebase App Distribution Setup (Optional)
echo -e "\n${YELLOW}Optional: Firebase App Distribution Setup${NC}"
echo -e "${BLUE}Firebase App Distribution provides:${NC}"
echo -e "• Automatic email notifications to testers"
echo -e "• Centralized tester management with groups"
echo -e "• Release notes and version tracking"
echo -e "• Integration with other Firebase services"
echo -e "• Free tier with generous limits"
echo
read -p "Would you like to set up Firebase App Distribution? (y/n): " SETUP_FIREBASE

if [[ $SETUP_FIREBASE == "y" || $SETUP_FIREBASE == "Y" ]]; then
    echo -e "\n${GREEN}Firebase App Distribution Configuration${NC}"
    echo -e "${BLUE}You'll need to have a Firebase project set up first.${NC}"
    echo -e "${BLUE}Visit https://console.firebase.google.com/ to create or access your project.${NC}"
    echo
    
    # Firebase Project ID
    echo -e "${YELLOW}Firebase Project ID${NC}"
    echo -e "You can find your Project ID in Firebase Console → Project Settings"
    read -p "Enter your Firebase Project ID (or press Enter to skip): " FIREBASE_PROJECT_ID
    
    if [ -n "$FIREBASE_PROJECT_ID" ]; then
        SECRETS+=("FIREBASE_PROJECT_ID")
        SECRET_NAMES+=("FIREBASE_PROJECT_ID")
        SECRET_VALUES+=("$FIREBASE_PROJECT_ID")
        echo -e "${GREEN}✓ Firebase Project ID: $FIREBASE_PROJECT_ID${NC}"
    else
        echo -e "${YELLOW}Skipped Firebase Project ID${NC}"
    fi
    
    # Firebase App ID (iOS)
    echo -e "\n${YELLOW}Firebase App ID (iOS)${NC}"
    echo -e "You need to register your iOS app in Firebase Console:"
    echo -e "1. Go to Firebase Console → Add app → iOS"
    echo -e "2. Enter bundle ID from your tauri.conf.json"
    echo -e "3. Copy the App ID (format: 1:123456789:ios:abcdef123456)"
    read -p "Enter your Firebase iOS App ID (or press Enter to skip): " FIREBASE_APP_ID_IOS
    
    if [ -n "$FIREBASE_APP_ID_IOS" ]; then
        SECRETS+=("FIREBASE_APP_ID_IOS")
        SECRET_NAMES+=("FIREBASE_APP_ID_IOS")
        SECRET_VALUES+=("$FIREBASE_APP_ID_IOS")
        echo -e "${GREEN}✓ Firebase iOS App ID: $FIREBASE_APP_ID_IOS${NC}"
    else
        echo -e "${YELLOW}Skipped Firebase iOS App ID${NC}"
    fi
    
    # Firebase Service Account
    echo -e "\n${YELLOW}Firebase Service Account${NC}"
    echo -e "You need to create a service account with Firebase App Distribution Admin role:"
    echo -e "1. Go to Google Cloud Console → IAM & Admin → Service Accounts"
    echo -e "2. Create service account with 'Firebase App Distribution Admin' role"
    echo -e "3. Create and download a JSON key file"
    echo
    read -p "Do you have a service account JSON file ready? (y/n): " HAS_SERVICE_ACCOUNT
    
    if [[ $HAS_SERVICE_ACCOUNT == "y" || $HAS_SERVICE_ACCOUNT == "Y" ]]; then
        read -p "Enter the full path to your service account JSON file: " SERVICE_ACCOUNT_PATH
        
        if [ -f "$SERVICE_ACCOUNT_PATH" ]; then
            echo -e "${YELLOW}Converting service account to base64...${NC}"
            SERVICE_ACCOUNT_BASE64=$(base64 -i "$SERVICE_ACCOUNT_PATH" | tr -d '\n')
            
            if [ -n "$SERVICE_ACCOUNT_BASE64" ]; then
                SECRETS+=("FIREBASE_SERVICE_ACCOUNT_KEY")
                SECRET_NAMES+=("FIREBASE_SERVICE_ACCOUNT_KEY")
                SECRET_VALUES+=("$SERVICE_ACCOUNT_BASE64")
                echo -e "${GREEN}✓ Service account converted to base64 (${#SERVICE_ACCOUNT_BASE64} characters)${NC}"
            else
                echo -e "${RED}Failed to convert service account to base64${NC}"
            fi
        else
            echo -e "${RED}Service account file not found: $SERVICE_ACCOUNT_PATH${NC}"
        fi
    else
        echo -e "${YELLOW}Skipped Firebase Service Account${NC}"
        echo -e "${BLUE}You can add FIREBASE_SERVICE_ACCOUNT_KEY manually later${NC}"
    fi
    
    # Firebase Testers
    echo -e "\n${YELLOW}Firebase Testers (Optional)${NC}"
    echo -e "You can specify default testers as a repository variable (not a secret)"
    echo -e "Format: comma-separated emails (e.g., tester1@example.com,tester2@example.com)"
    read -p "Enter tester emails (or press Enter to skip): " FIREBASE_TESTERS
    
    if [ -n "$FIREBASE_TESTERS" ]; then
        echo -e "${GREEN}✓ Firebase Testers: $FIREBASE_TESTERS${NC}"
        echo -e "${BLUE}Note: Add this as a repository VARIABLE (not secret) named 'FIREBASE_TESTERS'${NC}"
    else
        echo -e "${YELLOW}Skipped Firebase Testers - you can add them in Firebase Console${NC}"
    fi
    
else
    echo -e "${YELLOW}Skipped Firebase App Distribution setup${NC}"
fi

# Step-by-step clipboard copying (macOS)
if command -v pbcopy &> /dev/null; then
    echo -e "\n${GREEN}Step-by-Step GitHub Secrets Setup (macOS)${NC}"
    echo -e "${BLUE}We'll copy each secret to your clipboard one by one to avoid copy/paste errors${NC}"
    echo -e "After each copy, go to GitHub and paste it immediately before continuing.\n"
    
    echo -e "${CYAN}GitHub Setup Instructions:${NC}"
    echo -e "1. Go to your GitHub repository"
    echo -e "2. Navigate to Settings → Secrets and variables → Actions"
    echo -e "3. Click 'New repository secret' for each secret below"
    echo
    
    read -p "Ready to start copying secrets to clipboard? Press Enter to continue..."
    
    # Copy each secret one by one
    for i in "${!SECRETS[@]}"; do
        SECRET_NAME="${SECRET_NAMES[$i]}"
        SECRET_VALUE="${SECRET_VALUES[$i]}"
        
        echo -e "\n${YELLOW}$((i+1))/${#SECRETS[@]}: Copying $SECRET_NAME to clipboard...${NC}"
        echo "$SECRET_VALUE" | pbcopy
        
        # Show preview for verification
        if [[ ${#SECRET_VALUE} -gt 50 ]]; then
            echo -e "${GREEN}✓ $SECRET_NAME copied to clipboard (${#SECRET_VALUE} characters)${NC}"
            echo -e "${BLUE}Preview:${NC} ${SECRET_VALUE:0:30}...${SECRET_VALUE: -10}"
        else
            echo -e "${GREEN}✓ $SECRET_NAME copied to clipboard${NC}"
            echo -e "${BLUE}Value:${NC} $SECRET_VALUE"
        fi
        
        echo -e "Go to GitHub → Settings → Secrets → Actions → New repository secret"
        echo -e "Name: ${YELLOW}$SECRET_NAME${NC}"
        echo -e "Value: ${YELLOW}Paste from clipboard (Cmd+V)${NC}"
        
        if [[ $i -lt $((${#SECRETS[@]}-1)) ]]; then
            read -p "Press Enter after you've added this secret in GitHub..."
        else
            read -p "Press Enter after you've added this final secret in GitHub..."
        fi
    done
    
    echo -e "\n${GREEN}🎉 All secrets should now be configured in GitHub Actions!${NC}"
    
    # Show variable reminders if provided
    VARIABLES_FOR_BACKUP=()
    if [ -n "$FIREBASE_TESTERS" ]; then
        VARIABLES_FOR_BACKUP+=("FIREBASE_TESTERS:$FIREBASE_TESTERS")
    fi
    if [ -n "$TESTFLIGHT_TESTERS" ]; then
        VARIABLES_FOR_BACKUP+=("TESTFLIGHT_INTERNAL_TESTERS:$TESTFLIGHT_TESTERS")
    fi
    
    if [ ${#VARIABLES_FOR_BACKUP[@]} -gt 0 ]; then
        echo "# === REPOSITORY VARIABLES (NOT SECRETS) ==="
        echo "# Add these as repository VARIABLES at:"
        echo "# Settings > Secrets and variables > Actions > Variables tab"
        for var in "${VARIABLES_FOR_BACKUP[@]}"; do
            VAR_NAME="${var%%:*}"
            VAR_VALUE="${var#*:}"
            echo "$VAR_NAME=$VAR_VALUE"
        done
        echo
    fi
    
else
    # Fallback for non-macOS systems
    echo -e "\n${YELLOW}Manual Setup Required (non-macOS system)${NC}"
    echo -e "Since pbcopy is not available, you'll need to copy secrets manually:"
    echo -e "\n${BLUE}Go to GitHub → Settings → Secrets → Actions and add these secrets:${NC}\n"
    
    # Separate required and optional secrets for manual setup
    REQUIRED_SECRETS=()
    REQUIRED_SECRET_VALUES=()
    OPTIONAL_SECRETS_MANUAL=()
    OPTIONAL_SECRET_VALUES_MANUAL=()
    
    for i in "${!SECRETS[@]}"; do
        SECRET_NAME="${SECRET_NAMES[$i]}"
        SECRET_VALUE="${SECRET_VALUES[$i]}"
        
        if [[ "$SECRET_NAME" == "FIREBASE_"* || "$SECRET_NAME" == "DIAWI_TOKEN" ]]; then
            OPTIONAL_SECRETS_MANUAL+=("$SECRET_NAME")
            OPTIONAL_SECRET_VALUES_MANUAL+=("$SECRET_VALUE")
        else
            REQUIRED_SECRETS+=("$SECRET_NAME")
            REQUIRED_SECRET_VALUES+=("$SECRET_VALUE")
        fi
    done
    
    echo -e "${CYAN}=== REQUIRED iOS SIGNING SECRETS ===${NC}"
    for i in "${!REQUIRED_SECRETS[@]}"; do
        SECRET_NAME="${REQUIRED_SECRETS[$i]}"
        SECRET_VALUE="${REQUIRED_SECRET_VALUES[$i]}"
        
        echo -e "${YELLOW}$((i+1)). $SECRET_NAME${NC}"
        if [[ ${#SECRET_VALUE} -gt 100 ]]; then
            echo -e "   Copy the entire line below:"
            echo -e "   ${SECRET_VALUE}"
        else
            echo -e "   Value: ${SECRET_VALUE}"
        fi
        echo
    done
    
    # Optional distribution secrets
    if [ ${#OPTIONAL_SECRETS_MANUAL[@]} -gt 0 ]; then
        echo -e "${CYAN}=== OPTIONAL DISTRIBUTION SECRETS ===${NC}"
        
        SECRET_NUM=$((${#REQUIRED_SECRETS[@]} + 1))
        for i in "${!OPTIONAL_SECRETS_MANUAL[@]}"; do
            SECRET_NAME="${OPTIONAL_SECRETS_MANUAL[$i]}"
            SECRET_VALUE="${OPTIONAL_SECRET_VALUES_MANUAL[$i]}"
            
            echo -e "${YELLOW}$SECRET_NUM. $SECRET_NAME${NC}"
            if [[ ${#SECRET_VALUE} -gt 100 ]]; then
                echo -e "   Copy the entire line below:"
                echo -e "   ${SECRET_VALUE}"
            else
                echo -e "   Value: ${SECRET_VALUE}"
            fi
            echo
            SECRET_NUM=$((SECRET_NUM + 1))
        done
    fi
    
    # Show Firebase Testers variable reminder if provided
    if [ -n "$FIREBASE_TESTERS" ]; then
        echo -e "${CYAN}=== REPOSITORY VARIABLE (NOT A SECRET) ===${NC}"
        echo -e "${YELLOW}FIREBASE_TESTERS${NC} (add as repository variable)"
        echo -e "   Go to: Settings → Secrets and variables → Actions → Variables tab"
        echo -e "   Value: $FIREBASE_TESTERS"
        echo
    fi
fi

# Generate backup file for reference
OUTPUT_FILE="$TEMP_DIR/github_secrets_${WORKFLOW_TYPE}.txt"

# Debug: Show what secrets we have before writing to file
echo -e "\n${BLUE}🔍 Debug: Final secrets summary:${NC}"
for i in "${!SECRETS[@]}"; do
    SECRET_NAME="${SECRET_NAMES[$i]}"
    SECRET_VALUE="${SECRET_VALUES[$i]}"
    echo -e "${BLUE}  [$i] $SECRET_NAME = ${SECRET_VALUE:0:50}... (${#SECRET_VALUE} chars)${NC}"
done

{
    echo "# GitHub Secrets for iOS $WORKFLOW_NAME Builds"
    echo "# Generated on $(date)"
    echo 
    echo "# Add these secrets to your GitHub repository at:"
    echo "# Settings > Secrets and variables > Actions > New repository secret"
    echo
    echo "# === REQUIRED iOS SIGNING SECRETS ==="
    for i in "${!SECRETS[@]}"; do
        SECRET_NAME="${SECRET_NAMES[$i]}"
        SECRET_VALUE="${SECRET_VALUES[$i]}"
        
        # Skip Firebase secrets for the required section
        if [[ "$SECRET_NAME" == "FIREBASE_"* ]]; then
            continue
        fi
        
        echo "# $SECRET_NAME"
        echo "$SECRET_NAME=$SECRET_VALUE"
        echo
    done
    
    # Add Firebase secrets if any were configured
    HAS_FIREBASE_SECRETS=false
    for i in "${!SECRETS[@]}"; do
        SECRET_NAME="${SECRET_NAMES[$i]}"
        if [[ "$SECRET_NAME" == "FIREBASE_"* ]]; then
            HAS_FIREBASE_SECRETS=true
            break
        fi
    done
    
    if [ "$HAS_FIREBASE_SECRETS" = true ]; then
        echo "# === OPTIONAL FIREBASE APP DISTRIBUTION SECRETS ==="
        for i in "${!SECRETS[@]}"; do
            SECRET_NAME="${SECRET_NAMES[$i]}"
            SECRET_VALUE="${SECRET_VALUES[$i]}"
            
            # Only include Firebase secrets
            if [[ "$SECRET_NAME" == "FIREBASE_"* ]]; then
                echo "# $SECRET_NAME"
                echo "$SECRET_NAME=$SECRET_VALUE"
                echo
            fi
        done
    fi
    
    # Add variable notes if provided
    VARIABLES_FOR_BACKUP=()
    if [ -n "$FIREBASE_TESTERS" ]; then
        VARIABLES_FOR_BACKUP+=("FIREBASE_TESTERS:$FIREBASE_TESTERS")
    fi
    if [ -n "$TESTFLIGHT_TESTERS" ]; then
        VARIABLES_FOR_BACKUP+=("TESTFLIGHT_INTERNAL_TESTERS:$TESTFLIGHT_TESTERS")
    fi
    
    if [ ${#VARIABLES_FOR_BACKUP[@]} -gt 0 ]; then
        echo "# === REPOSITORY VARIABLES (NOT SECRETS) ==="
        echo "# Add these as repository VARIABLES at:"
        echo "# Settings > Secrets and variables > Actions > Variables tab"
        for var in "${VARIABLES_FOR_BACKUP[@]}"; do
            VAR_NAME="${var%%:*}"
            VAR_VALUE="${var#*:}"
            echo "$VAR_NAME=$VAR_VALUE"
        done
        echo
    fi
    
    echo "# Workflow Type: $WORKFLOW_NAME"
    echo "# Certificate: $SELECTED_CERT_NAME"
    if [ -n "$SELECTED_PROFILE_NAME" ]; then
        echo "# Profile: $SELECTED_PROFILE_NAME"
    fi
    echo "# Team ID: $TEAM_ID"
} > "$OUTPUT_FILE"

# Final verification and cleanup
echo -e "\n${BLUE}Final Verification Steps:${NC}"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings → Secrets and variables → Actions"
echo "3. Verify you have these secrets:"
for SECRET_NAME in "${SECRET_NAMES[@]}"; do
    if [[ "$SECRET_NAME" != "FIREBASE_"* && "$SECRET_NAME" != "DIAWI_TOKEN" ]]; then
        echo "   - $SECRET_NAME"
    fi
done

# Show optional secrets if any were configured
HAS_OPTIONAL_SECRETS=false
for SECRET_NAME in "${SECRET_NAMES[@]}"; do
    if [[ "$SECRET_NAME" == "FIREBASE_"* || "$SECRET_NAME" == "DIAWI_TOKEN" ]]; then
        HAS_OPTIONAL_SECRETS=true
        break
    fi
done

if [ "$HAS_OPTIONAL_SECRETS" = true ]; then
    echo "   Optional distribution secrets:"
    for SECRET_NAME in "${SECRET_NAMES[@]}"; do
        if [[ "$SECRET_NAME" == "FIREBASE_"* || "$SECRET_NAME" == "DIAWI_TOKEN" ]]; then
            echo "   - $SECRET_NAME"
        fi
    done
fi

VARIABLES_TO_VERIFY=()
if [ -n "$FIREBASE_TESTERS" ]; then
    VARIABLES_TO_VERIFY+=("FIREBASE_TESTERS")
fi
if [ -n "$TESTFLIGHT_TESTERS" ]; then
    VARIABLES_TO_VERIFY+=("TESTFLIGHT_INTERNAL_TESTERS")
fi

if [ ${#VARIABLES_TO_VERIFY[@]} -gt 0 ]; then
    NEXT_STEP=4
    echo "$NEXT_STEP. Add repository variables: ${VARIABLES_TO_VERIFY[*]} (in Variables tab, not Secrets)"
    NEXT_STEP=$((NEXT_STEP + 1))
    
    if [[ $WORKFLOW_TYPE == "development" ]]; then
        echo "$NEXT_STEP. Run your development iOS workflow to test"
    elif [[ $WORKFLOW_TYPE == "testflight" ]]; then
        echo "$NEXT_STEP. Run your TestFlight iOS workflow to test"
    else
        echo "$NEXT_STEP. Run your distribution iOS workflow to test"
    fi
else
    if [[ $WORKFLOW_TYPE == "development" ]]; then
        echo "4. Run your development iOS workflow to test"
    elif [[ $WORKFLOW_TYPE == "testflight" ]]; then
        echo "4. Run your TestFlight iOS workflow to test"
    else
        echo "4. Run your distribution iOS workflow to test"
    fi
fi

echo -e "\n${GREEN}Success! iOS $WORKFLOW_NAME secrets are ready for GitHub Actions.${NC}"

# Cleanup options
echo -e "\n${YELLOW}Cleanup:${NC}"
echo -e "Generated files:"
echo -e "• Secrets backup: ${BLUE}$OUTPUT_FILE${NC}"
echo -e "• Certificate: ${BLUE}$P12_FILE${NC}"

read -p "Would you like to view the complete secrets file for reference? (y/n): " VIEW_FILE
if [[ $VIEW_FILE == "y" || $VIEW_FILE == "Y" ]]; then
    echo -e "\n${YELLOW}=== COMPLETE SECRETS FILE ===${NC}"
    cat "$OUTPUT_FILE"
    echo -e "${YELLOW}=== END SECRETS FILE ===${NC}\n"
fi

read -p "Would you like to delete the temporary files now? (y/n): " CLEANUP
if [[ $CLEANUP == "y" || $CLEANUP == "Y" ]]; then
    rm -rf "$TEMP_DIR"
    echo -e "${GREEN}Temporary files deleted.${NC}"
else
    echo -e "${YELLOW}Temporary files preserved at: $TEMP_DIR${NC}"
fi

# Certificate cleanup for temporarily installed certificates
if [[ ${TEMP_CERT_INSTALLED:-false} == true ]]; then
    echo -e "\n${YELLOW}Certificate Cleanup:${NC}"
    echo -e "You installed a certificate temporarily for this process."
    echo -e "Certificate: ${BLUE}$TEMP_CERT_NAME${NC}"
    echo -e "\n${YELLOW}Options:${NC}"
    echo -e "1) Remove the certificate from keychain (recommended for security)"
    echo -e "2) Keep the certificate for future use"
    read -p "Choose option (1/2): " CERT_CLEANUP_OPTION
    
    if [[ $CERT_CLEANUP_OPTION == "1" ]]; then
        echo -e "\n${YELLOW}Removing certificate from keychain...${NC}"
        if security delete-identity -c "$TEMP_CERT_NAME" ~/Library/Keychains/login.keychain-db 2>/dev/null; then
            echo -e "${GREEN}✅ Certificate removed successfully.${NC}"
            echo -e "${BLUE}Your GitHub secrets contain the certificate data, so this doesn't affect your builds.${NC}"
        else
            echo -e "${YELLOW}⚠️  Could not automatically remove certificate.${NC}"
            echo -e "You can manually remove it from Keychain Access if desired."
        fi
    else
        echo -e "${BLUE}Certificate kept in keychain for future use.${NC}"
    fi
fi

echo -e "\n${BLUE}==================================================================${NC}"
echo -e "${GREEN}iOS Secrets Setup Complete!${NC}"
echo -e "${BLUE}Your $WORKFLOW_NAME workflow should now work with these secrets.${NC}"
echo -e "${BLUE}==================================================================${NC}" 