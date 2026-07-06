# Contributing to /swiftui-skills

Thank you for your interest in contributing to /swiftui-skills! This project helps AI agents write better SwiftUI code by using Apple-authored documentation.

## How to Contribute

### Reporting Issues

- Check if the issue already exists before opening a new one
- Use a clear and descriptive title
- Include steps to reproduce the issue
- Mention your Xcode version and OS

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Test the installer locally
5. Commit with clear messages
6. Push to your fork and open a PR

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/swiftui-skills.git
cd swiftui-skills

# Install dependencies (for the landing page)
bun install

# Check formatting and buildability
bun run format
bun run check

# Test the installer locally
bash src/scripts/install.sh
```

### Project Structure

```
swiftui-skills/
├── .claude-plugin/    # Claude Code plugin manifest
├── .codex-plugin/     # Codex plugin manifest
├── .cursor-plugin/    # Cursor plugin manifest
├── skills/
│   └── swiftui-skills # Canonical shared skill payload
├── src/
│   ├── app/           # Next.js landing page
│   ├── scripts/       # Install/uninstall scripts
├── public/
│   └── install        # Web-served installer
└── ...
```

### Guidelines

- Keep changes focused and atomic
- Follow existing code style
- Run `bun run format` and `bun run check` before submitting
- Test the installer on your machine before submitting
- Do not commit any Apple documentation (it's extracted locally)

### Types of Contributions

- **Bug fixes**: Fix issues with the installer or landing page
- **Documentation**: Improve README, comments, or this guide
- **Skill improvements**: Enhance prompts for better AI guidance
- **New tool support**: Add support for additional AI agents

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## Questions?

Open an issue or reach out on [GitHub Discussions](https://github.com/ameyalambat128/swiftui-skills/discussions).
