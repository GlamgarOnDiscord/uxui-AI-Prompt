# Accessibility & WCAG Reference

## Table of Contents
- [Contrast Ratios](#contrast-ratios)
- [Focus States](#focus-states)
- [Semantic Structure](#semantic-structure)
- [Interactive Elements](#interactive-elements)
- [Images & Media](#images--media)
- [Motion & Animation](#motion--animation)
- [Keyboard Navigation](#keyboard-navigation)
- [Anti-Patterns](#anti-patterns)

---

## Contrast Ratios

### Targets

| Level | Normal Text | Large Text (≥18pt or ≥14pt bold) | UI Components & Borders |
|-------|-------------|----------------------------------|------------------------|
| WCAG AA (minimum) | 4.5:1 | 3:1 | 3:1 |
| WCAG AAA (preferred) | 7:1 | 4.5:1 | — |

**Always target AAA for body text and primary content.** AA is the floor, not the goal.

### Concrete Dark-Mode Examples

| Combination | Approximate Ratio | Pass Level |
|-------------|------------------|------------|
| `text-white` on `bg-zinc-950` (#09090b) | ~21:1 | AAA |
| `text-zinc-400` (#a1a1aa) on `bg-zinc-950` | ~7.2:1 | AAA |
| `text-zinc-500` (#71717a) on `bg-zinc-950` | ~4.6:1 | AA only |
| `text-zinc-600` (#52525b) on `bg-zinc-950` | ~3.1:1 | FAIL for normal text |
| `text-emerald-500` on `bg-zinc-950` | ~4.8:1 | AA (use for large text / CTAs only) |
| `text-zinc-400` on `bg-zinc-900/50` | ~6.1:1 | AA+ |

**Practical rules:**
- `text-zinc-600` and darker are forbidden for body content — use `text-zinc-500` as the absolute minimum for secondary labels
- Accent colors (`emerald-500`, `teal-500`) rarely pass AAA at normal text size — restrict to headings, badges, and large CTAs
- Never use colored text on a colored background without checking contrast (e.g., `text-emerald-400` on `bg-emerald-950/30` can fail)

### How to Verify

Use the browser DevTools accessibility panel or:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) for hex values
- Chrome DevTools → Inspect element → Accessibility → Computed contrast ratio
- Rule of thumb: if you can read it comfortably in a bright room at arm's length, it's likely passing AA

---

## Focus States

### Requirements

Every interactive element (`<a>`, `<button>`, `<input>`, `<select>`, `<textarea>`, `[role="button"]`, `[tabindex]`) must have a **visible, high-contrast focus indicator** that does not rely solely on color change.

### Implementation Patterns

**Recommended focus ring (dark mode):**
```css
/* Tailwind utility */
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
```

**For accent-colored elements (buttons, links):**
```css
focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
```

**For cards or containers acting as interactive elements:**
```css
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60
```

### Rules

- Use `focus-visible:` (not `focus:`) — this avoids showing the ring on mouse click while preserving it for keyboard users
- Never use `outline: none` without providing an equivalent visual focus indicator
- Focus rings must pass 3:1 contrast against adjacent background — a white ring on `bg-zinc-950` passes at ~21:1
- Focus ring must be at least 2px wide; prefer `ring-2` (2px) or `outline-2`
- Never convey focus state through color alone (e.g., just turning text from gray to white is insufficient — add a ring or underline)

---

## Semantic Structure

### Document Landmarks

Every page must use ARIA landmarks via semantic HTML5 elements:

```html
<header>   <!-- site header, logo, nav -->
<nav>      <!-- primary navigation -->
<main>     <!-- unique per-page content -->
<section>  <!-- thematic sections (add aria-label or aria-labelledby) -->
<article>  <!-- self-contained content (blog posts, cards) -->
<aside>    <!-- supplementary content -->
<footer>   <!-- site footer -->
```

- Never nest `<main>` inside `<section>` or duplicate `<main>` on the same page
- Every `<section>` without a visible heading should have `aria-label="Section purpose"` for screen reader users
- `<nav>` elements must be labeled when there are multiple: `<nav aria-label="Primary">` / `<nav aria-label="Footer">`

### Heading Hierarchy

- One `<h1>` per page — the primary subject of the page
- Do not skip heading levels: `h1 → h2 → h3` (never `h1 → h3`)
- Headings convey structure, not style — if you need a visually large label that is not a section title, use a styled `<p>` or `<span>` with `aria-hidden`

---

## Interactive Elements

### Buttons vs Links

| Element | Use when |
|---------|----------|
| `<button>` | Triggers an action (submit, open modal, toggle, toggle theme) |
| `<a href>` | Navigates to a new location (URL or anchor) |

- Never use `<div>` or `<span>` as interactive elements without `role="button"` + `tabindex="0"` + keyboard handlers
- Never use `<a>` without a valid `href` — it becomes non-keyboard-accessible

### Labels & Descriptions

- Every form input must have an associated `<label>` — either wrapping it or linked via `htmlFor`/`id`
- Buttons with only an icon must have `aria-label="Descriptive action"` or a visually hidden `<span>`
- Links must describe their destination: "View pricing" not "Click here"
- For icon-only links: `<a href="/settings" aria-label="Open settings"><SettingsIcon aria-hidden="true" /></a>`

### Error Handling

```jsx
// Input with error state — accessible pattern
<div>
  <label htmlFor="email">Email address</label>
  <input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid={hasError}
  />
  {hasError && (
    <p id="email-error" role="alert" className="text-red-400 text-sm mt-1">
      Please enter a valid email address.
    </p>
  )}
</div>
```

- Use `role="alert"` for dynamic error messages so screen readers announce them immediately
- Use `aria-invalid="true"` on inputs in error state
- Never convey errors through color alone — pair color with an icon and text

---

## Images & Media

### Alt Text Strategy

| Image type | `alt` value | `aria-hidden` |
|-----------|-------------|--------------|
| Informative image (conveys content) | Concise description of the content | — |
| Decorative image (pure aesthetics) | `""` (empty string) | `true` |
| Icon inside labeled button | `""` | `true` |
| Logo | `"[Company name] logo"` | — |
| Avatar | `"[Name], [Title] at [Company]"` | — |
| Chart/graph | Brief data summary | — (use `<figcaption>` for full table) |

- Empty `alt=""` is intentional — it tells screen readers to skip the image entirely
- Omitting `alt` entirely is an error — the screen reader reads the full `src` URL instead
- Background images set via CSS (`background-image`) are invisible to assistive technology — no action needed
- Complex data visualizations should have a text alternative: a visible summary or a linked data table

### Decorative SVGs

```jsx
// Decorative SVG — always silence it
<svg aria-hidden="true" focusable="false" ...>

// Meaningful icon standalone
<svg role="img" aria-label="Warning" ...>
  <title>Warning</title>
</svg>
```

---

## Motion & Animation

### `prefers-reduced-motion`

All autonomous, perpetual, or attention-grabbing animations **must** be disabled or replaced when the user has enabled reduced motion. This affects users with vestibular disorders, epilepsy, and motion sensitivity.

**Tailwind CSS:**
```css
/* Disable perpetual animations */
@media (prefers-reduced-motion: reduce) {
  .animate-spin, .animate-ping, .animate-bounce, .animate-pulse {
    animation: none;
  }
}

/* Tailwind modifier */
motion-reduce:animate-none
motion-reduce:transition-none
```

**Framer Motion:**
```jsx
import { useReducedMotion } from "framer-motion";

function AnimatedCard({ children }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Rule:** All autonomous demo animations (ghost cursor, typewriter, data dashboards) must be wrapped in `@media (prefers-reduced-motion: no-preference)` — see [motion-patterns.md](motion-patterns.md) § Autonomous Animation Rules.

### Safe vs Unsafe Animations

| Safe (keep regardless of preference) | Unsafe (disable on `reduce`) |
|--------------------------------------|------------------------------|
| Opacity fade on hover | Infinite spinning / pulsing |
| Short transitions on user interaction (<300ms) | Auto-playing carousel |
| Subtle translateY on card hover | Ghost cursor / autonomous demo |
| Page load fade-in (one-time) | Parallax scrolling |

---

## Keyboard Navigation

### Tab Order

- Tab order must follow visual reading order (left-to-right, top-to-bottom)
- Never use `tabindex > 0` — it overrides natural tab order and creates disorienting jumps
- `tabindex="0"` is acceptable to make a custom element keyboard-focusable
- `tabindex="-1"` removes an element from tab order (useful for modal trap management)

### Modal & Dialog Focus Trap

When a modal opens:
1. Move focus to the first interactive element inside the modal (`useEffect` + `ref.current.focus()`)
2. Trap Tab/Shift+Tab within the modal — focus must not escape to the background
3. On close: return focus to the trigger element that opened the modal

```jsx
// Minimal focus trap pattern
useEffect(() => {
  if (isOpen) {
    firstFocusableRef.current?.focus();
  } else {
    triggerRef.current?.focus();
  }
}, [isOpen]);
```

### Escape Key

Every modal, dropdown, popover, and drawer must close on `Escape`. Bind at the document level:

```jsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}, [onClose]);
```

---

## Anti-Patterns

### Contrast Anti-Patterns
- `text-zinc-600` on `bg-zinc-950` — fails WCAG AA for normal text (3.1:1)
- Emerald/teal accent text at normal size on dark backgrounds — borderline AA only
- White text on a light image without a dark overlay — unpredictable contrast

### Focus Anti-Patterns
- `outline: none` / `outline: 0` without a replacement indicator — invisible focus, WCAG 2.4.7 violation
- Relying on `box-shadow` alone for focus — invisible when High Contrast Mode is active
- Using `:focus` instead of `:focus-visible` — shows ring on mouse click, trains users to ignore it

### Structure Anti-Patterns
- Clickable `<div>` without `role`, `tabindex`, and keyboard handlers
- Links that say "Read more" without `aria-label` specifying what
- Icon buttons without `aria-label` — a screen reader reads nothing or the SVG title

### Motion Anti-Patterns
- Infinite spinning loader visible for more than 3 seconds without a time-out message
- Parallax backgrounds without a reduced-motion fallback
- Autoplay video without controls — fails WCAG 1.4.2

### Form Anti-Patterns
- Placeholder text as the only label — it disappears on input, breaking recall for users with cognitive disabilities
- Error state indicated only by a red border — color-blind users cannot perceive it
- Required fields marked only with a red asterisk with no explanation in the form

---

## Quick Checklist

Before outputting any interactive component:

- [ ] All text passes WCAG AA (4.5:1) — AAA (7:1) preferred for body
- [ ] Every `<input>`, `<button>`, `<a>` has a visible `focus-visible` ring
- [ ] All images have `alt` text (empty string for decorative)
- [ ] All decorative SVGs have `aria-hidden="true"` and `focusable="false"`
- [ ] Icon-only buttons have `aria-label`
- [ ] All links describe their destination
- [ ] Semantic HTML5 landmarks used throughout
- [ ] One `<h1>` per page, no skipped heading levels
- [ ] Autonomous animations wrapped in `prefers-reduced-motion` guard
- [ ] Modal opens with focus trap; closes to trigger element on `Escape`
- [ ] `role="alert"` on dynamically injected error messages
- [ ] No `tabindex > 0` used anywhere
