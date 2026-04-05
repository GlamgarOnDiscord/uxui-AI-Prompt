# design-md-kit

**Give your AI the design system of Linear in one command.**

Stop watching your agent invent a new color palette on every build.
`design-md-kit` loads a real brand's tokens into your project — and keeps your AI aligned to them.

[Get started — `npx design-md init`](#) · [View on GitHub](https://github.com/GlamgarOnDiscord/uxui-AI-Prompt)

---

## The Problem

- Your AI invents a new design system on every request. Each build drifts further from the last.
- You paste design guidelines into chat manually. They're forgotten by the next session.
- Your code has no source of truth. The AI guesses spacing, fonts, and colors from context.

## The Solution

- `npx design-md add linear` writes Linear's real DESIGN.md and tokens into your project once.
- Your agent reads `DESIGN.md` automatically. The system persists across sessions.
- `npx design-md lint ./src` catches drift before it ships — contrast, spacing, fonts.

---

## Demo

```bash
# Bootstrap a new project with Linear's design system
npx design-md init
# ? Which brand? › linear
# ? Framework? › Next.js
# ✔ Wrote design/linear/DESIGN.md
# ✔ Wrote tailwind.config.js
# ✔ Wrote globals.css

# Or add directly
npx design-md add stripe
# ✔ Wrote design/stripe/DESIGN.md
# ✔ Wrote tailwind.config.js
# ✔ Wrote globals.css

# Lint your UI against the loaded system
npx design-md lint ./src
# ✖ src/components/Button.tsx:14 — contrast 3.2:1 (min 4.5:1)
# ✖ src/components/Card.tsx:8  — padding 6px not on 4px grid
# ✔ Font stack matches stripe system
# 2 violations found

# List available brands
npx design-md list
# linear        Clean product UI, violet accent
# stripe        Polished fintech, slate/indigo
# vercel        Monochromatic B&W, minimal
# raycast       Ultra-dark launcher, red accent
# uxui-designer Premium SaaS dark system, emerald
```

---

## Brands

Five production design systems, ready to load:

**linear**
Linear's clean, fast product UI. Violet accent, tight spacing, dense information hierarchy.
`dark` `product` `violet` `dense`

**stripe**
Stripe's polished fintech system. Slate tones, indigo accent, high data density.
`dark` `fintech` `slate` `indigo`

**vercel**
Vercel's monochromatic black-and-white system. Minimal, developer-first, no decoration.
`dark` `monochrome` `minimal` `developer`

**raycast**
Raycast's launcher aesthetic. Ultra-dark background, keyboard-first layout, red accent.
`dark` `tool` `launcher` `red`

**uxui-designer**
Glamgar's premium SaaS dark-first system. Zinc/Slate palette, Geist typography, emerald accent.
`dark` `saas` `zinc` `geist` `premium`

---

## The Skill

`skills/uxui-designer/SKILL.md` is a style-agnostic Claude Code skill. It reads the `DESIGN.md` present in the project and generates UI faithful to that brand — not a generic AI aesthetic.

```
Without DESIGN.md      → uses uxui-designer defaults
With design/linear/    → generates Linear-style components
With design/stripe/    → generates Stripe-style components
```

Works with: **Claude Code** · **Cursor** · **Amp** · **Junie** · **Goose** (Agent Skills standard)

Standalone prompt available for: **Windsurf** · **Aider** · **ChatGPT**

---

## Credits

The DESIGN.md format and four of the five brand registries come from **[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)** — the canonical source for brand design systems in Markdown (11.9k stars, 55+ systems curated).

design-md-kit is the execution layer built on top: parse those files, export real Tailwind tokens, validate code against them, and give your AI a stable system to work from.

---

## Get Started

```bash
npx design-md init
```

Pick a brand. Get the tokens. Ship consistent UI.
