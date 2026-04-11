# DESIGN.md — Raycast Preset

> Dark chrome. Multi-hue vibrant gradients. Rounded-XL.

## Theme
**Atmosphere:** Productivity tool for power users — fast, colorful, playful-yet-precise.
**Mood:** Energetic, friendly, developer-delightful.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#111113` | Page background |
| `--bg-surface` | `#191a1c` | Cards, panels |
| `--bg-elevated` | `#232426` | Hover, inputs |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Borders |
| `--text-primary` | `#eeeeee` | Headings |
| `--text-secondary` | `#929292` | Body |
| `--accent-red` | `#ff6363` | Red accent |
| `--accent-orange` | `#ff9f43` | Orange accent |
| `--accent-yellow` | `#f7d47a` | Yellow accent |
| `--accent-green` | `#56d364` | Green accent |
| `--accent-blue` | `#58a6ff` | Blue accent |
| `--accent-purple` | `#bc8cff` | Purple accent |

**Rule:** Multi-hue gradients are the signature. Use 2-3 accent colors per gradient. Each section can have its own gradient personality.

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display | Inter | 700 |
| Body | Inter | 400 |
| Monospace | JetBrains Mono | 400 |

Tracking: `tracking-tight` on display. Standard elsewhere.

## Spacing
Section padding: `py-24` / `py-32`. Standard.
Container: `max-w-6xl mx-auto px-6`.

## Radius
`rounded-2xl` / `rounded-3xl` everywhere. Raycast's signature is generous rounding.

## Motion
`MOTION_INTENSITY` override: **7**. Playful springs.
Spring: `stiffness: 120, damping: 14`. Bouncier than default.
Hover: `scale-[1.03]` with spring. Active: `scale-[0.97]`.
Signature: command palette opening animation with spring overshoot.

## Signature Patterns
- Multi-hue gradient backgrounds on cards
- Command palette / search bar as hero element
- Icon grids with colorful app icons
- Keyboard shortcut badges
- Extension/plugin marketplace aesthetic

## Banned
- Sharp corners (always rounded)
- Monochrome only (must have color)
- Dense table-heavy layouts
- Serious/corporate tone
