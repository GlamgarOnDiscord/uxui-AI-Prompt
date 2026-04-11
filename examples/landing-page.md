# Example: Landing Page

## Prompt
```
/build landing AI-powered code review tool that catches bugs before your team does.
Target: engineering managers at Series A-C startups. Name: CodeLens.
```

## Expected Output

A dark-mode landing page with:

### Sections (7)
1. **Header** — Sticky glass navbar, logo left, nav center, "Start free trial" CTA right
2. **Hero** — Asymmetric split: left-aligned headline ("Ship code that works. Every time.") + subtitle + 2 CTAs + trust badges (GitHub stars, "Used by 2,847 teams"). Right side: autonomous product demo (ghost cursor reviewing a code diff)
3. **Social Proof** — Logo marquee (8-12 company logos), then 3 metric cards ("47.2% fewer bugs", "3.1x faster reviews", "12 min average review time")
4. **Features** — Bento grid (2x3 asymmetric): each card with SVG icon + title + description + autonomous animation. Cards: "AI Code Review", "Security Scanner", "Performance Audit", "CI/CD Integration", "Team Analytics", "Custom Rules"
5. **Testimonials** — 3 cards: photo + name + role + company + quote. Staggered reveal on scroll
6. **Pricing** — 3 tiers (Starter/Pro/Enterprise), Pro highlighted, feature comparison with checkmarks
7. **Footer** — 4 columns (Product, Resources, Company, Legal) + social icons + copyright 2026

### Design Choices
- Accent: emerald-500 (matches "green = go/ship")
- Font: Geist + Geist Mono (code review context)
- DESIGN_VARIANCE: 8 (asymmetric hero, bento grid)
- MOTION_INTENSITY: 6 (scroll reveals, hover effects, ghost cursor demo)
- VISUAL_DENSITY: 4 (marketing page, not dashboard)

### Anti-Slop Checks
- ✅ Hero NOT centered (split layout)
- ✅ No purple gradient
- ✅ Stats are organic (47.2%, not 50%)
- ✅ Names are specific ("Marcus Chen, VP Eng at Dataflow")
- ✅ CTAs are specific ("Start free trial", "Watch 2-min demo")
