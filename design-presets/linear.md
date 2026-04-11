# DESIGN.md — Linear Preset

> Near-black canvas. Electric indigo accent. Ultra-tight tracking.

## Theme
**Atmosphere:** Dense, fast, opinionated — software for people who ship.
**Mood:** Focused intensity. Every element earns its place.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a0a0f` | Page background |
| `--bg-surface` | `#141419` | Cards, panels |
| `--bg-elevated` | `#1e1e26` | Hover, inputs |
| `--border-subtle` | `rgba(255,255,255,0.06)` | Borders |
| `--text-primary` | `#f0f0f3` | Headings |
| `--text-secondary` | `#8b8b9e` | Body |
| `--text-tertiary` | `#5c5c72` | Captions |
| `--accent` | `#5e6ad2` | Indigo — CTAs, links, active states |
| `--accent-hover` | `#6e7bef` | Accent hover |
| `--danger` | `#e5484d` | Errors |

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display | Geist | 600 |
| Body | Geist | 400 |
| Monospace | Geist Mono | 400 |

Tracking: `tracking-[-0.02em]` on all headings. Body: `tracking-[-0.01em]`. Tighter than default everywhere.

## Spacing
Dense. Section padding: `py-16` / `py-20`.
Container: `max-w-6xl mx-auto px-6`.
Card padding: `p-4` / `p-5`. Compact.

## Motion
`MOTION_INTENSITY` override: **4**. Snappy, not playful.
Transitions: `200ms ease-out`. Micro-interactions on hover: subtle scale (`scale-[1.02]`) or background shift. No springs.

## Signature Patterns
- Keyboard shortcuts displayed prominently (`<kbd>` elements)
- Status indicators: colored dots (green/yellow/red/gray)
- Dense tables with `divide-y divide-white/5`
- Command palette aesthetic for search

## Banned
- Rounded-XL (max `rounded-md`)
- Large glow effects
- Playful/bouncy animations
- Generous whitespace (this is a dense UI)
