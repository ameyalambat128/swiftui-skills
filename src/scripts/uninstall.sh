#!/bin/bash
# swiftui-skills uninstaller

set -e

SKILL_NAME="swiftui-skills"
INSTALL_DIR="${HOME}/.${SKILL_NAME}"
CLAUDE_SKILLS_DIR="${HOME}/.claude/skills"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

echo ""
echo -e "${BLUE}swiftui-skills${NC} uninstaller"
echo ""

# Remove Claude Code symlink
print_step "Removing Claude Code integration..."
if [ -L "$CLAUDE_SKILLS_DIR/$SKILL_NAME" ]; then
    rm "$CLAUDE_SKILLS_DIR/$SKILL_NAME"
    print_success "Removed Claude Code link"
else
    print_success "No Claude Code link found"
fi

# Remove install directory
print_step "Removing skill files..."
if [ -d "$INSTALL_DIR" ]; then
    rm -rf "$INSTALL_DIR"
    print_success "Removed $INSTALL_DIR"
else
    print_success "Install directory not found"
fi

echo ""
print_success "Uninstall complete!"
echo ""
