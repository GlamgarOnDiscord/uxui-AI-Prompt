# uxui-designer

> Glamgar's premium SaaS dark-first design system. Zinc/Slate neutrals, Geist typography, emerald accents. Inspired by Linear, Vercel, Stripe, Raycast.

## Theme

- Mode: dark (light available on request)
- Base: Zinc / Slate neutrals (never pure black)
- Aesthetic: premium SaaS dark-first, engineering-centric
- Inspirations: Linear, Vercel, Stripe, Raycast, Claude

## Palette

| Element | Classes | Notes |
|---------|---------|-------|
| Background | `bg-zinc-950` | Never pure black (`#000`) — too harsh |
| Surface | `bg-zinc-900/50` | Subtle glass effect with backdrop-blur |
| Border | `border-white/10` | Ultra-thin and subtle |
| Heading | `text-white` | High contrast |
| Body text | `text-zinc-400` | Readable but subdued |
| Muted | `text-zinc-500` | Labels, captions |
| Accent | `emerald-500` | Sparingly — glows and CTAs only |

## Typography

| Usage | Font Type | Examples |
|-------|-----------|----------|
| Display | Modern geometric | Geist, Cabinet Grotesk, Satoshi |
| Body | Clean, readable | DM Sans, Satoshi |
| Mono | Technical | Geist Mono, JetBrains Mono |

- No Inter for premium/creative UI — use Geist, Satoshi, or Cabinet Grotesk
- No Serif fonts on dashboards or software UIs
- Avoid mixing warm and cool grays in the same project

## Layout

- Mobile-first, Tailwind breakpoints (320 / 768 / 1200+)
- 4px increment spacing system
- Container: `max-w-7xl mx-auto px-6`
- Section padding: `py-24` or `py-32`
- Use CSS Grid for multi-column layouts, never flexbox `calc()`
- Use `min-h-[100dvh]` instead of `h-screen` — iOS Safari breaks the latter

## Motion

- Durations: 200ms (fast) / 300ms (normal) / 500ms (slow)
- Easings: ease-out, ease-in-out
- Spring: `stiffness: 100, damping: 20`
- Only animate `transform` and `opacity` — never width/height/top/left

## Dials

| Dial | Default | Scale |
|------|---------|-------|
| DESIGN_VARIANCE | 8 | 1 = symmetry → 10 = chaos |
| MOTION_INTENSITY | 6 | 1 = static → 10 = cinematic |
| VISUAL_DENSITY | 4 | 1 = gallery → 10 = cockpit |

## Accessibility

- WCAG AAA preferred (7:1 normal text, 4.5:1 large text)
- Visible focus states on all interactive elements
- Never black text on dark backgrounds
- Respect `prefers-reduced-motion` for autonomous animations

## Rules

### Do's
- Always use organic numbers (`47.2%`, not `50%`)
- Prefer borders over heavy drop-shadows on cards
- Use SVG for icons — never emojis in production

### Don'ts
- No "Web3" / cyberpunk / hacker aesthetic
- No saturated neon accent colors
- No large gradient backgrounds
- No centered hero sections when DESIGN_VARIANCE > 4
- Never use `h-screen` for hero sections

### Anti-Patterns
- AI Purple/Blue neon glow combos
- Three equal-width cards in a horizontal row
- `window.addEventListener('scroll')` for scroll animations
