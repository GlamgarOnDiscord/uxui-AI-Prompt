# DESIGN.md — Stripe Preset

> Bright canvas. Prismatic gradients. Söhne feel.

## Theme
**Atmosphere:** Polished trust — financial-grade clarity with moments of visual delight.
**Mood:** Premium, approachable, grown-up. The "we handle money" aesthetic.

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a2540` | Deep navy page background |
| `--bg-surface` | `#0f2d4d` | Cards |
| `--bg-elevated` | `#163a5c` | Hover, inputs |
| `--bg-light` | `#f6f9fc` | Light mode background |
| `--border-subtle` | `rgba(255,255,255,0.10)` | Dark borders |
| `--text-primary` | `#ffffff` | Headings (dark mode) |
| `--text-secondary` | `#adbdcc` | Body (dark mode) |
| `--accent` | `#635bff` | Stripe purple — CTAs |
| `--accent-secondary` | `#00d4ff` | Cyan — highlights |
| `--gradient` | `linear-gradient(135deg, #635bff, #00d4ff, #ff6b6b)` | Prismatic hero gradients |

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display | Sohne (fallback: Inter) | 600 |
| Body | Sohne (fallback: Inter) | 400 |
| Monospace | Sohne Mono (fallback: JetBrains Mono) | 400 |

Tracking: Normal. Generous line-height (`leading-relaxed`). Readable, not compressed.

## Spacing
Generous. Section padding: `py-28` / `py-36`.
Container: `max-w-7xl mx-auto px-8`.
Everything breathes.

## Motion
`MOTION_INTENSITY` override: **5**.
Smooth reveals, parallax depth. Feature showcases use scrollable card carousels with prev/next arrow controls — no passive horizontal scroll.
Signature: gradient mesh background that subtly shifts on scroll.

## Signature Patterns
- Prismatic gradient blobs as background elements (not text)
- Code terminal examples with syntax highlighting
- Two-tone sections (navy/white alternating)
- Payment UI mockups with realistic card numbers
- Generous illustration zones

## Banned
- Pure black backgrounds (always navy `#0a2540`)
- Neon accents
- Dense/compact layouts (Stripe breathes)
- Monospace for body text
