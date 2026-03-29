# Page Structure Reference

## Table des matières
- [Mandatory Sections (Minimum 5)](#mandatory-sections-minimum-5)
- [Global Layout Specs](#global-layout-specs)

---

## Mandatory Sections (Minimum 5)

### 1. Header/Navigation
- Desktop: Visible nav + primary CTA
- Mobile: Hamburger menu or single clear CTA button
- Sticky with glass effect on scroll
- Transition when changing to glass effect
- Always check and add the script for opening the hamburger menu — a non-functional mobile menu is the #1 missed detail in AI-generated pages

### 2. Hero Section
- XXL responsive title
- Badge above title (stat, insight, product label)
- Subtitle with clear, concrete benefit
- 2 CTAs (primary + secondary) well differentiated
- Social proof: avatars, logos, stats
- Subtle background (geometric shapes, discrete patterns, NO big gradients or glows)
- Scroll invitation indicator (arrow, line, label)
- Custom SVG illustration (NOT a mockup or preview) OR WebGL background or ASCII
- Handwritten text annotation and arrow pointing to the CTA
- **Asymmetric layout** — no centered text blocks (see `design-system.md` § Layout rules)

### 3. Social Proof Section
- Client testimonials with ratings
- Company logos (marquee or grid)
- Concrete statistics — use organic numbers, not round ones (`47.2%`, not `50%`)
- Use cases

### 4. Features/Solution Section
- Bento grid or creative layout
- Icon + title + description for each feature
- SVG illustrations for each card (consistent style across all cards)
- Hover animations on cards

### 5. Pricing Section (if applicable)
- Clear plan comparison
- Popular plan highlighted
- Feature lists with checkmarks
- CTA for each plan

### 6. FAQ Section
- Accordion with smooth animations
- Clear questions and answers

### 7. Final CTA Section
- Compelling headline
- Clear value proposition
- Primary action button
- Trust elements

### 8. Footer
- Logo and tagline
- Link columns (Product, Resources, Company)
- Social media icons
- Legal links
- Copyright

---

## Global Layout Specs

- Mobile-first with Tailwind breakpoints (320px, 768px, 1200px+)
- Semantic HTML5: `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- 4px increment spacing system
- Section padding: `py-24` / `py-32`
- Container: `max-w-7xl mx-auto px-6`
- No horizontal scroll, no fixed pixel values for main layouts
- Border-radius rule: parent radius = child radius + inner spacing
