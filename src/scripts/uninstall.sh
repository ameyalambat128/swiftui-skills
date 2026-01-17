#!/bin/bash
# swiftui-skills uninstaller

set -e

SKILL_NAME="swiftui-skills"

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
echo -e "${BLUE}/swiftui-skills${NC} uninstaller"
echo ""

TOOLS_REMOVED=0

# Remove from Claude Code (also used by Cursor)
print_step "Removing from detected tools..."

CLAUDE_DIR="$HOME/.claude/skills/$SKILL_NAME"
if [ -d "$CLAUDE_DIR" ] || [ -L "$CLAUDE_DIR" ]; then
    rm -rf "$CLAUDE_DIR"
    print_success "Claude Code: removed"
    TOOLS_REMOVED=$((TOOLS_REMOVED + 1))
fi

# Remove from Codex
CODEX_DIR="$HOME/.codex/skills/$SKILL_NAME"
if [ -d "$CODEX_DIR" ]; then
    rm -rf "$CODEX_DIR"
    print_success "Codex: removed"
    TOOLS_REMOVED=$((TOOLS_REMOVED + 1))
fi

# Remove from OpenCode
OPENCODE_DIR="$HOME/.config/opencode/skill/$SKILL_NAME"
if [ -d "$OPENCODE_DIR" ]; then
    rm -rf "$OPENCODE_DIR"
    print_success "OpenCode: removed"
    TOOLS_REMOVED=$((TOOLS_REMOVED + 1))
fi

# Remove from Windsurf
WINDSURF_DIR="$HOME/.codeium/windsurf/skills/$SKILL_NAME"
if [ -d "$WINDSURF_DIR" ]; then
    rm -rf "$WINDSURF_DIR"
    print_success "Windsurf: removed"
    TOOLS_REMOVED=$((TOOLS_REMOVED + 1))
fi

# Remove from Gemini CLI
GEMINI_DIR="$HOME/.gemini/skills/$SKILL_NAME"
if [ -d "$GEMINI_DIR" ]; then
    rm -rf "$GEMINI_DIR"
    print_success "Gemini CLI: removed"
    TOOLS_REMOVED=$((TOOLS_REMOVED + 1))
fi

# Remove from Antigravity
ANTIGRAVITY_DIR="$HOME/.gemini/antigravity/skills/$SKILL_NAME"
if [ -d "$ANTIGRAVITY_DIR" ]; then
    rm -rf "$ANTIGRAVITY_DIR"
    print_success "Antigravity: removed"
    TOOLS_REMOVED=$((TOOLS_REMOVED + 1))
fi

echo ""
print_success "Uninstall complete!"
echo ""
echo "    Tools cleaned: $TOOLS_REMOVED"
echo ""
