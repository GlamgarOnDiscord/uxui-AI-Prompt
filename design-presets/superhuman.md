# DESIGN.md — Superhuman Preset

> Deep purple glow. Monospace metadata. Keyboard-first.

## Theme
**Atmosphere:** Elite speed — built for operators who live at 200 WPM.
**Mood:** Powerful, exclusive, razor-fast.

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0c0a14` | Deep purple-black background |
| `--bg-surface` | `#15121f` | Cards |
| `--bg-elevated` | `#1e1a2b` | Hover, inputs |
| `--border-subtle` | `rgba(139,92,246,0.12)` | Purple-tinted borders |
| `--text-primary` | `#f3f0ff` | Headings |
| `--text-secondary` | `#9f95b8` | Body |
| `--text-tertiary` | `#6b6082` | Captions |
| `--accent` | `#8b5cf6` | Purple — CTAs, active |
| `--accent-glow` | `rgba(139,92,246,0.25)` | Glow behind accent elements |

## Typography
| Role | Font | Weight |
|------|------|--------|
| Display | Inter | 700 |
| Body | Inter | 400 |
| Metadata | JetBrains Mono | 400 |
| Timestamps | JetBrains Mono | 300 |

**Signature:** All metadata (dates, counts, IDs, shortcuts) in monospace. Body stays sans-serif.

## Spacing
Dense-ish. Section padding: `py-20` / `py-24`.
Container: `max-w-5xl mx-auto px-6`.
Card padding: `p-5`.

## Motion
`MOTION_INTENSITY` override: **5**. Fast and intentional.
Transitions: `150ms ease-out`. Everything snaps.
Signature: split-flap number transitions for stats, instant keyboard shortcut feedback.

## Signature Patterns
- Keyboard shortcut overlays (`⌘K`, `⌘J`) displayed prominently
- Split-flap / scramble transitions on numbers
- Purple ambient glow behind hero elements
- Email-inspired layouts (inbox, thread, compose)
- Speed metrics ("Respond 4x faster")
- Monospace timestamps and metadata throughout

## Banned
- Slow animations (nothing > 200ms)
- Mouse-dependent interactions (everything keyboard-accessible)
- Playful/bouncy motion
- Bright/saturated colors (purple glow only)
- Heavy imagery (text and data focused)
