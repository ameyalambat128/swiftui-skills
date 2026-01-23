#!/bin/bash
# swiftui-skills setup
# Extracts Apple documentation from Xcode after npx skills install

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DOCS_DIR="$SCRIPT_DIR/docs"
METADATA_DIR="$SCRIPT_DIR/metadata"

CUSTOM_XCODE_PATH=""
CUSTOM_DOCS_PATH=""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

show_help() {
    echo ""
    echo -e "${BLUE}/swiftui-skills${NC} setup"
    echo ""
    echo "Extracts Apple documentation from Xcode to complete the skill installation."
    echo ""
    echo "Usage: setup.sh [options]"
    echo ""
    echo "Options:"
    echo "  --xcode-path PATH    Path to Xcode.app (if not in /Applications)"
    echo "  --docs-path PATH     Direct path to AdditionalDocumentation folder"
    echo "  --help               Show this help message"
    echo ""
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --xcode-path)
            CUSTOM_XCODE_PATH="$2"
            shift 2
            ;;
        --docs-path)
            CUSTOM_DOCS_PATH="$2"
            shift 2
            ;;
        --help|-h)
            show_help
            ;;
        *)
            print_error "Unknown option: $1"
            echo "    Use --help for usage information"
            exit 1
            ;;
    esac
done

find_docs_in_xcode() {
    local xcode_path="$1"
    local docs_path="${xcode_path}/Contents/PlugIns/IDEIntelligenceChat.framework/Versions/A/Resources/AdditionalDocumentation"

    if [ -d "$docs_path" ]; then
        echo "$docs_path"
        return 0
    fi

    docs_path="${xcode_path}/Contents/PlugIns/IDEIntelligenceChat.framework/Resources/AdditionalDocumentation"
    if [ -d "$docs_path" ]; then
        echo "$docs_path"
        return 0
    fi

    return 1
}

prompt_for_path() {
    echo ""
    print_warning "Could not automatically find the documentation."
    echo ""
    echo "    Please enter one of the following:"
    echo "    - Path to Xcode.app (e.g., /Applications/Xcode.app)"
    echo "    - Path to AdditionalDocumentation folder"
    echo ""
    read -p "    Path: " user_path

    if [ -z "$user_path" ]; then
        print_error "No path provided"
        exit 1
    fi

    user_path="${user_path/#\~/$HOME}"

    if [[ "$user_path" == *"AdditionalDocumentation"* ]] || [ -f "$user_path"/*.md ] 2>/dev/null; then
        if [ -d "$user_path" ]; then
            XCODE_DOCS_PATH="$user_path"
            return 0
        fi
    fi

    if [[ "$user_path" == *".app" ]] && [ -d "$user_path" ]; then
        local found_path
        found_path=$(find_docs_in_xcode "$user_path")
        if [ -n "$found_path" ]; then
            XCODE_DOCS_PATH="$found_path"
            return 0
        fi
    fi

    print_error "Could not find AdditionalDocumentation at the provided path"
    echo "    Make sure you have Xcode 26 or later installed"
    exit 1
}

echo ""
echo -e "${BLUE}/swiftui-skills${NC} setup"
echo ""

# Determine docs path
XCODE_DOCS_PATH=""

if [ -n "$CUSTOM_DOCS_PATH" ]; then
    CUSTOM_DOCS_PATH="${CUSTOM_DOCS_PATH/#\~/$HOME}"
    if [ -d "$CUSTOM_DOCS_PATH" ]; then
        XCODE_DOCS_PATH="$CUSTOM_DOCS_PATH"
        print_success "Using provided docs path: $XCODE_DOCS_PATH"
    else
        print_error "Docs path not found: $CUSTOM_DOCS_PATH"
        exit 1
    fi
elif [ -n "$CUSTOM_XCODE_PATH" ]; then
    CUSTOM_XCODE_PATH="${CUSTOM_XCODE_PATH/#\~/$HOME}"
    print_step "Checking custom Xcode path..."
    if [ ! -d "$CUSTOM_XCODE_PATH" ]; then
        print_error "Xcode not found at: $CUSTOM_XCODE_PATH"
        exit 1
    fi
    XCODE_DOCS_PATH=$(find_docs_in_xcode "$CUSTOM_XCODE_PATH") || true
    if [ -z "$XCODE_DOCS_PATH" ]; then
        print_error "AdditionalDocumentation not found in: $CUSTOM_XCODE_PATH"
        echo "    Make sure you have Xcode 26 or later"
        exit 1
    fi
    print_success "Documentation found at: $XCODE_DOCS_PATH"
else
    print_step "Checking for Xcode..."

    XCODE_LOCATIONS=(
        "/Applications/Xcode.app"
        "/Applications/Xcode-beta.app"
    )

    for xcode in "${XCODE_LOCATIONS[@]}"; do
        if [ -d "$xcode" ]; then
            print_success "Found $(basename "$xcode")"
            XCODE_DOCS_PATH=$(find_docs_in_xcode "$xcode") || true
            if [ -n "$XCODE_DOCS_PATH" ]; then
                break
            fi
        fi
    done

    if [ -z "$XCODE_DOCS_PATH" ]; then
        print_step "Searching for AdditionalDocumentation..."
        XCODE_DOCS_PATH=$(find /Applications/Xcode*.app -name "AdditionalDocumentation" -type d 2>/dev/null | head -1) || true
    fi

    if [ -z "$XCODE_DOCS_PATH" ] || [ ! -d "$XCODE_DOCS_PATH" ]; then
        if [ ! -d "/Applications/Xcode.app" ] && [ ! -d "/Applications/Xcode-beta.app" ]; then
            print_error "Xcode not found"
            echo ""
            echo "    Please install Xcode from:"
            echo "    - App Store: https://apps.apple.com/app/xcode/id497799835"
            echo "    - Developer: https://developer.apple.com/xcode/"
            echo ""
            echo "    Or run with a custom path:"
            echo "    $0 --xcode-path /path/to/Xcode.app"
            echo ""
            exit 1
        fi

        prompt_for_path
    else
        print_success "Documentation found at: $XCODE_DOCS_PATH"
    fi
fi

# Extract documentation
print_step "Extracting Apple documentation..."
mkdir -p "$DOCS_DIR"

doc_count=0
for doc in "$XCODE_DOCS_PATH"/*.md; do
    if [ -f "$doc" ]; then
        cp "$doc" "$DOCS_DIR/"
        ((doc_count++))
    fi
done

if [ $doc_count -eq 0 ]; then
    print_warning "No markdown documentation found"
else
    print_success "Extracted $doc_count documentation files"
fi

# Create metadata
mkdir -p "$METADATA_DIR"
XCODE_VERSION=$(/usr/bin/xcodebuild -version 2>/dev/null | head -1 | awk '{print $2}') || XCODE_VERSION="unknown"
cat > "$METADATA_DIR/sources.json" << EOF
{
  "xcode_version": "$XCODE_VERSION",
  "extracted_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "docs_path": "$XCODE_DOCS_PATH",
  "doc_count": $doc_count
}
EOF

echo ""
print_success "Setup complete!"
echo ""
echo "    Documentation: $doc_count files extracted from Xcode"
echo "    Location: $DOCS_DIR"
echo ""
echo "    The skill is now ready to use."
echo ""
