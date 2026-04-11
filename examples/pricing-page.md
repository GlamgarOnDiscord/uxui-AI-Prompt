# Example: Pricing Page

## Prompt
```
/build pricing Three-tier pricing for a developer tool called StackForge.
Plans: Free, Pro ($29/mo), Team ($99/mo).
```

## Expected Output

A dark-mode pricing page with:

### Sections (7)
1. **Header** — Sticky glass navbar with logo, nav, CTA
2. **Hero** — Left-aligned: "Pricing that scales with you" + subtitle + monthly/yearly toggle (Save 20% on yearly)
3. **Pricing Cards** — 3 cards, asymmetric: Pro card elevated (`scale-[1.02]`, accent border, "Most popular" badge). Each card: plan name, price with monospace digits, feature list with checkmarks, CTA button
4. **Feature Comparison Table** — Full matrix: feature rows × 3 plan columns. Sticky header. Checkmarks/dashes
5. **FAQ** — 6 questions in accordion, smooth expand animation: billing, cancellation, team seats, enterprise, support, upgrades
6. **Final CTA** — "Start building today" + email input + primary button + trust line ("No credit card required")
7. **Footer**

### Design Choices
- Pro card: `border-emerald-500/30` + `shadow-[0_0_40px_rgba(52,211,153,0.1)]`
- Prices: `text-5xl font-semibold tabular-nums`
- Toggle: segmented control with spring animation between states
- Feature checkmarks: accent color, X marks: `text-zinc-600`

### Interactive States
- Monthly/yearly toggle updates all prices with number scramble animation
- Accordion: only one open at a time, content revealed via `transform: scaleY()` + `opacity` transition on the inner wrapper (transform/opacity-only — no layout triggers)
- Hover on cards: subtle `translateY(-4px)` + border brightness

### Anti-Slop Checks
- ✅ No gradient backgrounds
- ✅ Prices are organic ($29, $99 — specific, not $25 or $100)
- ✅ FAQ uses real questions, not lorem ipsum
- ✅ Active states on toggle (tactile feedback)
- ✅ Asymmetric card emphasis (not identical sizes)
