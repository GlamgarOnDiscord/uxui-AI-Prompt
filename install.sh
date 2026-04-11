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

TARGETS=()

# Detect local project .claude (priority over global)
if [ -d ".claude" ]; then
  TARGETS+=(".claude/skills/uxui-designer")
  echo -e "${GREEN}✓${NC} Detected local Claude Code project → .claude/skills/uxui-designer"
# Fallback to global ~/.claude
elif [ -d "$HOME/.claude" ]; then
  TARGETS+=("${HOME}/.claude/skills/uxui-designer")
  echo -e "${GREEN}✓${NC} Detected global Claude Code → ${HOME}/.claude/skills/uxui-designer"
fi

# Detect Cursor
if [ -d ".cursor" ]; then
  TARGETS+=(".cursor/skills/uxui-designer")
  echo -e "${GREEN}✓${NC} Detected Cursor → .cursor/skills/uxui-designer"
fi

# Detect Codex
if [ -d ".codex" ]; then
  TARGETS+=(".codex/skills/uxui-designer")
  echo -e "${GREEN}✓${NC} Detected Codex → .codex/skills/uxui-designer"
fi

# Detect OpenCode
if [ -d ".opencode" ]; then
  TARGETS+=(".opencode/skills/uxui-designer")
  echo -e "${GREEN}✓${NC} Detected OpenCode → .opencode/skills/uxui-designer"
fi

if [ "${#TARGETS[@]}" -eq 0 ]; then
  echo -e "${YELLOW}No agent directory detected (.claude, .cursor, .codex, .opencode)${NC}"
  echo "Creating ${HOME}/.claude/skills/uxui-designer/ by default..."
  TARGETS+=("${HOME}/.claude/skills/uxui-designer")
fi

echo ""
echo "Downloading skill files..."

# Pre-fetch files once, install to all detected targets
TMPDIR_SKILL=$(mktemp -d)
curl -fsSL "$RAW/skills/uxui-designer/SKILL.md" -o "$TMPDIR_SKILL/SKILL.md"
echo -e "  ${GREEN}✓${NC} SKILL.md"

mkdir -p "$TMPDIR_SKILL/references"
for ref in design-system.md motion-patterns.md copywriting.md page-structure.md dashboard.md image-generator.md slash-commands.md ux-audit.md; do
  curl -fsSL "$RAW/skills/uxui-designer/references/$ref" -o "$TMPDIR_SKILL/references/$ref"
  echo -e "  ${GREEN}✓${NC} references/$ref"
done

# Copy to each target
for TARGET in "${TARGETS[@]}"; do
  mkdir -p "$TARGET/references"
  cp "$TMPDIR_SKILL/SKILL.md" "$TARGET/SKILL.md"
  cp "$TMPDIR_SKILL/references/"* "$TARGET/references/"
done
rm -rf "$TMPDIR_SKILL"

# DESIGN.md to project root
if [ ! -f "DESIGN.md" ]; then
  curl -fsSL "$RAW/DESIGN.md" -o "DESIGN.md"
  echo -e "  ${GREEN}✓${NC} DESIGN.md (project root)"
fi

# Design presets — install relative to first target's agent config root
AGENT_ROOT=$(dirname "$(dirname "${TARGETS[0]}")")
PRESET_DIR="${AGENT_ROOT}/design-presets"
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
