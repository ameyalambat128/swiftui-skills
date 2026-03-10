# /swiftui-skills

Apple-authored SwiftUI and Apple platform guidance, packaged as skills for AI coding agents.

## What is this?

SwiftUI is opinionated. Most AI agents don't know those opinions.

/swiftui-skills extracts internal Apple documentation shipped inside Xcode and turns it into reusable skills that help AI agents write idiomatic, Apple-native SwiftUI code.

- Uses Apple-written guidance from inside Xcode
- Reduces hallucinated or non-idiomatic SwiftUI
- Works with Claude Code, Cursor, and similar tools
- Open source and local-first

## Installation

### Using curl (Recommended)

```bash
curl -fsSL https://swiftui-skills.ameyalambat.com/install | bash
```

### Advanced: Using npx skills

```bash
npx skills add ameyalambat128/swiftui-skills
```

Choose the install scope in the `skills` TUI, and keep `Symlink (Recommended)` selected.

#### Global install

```bash
~/.agents/skills/swiftui-skills/setup.sh
```

#### Project-local install

```bash
./.agents/skills/swiftui-skills/setup.sh
```

The first command installs the skill. The setup command extracts Apple documentation from your local Xcode installation.
Agent-specific placement like Claude Code is handled by the `skills` CLI, so no extra Claude-specific step is needed in the interactive flow.

### Requirements

- macOS
- Xcode 26 or later (the documentation lives inside Xcode)

### Custom paths

If Xcode is installed in a non-standard location:

```bash
# Custom Xcode location
./install.sh --xcode-path /Applications/Xcode-beta.app

# Direct path to docs folder
./install.sh --docs-path /path/to/AdditionalDocumentation
```

## How it works

1. The installer extracts Apple documentation from your local Xcode install
2. Skills define how agents should use that documentation
3. Your AI agent uses the docs as source of truth when writing code

No Apple documentation is redistributed. Everything is extracted locally on install.

## What's included

Documentation extracted from Xcode covers:

- SwiftUI patterns and composition
- App Intents and system integrations
- AlarmKit integration
- StoreKit updates
- WebKit + SwiftUI integration
- SwiftData inheritance
- Swift Concurrency updates
- Liquid Glass design (SwiftUI, UIKit, AppKit, WidgetKit)
- Widgets for visionOS
- Low-level Swift performance primitives (InlineArray, Span)

## Usage

### Claude Code

The custom installer automatically links the skill to `~/.claude/skills/` when Claude Code is detected. The skill is available immediately.

### Cursor

Add the skill path to your Cursor configuration:

```
~/.swiftui-skills/
```

## Project structure

```
swiftui-skills/
├── src/
│   ├── app/                    # Next.js website
│   ├── skill/                  # Skill package
│   │   ├── skill.md            # Agent contract
│   │   ├── manifest.json       # Tool compatibility
│   │   ├── prompts/            # System, router, reviewer, generator, refactorer
│   │   └── docs/               # Populated by installer
│   └── scripts/
│       ├── install.sh
│       └── uninstall.sh
└── public/
    └── install                 # curl target
```

## Uninstall

```bash
~/.swiftui-skills/scripts/uninstall.sh
```

## Who this is for

- iOS developers refactoring into SwiftUI
- Developers using AI to write SwiftUI-heavy apps
- People working with App Intents, StoreKit, Widgets, or visionOS
- Anyone tired of fighting non-idiomatic AI-generated SwiftUI

## License

MIT

## Author

Built by [Ameya Lambat](https://ameyalambat.com). Not affiliated with Apple.
