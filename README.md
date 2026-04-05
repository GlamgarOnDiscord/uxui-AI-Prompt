<div align="center">

<img src="./assets/banner.jpg" alt="design-md-kit Banner" width="100%" />

# design-md-kit

**Give your AI the design system of Linear, Stripe, or Vercel in one command.**

<br />

[![Stars](https://img.shields.io/github/stars/GlamgarOnDiscord/uxui-AI-Prompt?style=for-the-badge&logo=github&logoColor=f97316&color=18181b&labelColor=27272a)](https://github.com/GlamgarOnDiscord/uxui-AI-Prompt/stargazers)
[![License](https://img.shields.io/badge/license-MIT-18181b?style=for-the-badge&logo=creativecommons&logoColor=f97316&labelColor=27272a)](./LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Skill-18181b?style=for-the-badge&logo=anthropic&logoColor=f97316&labelColor=27272a)](https://docs.anthropic.com/en/docs/claude-code)
[![Agent Skills](https://img.shields.io/badge/Agent_Skills-Standard-18181b?style=for-the-badge&logo=opslevel&logoColor=10b981&labelColor=27272a)](https://agentskills.io/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-18181b?style=for-the-badge&logo=tailwindcss&logoColor=06b6d4&labelColor=27272a)](https://tailwindcss.com)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-18181b?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=27272a)](https://nextjs.org)

<br />

[Quick Start](#quick-start) · [Commands](#commands) · [Registry](#registry) · [Skill](#skill) · [Contributing](#contributing)

</div>

---

## Quick Start

```bash
npx design-md add linear
```

That copies Linear's DESIGN.md into `./design/linear/` and generates a matching `tailwind.config.js` and `globals.css`. Your AI now has the real tokens — not guesses.

---

## How It Works

```
1. npx design-md add <brand>
   └── Fetches DESIGN.md from the registry
       └── Writes design/<brand>/DESIGN.md

2. Exporters run automatically
   └── Generates tailwind.config.js + globals.css
       with real color, spacing, and font tokens

3. Your AI agent reads DESIGN.md
   └── skill/uxui-designer adapts to the brand
       instead of inventing a new system

4. npx design-md lint ./src
   └── Validates WCAG contrast, 4px spacing grid,
       and font usage against the loaded system
```

---

## Commands

**Add a brand design system:**

```bash
npx design-md add linear
# → design/linear/DESIGN.md
# → tailwind.config.js (Linear tokens)
# → globals.css (Linear tokens)
```

**List available brands:**

```bash
npx design-md list
# linear       — Clean product UI, violet accent
# stripe       — Polished fintech, slate/indigo
# vercel       — Monochromatic B&W, minimal
# raycast      — Ultra-dark launcher, red accent
# uxui-designer — Premium SaaS dark system, emerald
```

**Bootstrap interactively:**

```bash
npx design-md init
# ? Which brand? › linear
# ? Framework? › Next.js
# → Writes DESIGN.md + config files + .clauderules hint
```

**Lint your UI code:**

```bash
npx design-md lint ./src
# ✖ Button background #1a1a2e — contrast 3.2:1 (min 4.5:1)
# ✖ Padding 6px — not on 4px grid
# ✔ Font stack matches system
```

The binary is available as both `design-md` and `dmk`.

---

## Registry

Five brand design systems, ready to load:

| Brand | Description | Tags |
|-------|-------------|------|
| `linear` | Linear's clean, fast product UI — violet accent, tight spacing | dark, product, violet |
| `stripe` | Stripe's polished fintech UI — Slate tones, indigo accent | dark, fintech, slate |
| `vercel` | Vercel's monochromatic B&W system — minimal, developer-first | dark, monochrome, minimal |
| `raycast` | Raycast's launcher aesthetic — ultra-dark, keyboard-first, red accent | dark, tool, launcher |
| `uxui-designer` | Glamgar's premium SaaS dark-first system — Zinc/Slate, Geist, emerald accent | dark, saas, zinc |

DESIGN.md files for Linear, Stripe, Vercel, and Raycast are sourced from [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md). See [ATTRIBUTION.md](./registry/ATTRIBUTION.md).

---

## Skill

The `skills/uxui-designer/SKILL.md` skill is style-agnostic. Drop it into Claude Code — it reads whatever `DESIGN.md` is present in the project and generates UI faithful to that brand.

```
Without DESIGN.md → uses uxui-designer defaults (Zinc, Geist, emerald)
With design/linear/DESIGN.md → generates Linear-style UI
With design/stripe/DESIGN.md → generates Stripe-style UI
```

Install for Claude Code:

```bash
# Personal (all projects)
cp -r skills/uxui-designer ~/.claude/skills/uxui-designer

# Project-scoped (team-shared)
mkdir -p .claude/skills && cp -r skills/uxui-designer .claude/skills/uxui-designer
```

Then ask your agent to build any UI — it reads the tokens, respects the system.

<details>
<summary><strong>Install in other tools (Cursor, Windsurf, Aider, ChatGPT, others)</strong></summary>

**Cursor · VS Code Copilot · Amp · Junie · Goose**

Copy `skills/uxui-designer/` into your tool's skill directory:

| Tool | Path |
|------|------|
| Cursor | `.cursor/skills/uxui-designer/` |
| VS Code Copilot | `.github/skills/uxui-designer/` |
| Amp | `.amp/skills/uxui-designer/` |
| Junie (JetBrains) | `.junie/skills/uxui-designer/` |
| Goose | `.goose/skills/uxui-designer/` |

Follows the open [Agent Skills](https://agentskills.io/) standard — any compatible tool auto-discovers `SKILL.md`.

**Windsurf · Aider · ChatGPT · Others**

These tools don't support skills — use the standalone prompt instead:

| Tool | How |
|------|-----|
| Windsurf | Paste `prompt.md` contents into `.windsurfrules` |
| Aider | `aider --read prompt.md` |
| ChatGPT / Other | Paste `prompt.md` as system prompt |

</details>

---

## Packages

This is a TypeScript monorepo (pnpm workspaces):

| Package | Role |
|---------|------|
| `@design-md/schema` | DesignTokens Zod types |
| `@design-md/parser` | DESIGN.md → JSON canonical tokens |
| `@design-md/exporters` | Tokens → `tailwind.config.js` + `globals.css` |
| `@design-md/validator` | WCAG contrast · 4px spacing · font linting |
| `@design-md/cli` | `design-md` / `dmk` binary |

```bash
pnpm install
pnpm build
pnpm test
```

---

## Credits

The DESIGN.md format and four of the five brand files in this registry come from **[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)** (11.9k stars). They curate 55+ design systems. design-md-kit is the execution layer that was missing: parse, export, validate, and load them into your agent with one command.

---

## Contributing

PRs, issues, and new brand contributions welcome.

```bash
fork → git checkout -b my-feature → PR
```

To add a brand: create `registry/brands/<name>/DESIGN.md`, add the entry to `registry/index.json`, and open a PR.

---

<div align="center">
<sub>design-md-kit by <a href="https://github.com/GlamgarOnDiscord">GlamgarOnDiscord</a> · MIT License</sub>
</div>
