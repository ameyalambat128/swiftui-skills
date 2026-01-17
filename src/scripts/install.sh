#!/bin/bash
# swiftui-skills installer
# Extracts Apple documentation from Xcode and sets up the skill

set -e

SKILL_NAME="swiftui-skills"
INSTALL_DIR="${HOME}/.${SKILL_NAME}"
CUSTOM_XCODE_PATH=""
CUSTOM_DOCS_PATH=""

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

show_help() {
    echo ""
    echo -e "${BLUE}/swiftui-skills${NC} installer"
    echo ""
    echo "Usage: install.sh [options]"
    echo ""
    echo "Options:"
    echo "  --xcode-path PATH    Path to Xcode.app (if not in /Applications)"
    echo "  --docs-path PATH     Direct path to AdditionalDocumentation folder"
    echo "  --help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./install.sh"
    echo "  ./install.sh --xcode-path /Applications/Xcode-beta.app"
    echo "  ./install.sh --docs-path ~/Downloads/AdditionalDocumentation"
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

# Function to find docs in an Xcode installation
find_docs_in_xcode() {
    local xcode_path="$1"
    local docs_path="${xcode_path}/Contents/PlugIns/IDEIntelligenceChat.framework/Versions/A/Resources/AdditionalDocumentation"

    if [ -d "$docs_path" ]; then
        echo "$docs_path"
        return 0
    fi

    # Try alternative path
    docs_path="${xcode_path}/Contents/PlugIns/IDEIntelligenceChat.framework/Resources/AdditionalDocumentation"
    if [ -d "$docs_path" ]; then
        echo "$docs_path"
        return 0
    fi

    return 1
}

# Function to prompt user for path
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

    # Expand ~ if present
    user_path="${user_path/#\~/$HOME}"

    # Check if it's a docs path (contains AdditionalDocumentation or has .md files)
    if [[ "$user_path" == *"AdditionalDocumentation"* ]] || [ -f "$user_path"/*.md ] 2>/dev/null; then
        if [ -d "$user_path" ]; then
            XCODE_DOCS_PATH="$user_path"
            return 0
        fi
    fi

    # Check if it's an Xcode path
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
echo -e "${BLUE}/swiftui-skills${NC} installer"
echo ""

# Determine docs path
XCODE_DOCS_PATH=""

if [ -n "$CUSTOM_DOCS_PATH" ]; then
    # User provided direct docs path
    CUSTOM_DOCS_PATH="${CUSTOM_DOCS_PATH/#\~/$HOME}"
    if [ -d "$CUSTOM_DOCS_PATH" ]; then
        XCODE_DOCS_PATH="$CUSTOM_DOCS_PATH"
        print_success "Using provided docs path: $XCODE_DOCS_PATH"
    else
        print_error "Docs path not found: $CUSTOM_DOCS_PATH"
        exit 1
    fi
elif [ -n "$CUSTOM_XCODE_PATH" ]; then
    # User provided custom Xcode path
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
    # Auto-detect
    print_step "Checking for Xcode..."

    # Try standard locations
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

    # If still not found, search broadly
    if [ -z "$XCODE_DOCS_PATH" ]; then
        print_step "Searching for AdditionalDocumentation..."
        XCODE_DOCS_PATH=$(find /Applications/Xcode*.app -name "AdditionalDocumentation" -type d 2>/dev/null | head -1) || true
    fi

    # If still not found, prompt user
    if [ -z "$XCODE_DOCS_PATH" ] || [ ! -d "$XCODE_DOCS_PATH" ]; then
        # Check if Xcode exists at all
        if [ ! -d "/Applications/Xcode.app" ] && [ ! -d "/Applications/Xcode-beta.app" ]; then
            print_error "Xcode not found"
            echo ""
            echo "    Please install Xcode from:"
            echo "    - App Store: https://apps.apple.com/app/xcode/id497799835"
            echo "    - Developer: https://developer.apple.com/xcode/"
            echo ""
            echo "    Or if Xcode is installed elsewhere, run:"
            echo "    ./install.sh --xcode-path /path/to/Xcode.app"
            echo ""
        fi

        prompt_for_path
    else
        print_success "Documentation found at: $XCODE_DOCS_PATH"
    fi
fi

# Create temp directory for skill files
TMP_DIR="$(mktemp -d)"
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

# Download skill files from GitHub
print_step "Downloading skill files..."
REPO_RAW="https://raw.githubusercontent.com/ameyalambat128/swiftui-skills/main"

curl -fsSL "$REPO_RAW/src/skill/SKILL.md" -o "$TMP_DIR/SKILL.md"
curl -fsSL "$REPO_RAW/src/skill/manifest.json" -o "$TMP_DIR/manifest.json"

# Download prompts
mkdir -p "$TMP_DIR/prompts"
for prompt in system router reviewer generator refactorer; do
    curl -fsSL "$REPO_RAW/src/skill/prompts/${prompt}.md" -o "$TMP_DIR/prompts/${prompt}.md" 2>/dev/null || true
done

print_success "Downloaded skill files"

# Extract documentation from Xcode
print_step "Extracting Apple documentation..."
mkdir -p "$TMP_DIR/docs"

doc_count=0
for doc in "$XCODE_DOCS_PATH"/*.md; do
    if [ -f "$doc" ]; then
        cp "$doc" "$TMP_DIR/docs/"
        ((doc_count++))
    fi
done

if [ $doc_count -eq 0 ]; then
    print_warning "No markdown documentation found"
else
    print_success "Extracted $doc_count documentation files"
fi

# Create metadata
mkdir -p "$TMP_DIR/metadata"
XCODE_VERSION=$(/usr/bin/xcodebuild -version 2>/dev/null | head -1 | awk '{print $2}') || XCODE_VERSION="unknown"
cat > "$TMP_DIR/metadata/sources.json" << EOF
{
  "xcode_version": "$XCODE_VERSION",
  "extracted_at": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "docs_path": "$XCODE_DOCS_PATH",
  "doc_count": $doc_count
}
EOF

# Track which tools were configured
TOOLS_INSTALLED=0

# Install to Claude Code (also used by Cursor)
print_step "Installing to detected tools..."

if [ -d "$HOME/.claude" ]; then
    CLAUDE_DIR="$HOME/.claude/skills/$SKILL_NAME"
    rm -rf "$CLAUDE_DIR"
    mkdir -p "$CLAUDE_DIR"
    cp -R "$TMP_DIR/"* "$CLAUDE_DIR/"
    print_success "Claude Code: $CLAUDE_DIR"
    TOOLS_INSTALLED=$((TOOLS_INSTALLED + 1))
fi

# Install to Codex
if [ -d "$HOME/.codex" ]; then
    CODEX_DIR="$HOME/.codex/skills/$SKILL_NAME"
    rm -rf "$CODEX_DIR"
    mkdir -p "$CODEX_DIR"
    cp -R "$TMP_DIR/"* "$CODEX_DIR/"
    print_success "Codex: $CODEX_DIR"
    TOOLS_INSTALLED=$((TOOLS_INSTALLED + 1))
fi

# Install to OpenCode
if command -v opencode >/dev/null 2>&1 || [ -d "$HOME/.config/opencode" ]; then
    OPENCODE_DIR="$HOME/.config/opencode/skill/$SKILL_NAME"
    rm -rf "$OPENCODE_DIR"
    mkdir -p "$OPENCODE_DIR"
    cp -R "$TMP_DIR/"* "$OPENCODE_DIR/"
    print_success "OpenCode: $OPENCODE_DIR"
    TOOLS_INSTALLED=$((TOOLS_INSTALLED + 1))
fi

# Install to Windsurf
if [ -d "$HOME/.codeium" ]; then
    WINDSURF_DIR="$HOME/.codeium/windsurf/skills/$SKILL_NAME"
    rm -rf "$WINDSURF_DIR"
    mkdir -p "$WINDSURF_DIR"
    cp -R "$TMP_DIR/"* "$WINDSURF_DIR/"
    print_success "Windsurf: $WINDSURF_DIR"
    TOOLS_INSTALLED=$((TOOLS_INSTALLED + 1))
fi

# Install to Gemini CLI
if command -v gemini >/dev/null 2>&1 || [ -d "$HOME/.gemini" ]; then
    GEMINI_DIR="$HOME/.gemini/skills/$SKILL_NAME"
    rm -rf "$GEMINI_DIR"
    mkdir -p "$GEMINI_DIR"
    cp -R "$TMP_DIR/"* "$GEMINI_DIR/"
    print_success "Gemini CLI: $GEMINI_DIR"
    TOOLS_INSTALLED=$((TOOLS_INSTALLED + 1))
fi

# Install to Antigravity
if [ -d "$HOME/.gemini/antigravity" ]; then
    ANTIGRAVITY_DIR="$HOME/.gemini/antigravity/skills/$SKILL_NAME"
    rm -rf "$ANTIGRAVITY_DIR"
    mkdir -p "$ANTIGRAVITY_DIR"
    cp -R "$TMP_DIR/"* "$ANTIGRAVITY_DIR/"
    print_success "Antigravity: $ANTIGRAVITY_DIR"
    TOOLS_INSTALLED=$((TOOLS_INSTALLED + 1))
fi

echo ""
print_success "Installation complete!"
echo ""
echo "    Documentation: $doc_count files extracted from Xcode"
echo "    Tools configured: $TOOLS_INSTALLED"
echo ""
if [ "$TOOLS_INSTALLED" -eq 0 ]; then
    echo "    No supported tools detected."
    echo "    Install Claude Code, Codex, OpenCode, Windsurf, Gemini CLI, or Antigravity first."
    echo ""
fi
