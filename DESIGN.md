# DESIGN.md — uxui-AI-Prompt

> Google Stitch / DESIGN.md compatible. Drop this file into any DESIGN.md-aware tool.

## Theme

**Atmosphere:** Dark, premium, engineering-centric SaaS — the aesthetic Vercel, Linear, and Raycast ship.
**Mood:** Confident, precise, alive. Never sterile, never loud.

## Color Palette

| Token             | Hex       | OKLCH                     | Usage                |
|-------------------|-----------|---------------------------|----------------------|
| `--bg-primary`    | `#09090b` | `oklch(0.07 0.005 285)`  | Page background      |
| `--bg-surface`    | `#18181b` | `oklch(0.14 0.005 285)`  | Cards, panels        |
| `--bg-elevated`   | `#27272a` | `oklch(0.22 0.005 285)`  | Hover states, inputs |
| `--border-subtle` | `rgba(255,255,255,0.06)` | — | Default borders |
| `--border-visible`| `rgba(255,255,255,0.12)` | — | Active borders |
| `--text-primary`  | `#fafafa` | `oklch(0.98 0 0)`        | Headings             |
| `--text-secondary`| `#a1a1aa` | `oklch(0.70 0.01 285)`   | Body copy            |
| `--text-tertiary` | `#71717a` | `oklch(0.52 0.015 285)`  | Captions, labels     |
| `--accent`        | `#34d399` | `oklch(0.77 0.15 165)`   | CTAs, links, glows   |
| `--accent-muted`  | `rgba(52,211,153,0.15)` | — | Accent backgrounds |
| `--danger`        | `#f87171` | `oklch(0.70 0.17 25)`    | Errors, destructive  |
| `--warning`       | `#fbbf24` | `oklch(0.83 0.16 85)`    | Warnings             |

### Rules

- Max **1 accent color**. Saturation < 80%.
- Never mix warm and cool grays in the same project.
- Never use `#000000` — use `--bg-primary` (`#09090b`).
- Contrast: WCAG AA minimum (4.5:1 text, 3:1 large text). AAA preferred.
- 60-30-10 rule: 60% background, 30% text, 10% accent.

## Typography

| Role       | Font             | Stack Fallback           | Weight    |
|------------|------------------|--------------------------|-----------|
| Display    | Geist            | system-ui, sans-serif    | 700       |
| Headings   | Geist            | system-ui, sans-serif    | 600       |
| Body       | Geist            | system-ui, sans-serif    | 400       |
| Monospace  | Geist Mono       | ui-monospace, monospace  | 400       |

### Scale

| Level | Desktop       | Mobile        | Tracking        | Leading       |
|-------|---------------|---------------|-----------------|---------------|
| H1    | `text-6xl`    | `text-4xl`    | `tracking-tighter` | `leading-none` |
| H2    | `text-4xl`    | `text-3xl`    | `tracking-tight`   | `leading-tight` |
| H3    | `text-2xl`    | `text-xl`     | `tracking-tight`   | `leading-snug` |
| Body  | `text-base`   | `text-base`   | normal           | `leading-relaxed` |
| Small | `text-sm`     | `text-sm`     | normal           | `leading-normal` |
| Mono  | `text-sm`     | `text-xs`     | normal           | `leading-relaxed` |

### Rules

- Max reading width: `max-w-[65ch]`.
- Minimum 12px on mobile.
- Serif fonts banned on dashboards/software UIs.
- When `VISUAL_DENSITY > 7`: use `font-mono` for all numbers.

## Spacing

Base unit: **4px**.

| Context           | Value                          |
|-------------------|--------------------------------|
| Section padding   | `py-24` / `py-32`             |
| Container         | `max-w-7xl mx-auto px-6`      |
| Card padding      | `p-6` / `p-8`                 |
| Component gap     | `gap-4` / `gap-6` / `gap-8`   |
| Inline spacing    | `gap-2` / `gap-3`             |

### Radius Boomerang Rule

Parent `border-radius` = child `border-radius` + gap between them.

## Shadows & Depth

- **Cards:** Use borders (`border-white/5`), not shadows.
- **Elevated elements:** `shadow-lg` only for modals, dropdowns, tooltips.
- **Glow:** `bg-accent/20 blur-3xl` on absolute positioned pseudo-element.
- **Glass:** `backdrop-blur-sm` + `border-white/10` + `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`.

## Motion

| Context         | Duration     | Easing                                    |
|-----------------|--------------|-------------------------------------------|
| Hover states    | `200ms`      | `ease-out`                                |
| Transitions     | `300ms`      | `ease-in-out`                             |
| Scroll reveals  | `500ms`      | `ease-out`                                |
| Springs         | —            | `stiffness: 100, damping: 20`             |

### Rules

- Only animate `transform` and `opacity` — never layout-triggering properties.
- `prefers-reduced-motion: reduce` → disable all non-essential animation.
- Stagger children: `100ms` delay increments.
- Infinite loops: `2-4s` rest between cycles.

## Layout

- Mobile-first: `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3`.
- Full height: `min-h-[100dvh]` — never `h-screen`.
- Multi-column: CSS Grid — never flexbox percentage math.
- Container: `max-w-[1400px] mx-auto`.
- Hero when `DESIGN_VARIANCE > 4`: asymmetric layout (no centered H1).

## Banned Patterns

- ❌ Neon/saturated gradients (electric purple, magenta, turquoise)
- ❌ Heavy card drop shadows
- ❌ iOS 7 glossy glass
- ❌ Generic spinners (use skeleton loaders)
- ❌ `h-screen` (use `min-h-[100dvh]`)
- ❌ Flexbox calc for multi-column
- ❌ Centered hero when `DESIGN_VARIANCE > 4`
- ❌ Emojis in production UI copy
- ❌ Default shadcn without customization
- ❌ Round numbers in stats ("50%" → "47.2%")
- ❌ Random SVG lines as backgrounds
- ❌ `useState` for continuous animations (use `useMotionValue`)
