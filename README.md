# /swiftui-skills

Apple-authored SwiftUI and Apple platform guidance, packaged as skills for AI coding agents.

## What is this?

SwiftUI is opinionated. Most AI agents do not know those opinions.

`/swiftui-skills` extracts internal Apple documentation shipped inside Xcode and turns it into reusable skills that help AI agents write idiomatic, Apple-native SwiftUI code.

- Uses Apple-written guidance from inside Xcode
- Reduces hallucinated or non-idiomatic SwiftUI
- Works with Claude Code, Cursor, Codex, OpenClaw, and similar tools
- Open source and local-first

## Installation

### Using curl (Recommended)

```bash
curl -fsSL https://swiftui-skills.ameyalambat.com/install | bash
```

The installer extracts local Xcode docs and installs the skill into detected runtimes, including OpenClaw shared installs at `~/.openclaw/skills/swiftui-skills`.

### Using `npx skills`

```bash
npx skills add ameyalambat128/swiftui-skills
```

Choose the install scope in the `skills` TUI and keep `Symlink (Recommended)` selected.

#### Shared agent install

```bash
~/.agents/skills/swiftui-skills/setup.sh
```

#### Project-local agent install

```bash
./.agents/skills/swiftui-skills/setup.sh
```

### OpenClaw manual install

OpenClaw can load the same canonical skill package from any of these paths:

- `~/.agents/skills/swiftui-skills`
- `~/.openclaw/skills/swiftui-skills`
- `<workspace>/skills/swiftui-skills`

For a shared OpenClaw install:

```bash
mkdir -p ~/.openclaw/skills
cp -R src/skill ~/.openclaw/skills/swiftui-skills
~/.openclaw/skills/swiftui-skills/setup.sh
```

For a workspace-local OpenClaw install:

```bash
mkdir -p ./skills
cp -R src/skill ./skills/swiftui-skills
./skills/swiftui-skills/setup.sh
```

After setup, start a new OpenClaw session or restart the gateway.

### Requirements

- macOS
- Xcode 26 or later

### Custom paths

If Xcode is installed in a non-standard location:

```bash
# Custom Xcode location
./install.sh --xcode-path /Applications/Xcode-beta.app

# Direct path to docs folder
./install.sh --docs-path /path/to/AdditionalDocumentation
```

## How it works

1. The installer extracts Apple documentation from your local Xcode install.
2. The skill tells the agent how to use that documentation during generation and review.
3. Your agent uses the extracted docs as source of truth when writing SwiftUI code.

No Apple documentation is redistributed. Everything is extracted locally during setup.

## What "supports OpenClaw" means

This project is still a developer-focused SwiftUI skill.

OpenClaw support means:

- The canonical `SKILL.md` is compatible with OpenClaw skill loading.
- The same skill package can live in OpenClaw-visible paths like `~/.agents/skills`, `~/.openclaw/skills`, or `<workspace>/skills`.
- OpenClaw users get the same local-docs workflow after running `setup.sh`.
- OpenClaw users can verify the skill with native commands like `openclaw skills list`.

This does not add a plugin, split the package, or change the product into an OpenClaw-only tool.

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

### Claude Code and similar agents

The installer can place the skill directly into detected agent paths like `~/.claude/skills`, `~/.codex/skills`, and related runtimes.

### OpenClaw

OpenClaw already loads visible skills from these paths, in precedence order:

1. `<workspace>/skills`
2. `<workspace>/.agents/skills`
3. `~/.agents/skills`
4. `~/.openclaw/skills`

To verify the skill is visible:

```bash
openclaw skills list
```

Then start a new session and try a representative SwiftUI task:

```bash
openclaw agent --message "Build a SwiftUI settings screen with a toolbar and explain which local docs you used."
```

Expected smoke-test behavior:

- The skill is listed by OpenClaw.
- The agent references local extracted docs instead of inventing APIs.
- If `docs/` is empty, the agent tells you to run `setup.sh` before proceeding.

## Project structure

```text
swiftui-skills/
├── src/
│   ├── app/                    # Next.js website
│   ├── skill/                  # Skill package
│   │   ├── SKILL.md           # Canonical skill contract
│   │   ├── manifest.json      # Tool compatibility helpers
│   │   ├── prompts/           # System, router, reviewer, generator, refactorer
│   │   ├── docs/              # Populated by setup
│   │   └── setup.sh           # Local Xcode docs extraction
│   └── scripts/
│       ├── install.sh
│       └── uninstall.sh
└── public/
    └── install                # curl target
```

## Uninstall

```bash
bash src/scripts/uninstall.sh
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
