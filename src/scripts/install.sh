#!/bin/bash
# swiftui-skills installer
# Extracts Apple documentation from Xcode and sets up the skill

set -e

SKILL_NAME="swiftui-skills"
INSTALL_DIR="${HOME}/.${SKILL_NAME}"
XCODE_DOCS_PATH="/Applications/Xcode.app/Contents/Developer/Documentation/SwiftUI/Additional"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

echo ""
echo -e "${BLUE}swiftui-skills${NC} installer"
echo ""

# Check for Xcode
print_step "Checking for Xcode..."
if [ ! -d "/Applications/Xcode.app" ]; then
    print_error "Xcode not found at /Applications/Xcode.app"
    echo "    Please install Xcode from the App Store or developer.apple.com"
    exit 1
fi
print_success "Xcode found"

# Check for Xcode docs
print_step "Checking for Xcode documentation..."
if [ ! -d "$XCODE_DOCS_PATH" ]; then
    print_warning "Additional documentation not found at expected path"
    print_warning "Looking for alternative documentation paths..."

    # Try to find docs in other locations
    XCODE_DOCS_PATH=$(find /Applications/Xcode.app -name "AdditionalDocumentation" -type d 2>/dev/null | head -1)

    if [ -z "$XCODE_DOCS_PATH" ]; then
        print_error "Could not find Apple AdditionalDocumentation in Xcode"
        echo "    This may require a newer version of Xcode"
        exit 1
    fi
fi
print_success "Documentation found at: $XCODE_DOCS_PATH"

# Create install directory
print_step "Creating install directory..."
mkdir -p "$INSTALL_DIR"
print_success "Created $INSTALL_DIR"

# Clone or update the skill repo
print_step "Downloading skill files..."
REPO_URL="https://github.com/ameyalambat/swiftui-skills"

if [ -d "$INSTALL_DIR/.git" ]; then
    # Already cloned, just pull
    cd "$INSTALL_DIR"
    git pull --quiet origin main
    print_success "Updated skill files"
else
    # Fresh clone
    git clone --quiet --depth 1 "$REPO_URL" "$INSTALL_DIR/temp"
    # Move skill directory contents
    cp -R "$INSTALL_DIR/temp/src/skill/"* "$INSTALL_DIR/"
    cp -R "$INSTALL_DIR/temp/src/scripts" "$INSTALL_DIR/"
    rm -rf "$INSTALL_DIR/temp"
    print_success "Downloaded skill files"
fi

# Extract documentation
print_step "Extracting Apple documentation..."
mkdir -p "$INSTALL_DIR/docs"

# Copy markdown files from Xcode docs
doc_count=0
for doc in "$XCODE_DOCS_PATH"/*.md; do
    if [ -f "$doc" ]; then
        cp "$doc" "$INSTALL_DIR/docs/"
        ((doc_count++))
    fi
done

if [ $doc_count -eq 0 ]; then
    print_warning "No markdown documentation found"
else
    print_success "Extracted $doc_count documentation files"
fi

# Create metadata
print_step "Creating metadata..."
mkdir -p "$INSTALL_DIR/metadata"
XCODE_VERSION=$(/usr/bin/xcodebuild -version 2>/dev/null | head -1 | awk '{print $2}')
cat > "$INSTALL_DIR/metadata/sources.json" << EOF
{
  "xcode_version": "$XCODE_VERSION",
  "extracted_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "docs_path": "$XCODE_DOCS_PATH",
  "doc_count": $doc_count
}
EOF
print_success "Metadata created"

# Setup for Claude Code
print_step "Setting up for Claude Code..."
CLAUDE_SKILLS_DIR="${HOME}/.claude/skills"
mkdir -p "$CLAUDE_SKILLS_DIR"

if [ ! -L "$CLAUDE_SKILLS_DIR/$SKILL_NAME" ]; then
    ln -sf "$INSTALL_DIR" "$CLAUDE_SKILLS_DIR/$SKILL_NAME"
    print_success "Linked to Claude Code skills"
else
    print_success "Claude Code link already exists"
fi

echo ""
print_success "Installation complete!"
echo ""
echo "    Installed to: $INSTALL_DIR"
echo "    Documentation: $doc_count files extracted"
echo ""
echo "    The skill is now available for Claude Code."
echo "    For Cursor, add the skill path to your configuration."
echo ""
