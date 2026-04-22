# DESIGN.md — Vercel Preset

> Black/white precision. Geist. Zero accent color.

## Theme
**Atmosphere:** Monochrome precision — every pixel intentional, nothing decorative.
**Mood:** Surgical, confident, developer-native.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#09090b` | Page background |
| `--bg-surface` | `#111111` | Cards, panels |
| `--bg-elevated` | `#1a1a1a` | Hover states |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Borders |
| `--text-primary` | `#ededed` | Headings |
| `--text-secondary` | `#888888` | Body |
| `--text-tertiary` | `#666666` | Captions |
| `--accent` | `#ffffff` | CTAs (white on black) |
| `--danger` | `#ee4444` | Errors |

**Rule:** No color accents. White is the only "accent". Hierarchy through weight and size only.

## Typography

| Role | Font | Weight |
|------|------|--------|
| All text | Geist | 400–700 |
| Monospace | Geist Mono | 400 |

Tracking: `tracking-tight` on headings, normal on body. No serif. No decorative fonts.

## Spacing
Section padding: `py-20` / `py-24`. Tight. No waste.
Container: `max-w-5xl mx-auto px-4`.

## Motion
Minimal. `MOTION_INTENSITY` override: **3**.
Transitions: `150ms ease`. No springs, no bounces. Opacity + transform only.
Hover: `opacity-80` or subtle border change. Nothing playful.

## Banned
- Any color accent (blue, green, purple…)
- Gradients
- Glow effects
- Rounded-XL (max `rounded-lg`)
- Playful animations
