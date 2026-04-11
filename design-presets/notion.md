# DESIGN.md — Notion Preset

> Warm off-white. Serif display + sans body. Editorial spacing.

## Theme
**Atmosphere:** Digital paper — warm, readable, document-native.
**Mood:** Calm, inviting, familiar. The "tool that feels like home" aesthetic.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#fdfdfc` | Page background — near-white, not pure white |
| `--bg-surface` | `#f7f6f3` | Warm off-white panels |
| `--bg-elevated` | `#eeedea` | Hover, sidebars |
| `--border-subtle` | `rgba(0,0,0,0.06)` | Borders |
| `--text-primary` | `#191919` | Headings |
| `--text-secondary` | `#5f5e5b` | Body |
| `--text-tertiary` | `#9b9a97` | Captions |
| `--accent` | `#2383e2` | Blue — links, CTAs |
| `--accent-muted` | `rgba(35,131,226,0.1)` | Accent backgrounds |

**Note:** This is a LIGHT MODE preset. Dark mode override: `--bg-primary: #191919`, `--bg-surface: #202020`, `--text-primary: #e0e0e0`.

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display | Noto Serif (or Lyon Display) | 700 |
| Headings | Noto Serif | 600 |
| Body | Inter | 400 |
| Monospace | iA Writer Mono (fallback: JetBrains Mono) | 400 |

**Signature:** Serif headings + sans body. The editorial mix.

## Spacing
Very generous. Section padding: `py-32` / `py-40`.
Container: `max-w-3xl mx-auto px-6` (narrow, document-width).
Line height: `leading-[1.8]` for body. Maximum readability.

## Motion
`MOTION_INTENSITY` override: **2**. Almost static.
Transitions: `200ms ease`. Hover: subtle background change only.
No springs, no bounces, no scroll animations. Content is king.

## Signature Patterns
- Page/document-centric layouts (like a wiki or document)
- Breadcrumb navigation
- Toggle blocks / collapsible sections
- Inline databases / simple tables
- Cover images spanning full width
- Icon + text page titles
- Callout blocks with emoji icons (exception to emoji rule — Notion uses them structurally)

## Banned
- Dark backgrounds (unless explicitly dark mode)
- Glow effects
- Gradient backgrounds
- Dense/cockpit layouts
- Monospace for body text
- Aggressive animations
