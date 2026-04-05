# linear

> Linear's design system — ultra-dense product UI, violet accent, tight spacing. Engineering tool aesthetic: speed over decoration.

## Theme

- Mode: dark
- Base: gray-950 / neutral ultra-dark
- Aesthetic: engineering tool, keyboard-first, zero decoration
- Inspirations: Linear, Notion, Figma sidebar

## Palette

| Element | Classes | Notes |
|---------|---------|-------|
| Background | `bg-[#0f0f10]` | Near-black, not pure |
| Surface | `bg-[#1a1a1f]` | Card / panel base |
| Surface elevated | `bg-[#212127]` | Hover states, dropdowns |
| Border | `border-[rgba(255,255,255,0.08)]` | 8% white — extremely subtle |
| Heading | `text-[#f0f0f3]` | Warm white, not pure |
| Body text | `text-[#8a8a9a]` | Muted purple-gray |
| Subtle | `text-[#5c5c6e]` | Labels, timestamps |
| Accent | `#5e6ad2` | Linear violet — CTAs, active states |
| Accent hover | `#6872de` | Slightly lighter on hover |
| Destructive | `#e5484d` | Errors, delete actions |

## Typography

| Usage | Font Type | Examples |
|-------|-----------|----------|
| Display | System geometric | Inter, -apple-system |
| Body | Readable sans | Inter, system-ui |
| Mono | Code/IDs | JetBrains Mono, Fira Code |

- Inter is the exception here — Linear uses it precisely because it reads fast at small sizes in dense UIs
- Font size default: 13-14px (tighter than typical SaaS — this is a tool, not a marketing page)
- Line height: tight (1.4–1.5) — dense information display
- No display fonts — this is a product, not a landing page

## Layout

- 4px base unit — strict
- Container: full viewport width (no max-w constraint on app shell)
- Sidebar: 240px fixed, content area fills rest
- Section padding: `p-3` / `p-4` (12-16px) — much tighter than marketing pages
- Row height in lists: 32px (8 units)
- Radius: `rounded` (4px) only — no `rounded-2xl` or large radius
- Grid: CSS Grid for panel layouts, Flexbox for inline rows

## Elevation

- Shadows: none on cards — borders only
- Border: `1px solid rgba(255,255,255,0.08)` — the primary depth signal
- Popover/dropdown: `box-shadow: 0 8px 30px rgba(0,0,0,0.5)` — only on floating elements
- No glassmorphism

## Motion

- Durations: 100ms (micro) / 150ms (normal) / 200ms (slow) — much faster than SaaS marketing
- Easings: ease-out for all UI transitions
- No spring physics — linear easing on list reorders
- Keyboard shortcuts feel instant: < 100ms response

## Dials

| Dial | Value | Rationale |
|------|-------|-----------|
| DESIGN_VARIANCE | 3 | High symmetry — grid-aligned, predictable |
| MOTION_INTENSITY | 2 | Minimal — utility tool, no distractions |
| VISUAL_DENSITY | 9 | Maximum density — this is a cockpit |

## Accessibility

- WCAG AA minimum (4.5:1 for body text)
- Keyboard navigation is primary — mouse is secondary
- Focus indicators: `ring-2 ring-[#5e6ad2]/50` — visible but not garish
- All actions reachable via keyboard shortcut
- Reduced motion: honored — animations already minimal

## Rules

### Do's
- Always use 4px spacing increments
- Prefer borders over shadows for depth
- Use monospace for IDs, issue numbers, commit hashes
- Keep font sizes at 13-14px for density
- Show keyboard shortcuts in tooltips

### Don'ts
- No `rounded-xl` or large radius — keep `rounded` (4px) maximum
- No glassmorphism or backdrop-blur on app UI
- No gradient backgrounds
- No Inter ban lifted here — it's intentional for tool density
- No decorative illustrations in app chrome
- No hover animations > 150ms

### Anti-Patterns
- Marketing-page spacing (`py-24`, `py-32`) in app UI
- Large hero typography in app context
- Centered layouts (everything is left-aligned in a tool)
- Neon/colored glows on UI elements
