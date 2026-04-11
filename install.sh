#!/usr/bin/env bash
# uxui-AI-Prompt installer
# Usage: curl -fsSL https://raw.githubusercontent.com/GlamgarOnDiscord/uxui-AI-Prompt/main/install.sh | bash
set -euo pipefail

REPO="GlamgarOnDiscord/uxui-AI-Prompt"
BRANCH="main"
RAW="https://raw.githubusercontent.com/$REPO/$BRANCH"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}╔══════════════════════════════════════╗${NC}"
echo -e "${CYAN}║   uxui-AI-Prompt — Premium UI Skill  ║${NC}"
echo -e "${CYAN}╚══════════════════════════════════════╝${NC}"
echo ""

INSTALLED=0

# Detect and install to Claude Code
if [ -d "$HOME/.claude" ] || [ -d ".claude" ]; then
  TARGET="${HOME}/.claude/skills/uxui-designer"
  mkdir -p "$TARGET/references"
  echo -e "${GREEN}✓${NC} Detected Claude Code → installing to $TARGET"
  INSTALLED=1
fi

# Detect Cursor
if [ -d ".cursor" ]; then
  TARGET=".cursor/skills/uxui-designer"
  mkdir -p "$TARGET/references"
  echo -e "${GREEN}✓${NC} Detected Cursor → installing to $TARGET"
  INSTALLED=1
fi

# Detect Codex
if [ -d ".codex" ]; then
  TARGET=".codex/skills/uxui-designer"
  mkdir -p "$TARGET/references"
  echo -e "${GREEN}✓${NC} Detected Codex → installing to $TARGET"
  INSTALLED=1
fi

# Detect OpenCode
if [ -d ".opencode" ]; then
  TARGET=".opencode/skills/uxui-designer"
  mkdir -p "$TARGET/references"
  echo -e "${GREEN}✓${NC} Detected OpenCode → installing to $TARGET"
  INSTALLED=1
fi

if [ "$INSTALLED" -eq 0 ]; then
  echo -e "${YELLOW}No agent directory detected (.claude, .cursor, .codex, .opencode)${NC}"
  echo "Creating .claude/skills/uxui-designer/ by default..."
  TARGET="${HOME}/.claude/skills/uxui-designer"
  mkdir -p "$TARGET/references"
fi

echo ""
echo "Downloading skill files..."

# Core SKILL.md
curl -fsSL "$RAW/skills/uxui-designer/SKILL.md" -o "$TARGET/SKILL.md"
echo -e "  ${GREEN}✓${NC} SKILL.md"

# References
for ref in design-system.md motion-patterns.md copywriting.md page-structure.md dashboard.md image-generator.md slash-commands.md ux-audit.md; do
  curl -fsSL "$RAW/skills/uxui-designer/references/$ref" -o "$TARGET/references/$ref"
  echo -e "  ${GREEN}✓${NC} references/$ref"
done

# DESIGN.md to project root
if [ ! -f "DESIGN.md" ]; then
  curl -fsSL "$RAW/DESIGN.md" -o "DESIGN.md"
  echo -e "  ${GREEN}✓${NC} DESIGN.md (project root)"
fi

# Design presets
PRESET_DIR="$TARGET/../../design-presets"
mkdir -p "$PRESET_DIR"
for preset in vercel.md linear.md stripe.md raycast.md superhuman.md notion.md vs-code.md; do
  curl -fsSL "$RAW/design-presets/$preset" -o "$PRESET_DIR/$preset"
  echo -e "  ${GREEN}✓${NC} design-presets/$preset"
done

echo ""
echo -e "${GREEN}══════════════════════════════════════${NC}"
echo -e "${GREEN}  Installed successfully!${NC}"
echo -e "${GREEN}══════════════════════════════════════${NC}"
echo ""
echo "Try these commands in your AI agent:"
echo -e "  ${CYAN}/build landing${NC}    — Generate a landing page"
echo -e "  ${CYAN}/audit${NC}            — Run a WCAG + anti-slop audit"
echo -e "  ${CYAN}/variant linear${NC}   — Switch to Linear's aesthetic"
echo ""
echo -e "Star the repo: ${CYAN}https://github.com/$REPO${NC}"
