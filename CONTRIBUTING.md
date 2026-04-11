# Contributing to uxui-AI-Prompt

Thanks for wanting to improve this skill! Here's how.

## Quick Start

1. Fork the repo
2. Create a branch (`git checkout -b feat/my-preset`)
3. Make your changes
4. Test with Claude Code / Cursor / your preferred agent
5. Submit a PR

## What We Welcome

### Brand Presets
New presets go in `design-presets/community/`. Follow the existing preset format:
- Theme atmosphere and mood
- Complete color palette with hex values
- Typography (font, weight, role)
- Spacing overrides
- Motion intensity override
- Signature patterns
- Banned patterns

**Acceptance criteria:**
- [ ] Real brand inspiration (link it)
- [ ] Complete color palette (no missing tokens)
- [ ] Tested with `/variant <name>` — output looks intentionally different from default

### Bug Reports
Found generated output that violates our own rules? Open an issue with:
- The command you used
- The output (or screenshot)
- Which rule it violated

### Before/After Screenshots
Built something with the skill? Share it! Open a PR adding to `examples/` or just drop screenshots in an issue.

## What We Don't Want (Yet)

- New slash commands (we're intentionally staying at 8)
- New sub-skills (ceiling is 3)
- Major structural changes without discussion first

## Code Style

- Markdown files: 80-char soft wrap, ATX headings (`#`), fenced code blocks
- Preset files: follow the existing template exactly
- References: tables over paragraphs when listing rules

## Testing

Before submitting, verify:
1. Your preset/change works in at least one agent (Claude Code, Cursor, or Codex)
2. Output respects WCAG AA contrast minimums
3. No broken internal links in markdown

## License

By contributing, you agree that your contributions will be licensed under MIT.
