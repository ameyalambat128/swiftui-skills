#!/bin/bash
# swiftui-skills installer
# Extracts Apple documentation from Xcode and sets up the skill

set -e

SKILL_NAME="swiftui-skills"
CUSTOM_XCODE_PATH=""
CUSTOM_DOCS_PATH=""

# Colors (matching Vercel's npx skills style)
GRAY1='\033[38;5;250m'
GRAY2='\033[38;5;248m'
GRAY3='\033[38;5;245m'
GRAY4='\033[38;5;243m'
GRAY5='\033[38;5;240m'
GRAY6='\033[38;5;238m'
PINK='\033[38;5;174m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
DIM='\033[38;5;102m'
NC='\033[0m'

# TUI helpers
print_banner() {
    echo ""
    echo -e "${GRAY1}███████╗██╗    ██╗██╗███████╗████████╗██╗   ██╗██╗${NC}"
    echo -e "${GRAY2}██╔════╝██║    ██║██║██╔════╝╚══██╔══╝██║   ██║██║${NC}"
    echo -e "${GRAY3}███████╗██║ █╗ ██║██║█████╗     ██║   ██║   ██║██║${NC}"
    echo -e "${GRAY4}╚════██║██║███╗██║██║██╔══╝     ██║   ██║   ██║██║${NC}"
    echo -e "${GRAY5}███████║╚███╔███╔╝██║██║        ██║   ╚██████╔╝██║${NC}"
    echo -e "${GRAY6}╚══════╝ ╚══╝╚══╝ ╚═╝╚═╝        ╚═╝    ╚═════╝ ╚═╝${NC}"
    echo -e "${DIM}                                           skills${NC}"
    echo ""
}

print_header() {
    echo -e "┌   ${PINK}$1${NC}"
}

print_line() {
    echo "│"
}

print_step() {
    echo -e "◇  $1"
}

print_substep() {
    echo -e "│  $1"
}

print_success() {
    echo -e "◇  ${GREEN}$1${NC}"
}

print_warning() {
    echo -e "◇  ${YELLOW}$1${NC}"
}

print_error() {
    echo -e "◇  ${RED}$1${NC}"
}

print_footer() {
    echo -e "└  $1"
}

show_help() {
    print_banner
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
    print_line
    print_warning "Could not automatically find the documentation."
    print_line
    print_substep "Please enter one of the following:"
    print_substep "- Path to Xcode.app (e.g., /Applications/Xcode.app)"
    print_substep "- Path to AdditionalDocumentation folder"
    print_line
    read -p "│  Path: " user_path

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
    print_substep "Make sure you have Xcode 26 or later installed"
    exit 1
}

# Start
print_banner
print_header "$SKILL_NAME"
print_line

# Determine docs path
XCODE_DOCS_PATH=""

if [ -n "$CUSTOM_DOCS_PATH" ]; then
    CUSTOM_DOCS_PATH="${CUSTOM_DOCS_PATH/#\~/$HOME}"
    if [ -d "$CUSTOM_DOCS_PATH" ]; then
        XCODE_DOCS_PATH="$CUSTOM_DOCS_PATH"
        print_success "Using provided docs path"
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
        print_substep "Make sure you have Xcode 26 or later"
        exit 1
    fi
    print_success "Documentation found"
else
    print_step "Checking for Xcode..."
    print_line

    XCODE_LOCATIONS=(
        "/Applications/Xcode.app"
        "/Applications/Xcode-beta.app"
    )

    FOUND_XCODE=""
    for xcode in "${XCODE_LOCATIONS[@]}"; do
        if [ -d "$xcode" ]; then
            FOUND_XCODE="$xcode"
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
            print_line
            print_substep "Please install Xcode from:"
            print_substep "- App Store: https://apps.apple.com/app/xcode/id497799835"
            print_substep "- Developer: https://developer.apple.com/xcode/"
            print_line
            print_substep "Or run with a custom path:"
            print_substep "./install.sh --xcode-path /path/to/Xcode.app"
            print_line
            exit 1
        fi

        prompt_for_path
    else
        XCODE_VERSION=$(/usr/bin/xcodebuild -version 2>/dev/null | head -1 | awk '{print $2}') || XCODE_VERSION="unknown"
        print_success "Found Xcode $XCODE_VERSION"
    fi
fi

print_line

# Create temp directory
TMP_DIR="$(mktemp -d)"
cleanup() { rm -rf "$TMP_DIR"; }
trap cleanup EXIT

# Download skill files
print_step "Downloading skill files..."
REPO_RAW="https://raw.githubusercontent.com/ameyalambat128/swiftui-skills/main"

curl -fsSL "$REPO_RAW/src/skill/SKILL.md" -o "$TMP_DIR/SKILL.md"
curl -fsSL "$REPO_RAW/src/skill/manifest.json" -o "$TMP_DIR/manifest.json"

mkdir -p "$TMP_DIR/prompts"
for prompt in system router reviewer generator refactorer; do
    curl -fsSL "$REPO_RAW/src/skill/prompts/${prompt}.md" -o "$TMP_DIR/prompts/${prompt}.md" 2>/dev/null || true
done

print_line

# Extract documentation
print_step "Extracting documentation..."
mkdir -p "$TMP_DIR/docs"

doc_count=0
for doc in "$XCODE_DOCS_PATH"/*.md; do
    if [ -f "$doc" ]; then
        cp "$doc" "$TMP_DIR/docs/"
        ((doc_count++))
    fi
done

print_success "Extracted $doc_count files from Xcode"
print_line

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

# Detect agents
print_step "Detecting agents..."

DETECTED_AGENTS=()
INSTALLED_PATHS=()

if [ -d "$HOME/.claude" ]; then
    DETECTED_AGENTS+=("Claude Code")
fi
if [ -d "$HOME/.cursor" ]; then
    DETECTED_AGENTS+=("Cursor")
fi
if [ -d "$HOME/.codex" ]; then
    DETECTED_AGENTS+=("Codex")
fi
if command -v opencode >/dev/null 2>&1 || [ -d "$HOME/.config/opencode" ]; then
    DETECTED_AGENTS+=("OpenCode")
fi
if [ -d "$HOME/.codeium" ]; then
    DETECTED_AGENTS+=("Windsurf")
fi
if command -v gemini >/dev/null 2>&1 || [ -d "$HOME/.gemini" ]; then
    DETECTED_AGENTS+=("Gemini CLI")
fi
if [ -d "$HOME/.gemini/antigravity" ]; then
    DETECTED_AGENTS+=("Antigravity")
fi

if [ ${#DETECTED_AGENTS[@]} -eq 0 ]; then
    print_substep "${DIM}No agents detected${NC}"
else
    print_substep "${DETECTED_AGENTS[*]}"
fi

print_line

# Install to agents
print_step "Installing..."
print_line

if [ -d "$HOME/.claude" ]; then
    CLAUDE_DIR="$HOME/.claude/skills/$SKILL_NAME"
    rm -rf "$CLAUDE_DIR"
    mkdir -p "$CLAUDE_DIR"
    cp -R "$TMP_DIR/"* "$CLAUDE_DIR/"
    INSTALLED_PATHS+=("~/.claude/skills/$SKILL_NAME")
fi

if [ -d "$HOME/.cursor" ]; then
    CURSOR_DIR="$HOME/.cursor/skills/$SKILL_NAME"
    rm -rf "$CURSOR_DIR"
    mkdir -p "$CURSOR_DIR"
    cp -R "$TMP_DIR/"* "$CURSOR_DIR/"
    INSTALLED_PATHS+=("~/.cursor/skills/$SKILL_NAME")
fi

if [ -d "$HOME/.codex" ]; then
    CODEX_DIR="$HOME/.codex/skills/$SKILL_NAME"
    rm -rf "$CODEX_DIR"
    mkdir -p "$CODEX_DIR"
    cp -R "$TMP_DIR/"* "$CODEX_DIR/"
    INSTALLED_PATHS+=("~/.codex/skills/$SKILL_NAME")
fi

if command -v opencode >/dev/null 2>&1 || [ -d "$HOME/.config/opencode" ]; then
    OPENCODE_DIR="$HOME/.config/opencode/skill/$SKILL_NAME"
    rm -rf "$OPENCODE_DIR"
    mkdir -p "$OPENCODE_DIR"
    cp -R "$TMP_DIR/"* "$OPENCODE_DIR/"
    INSTALLED_PATHS+=("~/.config/opencode/skill/$SKILL_NAME")
fi

if [ -d "$HOME/.codeium" ]; then
    WINDSURF_DIR="$HOME/.codeium/windsurf/skills/$SKILL_NAME"
    rm -rf "$WINDSURF_DIR"
    mkdir -p "$WINDSURF_DIR"
    cp -R "$TMP_DIR/"* "$WINDSURF_DIR/"
    INSTALLED_PATHS+=("~/.codeium/windsurf/skills/$SKILL_NAME")
fi

if command -v gemini >/dev/null 2>&1 || [ -d "$HOME/.gemini" ]; then
    GEMINI_DIR="$HOME/.gemini/skills/$SKILL_NAME"
    rm -rf "$GEMINI_DIR"
    mkdir -p "$GEMINI_DIR"
    cp -R "$TMP_DIR/"* "$GEMINI_DIR/"
    INSTALLED_PATHS+=("~/.gemini/skills/$SKILL_NAME")
fi

if [ -d "$HOME/.gemini/antigravity" ]; then
    ANTIGRAVITY_DIR="$HOME/.gemini/antigravity/skills/$SKILL_NAME"
    rm -rf "$ANTIGRAVITY_DIR"
    mkdir -p "$ANTIGRAVITY_DIR"
    cp -R "$TMP_DIR/"* "$ANTIGRAVITY_DIR/"
    INSTALLED_PATHS+=("~/.gemini/antigravity/skills/$SKILL_NAME")
fi

# Summary box
echo -e "◇  Installation Summary ────────────────────────────────────────────╮"
echo "│                                                                   │"

if [ ${#INSTALLED_PATHS[@]} -eq 0 ]; then
    echo "│  No agents detected. Install an agent first:                      │"
    echo "│  Claude Code, Cursor, Codex, OpenCode, Windsurf, or Gemini CLI    │"
else
    for path in "${INSTALLED_PATHS[@]}"; do
        printf "│  ${GREEN}✓${NC} %-60s │\n" "$path"
    done
fi

echo "│                                                                   │"
printf "│  Documentation: %-47s │\n" "$doc_count files extracted from Xcode"
echo "│                                                                   │"
echo "├───────────────────────────────────────────────────────────────────╯"
print_line
print_footer "Done! The skill is ready to use."
echo ""
