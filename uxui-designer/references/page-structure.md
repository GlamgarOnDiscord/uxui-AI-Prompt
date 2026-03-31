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

#### 6 règles hero section (source: @jameslaurents — 6.2k bookmarks)
1. **Le titre doit survivre sans sous-titre** — si le message n'est pas clair en 3 mots, retravailler
2. **CTA above the fold toujours** — jamais forcer le scroll pour trouver l'action principale
3. **Une seule direction visuelle** — l'œil doit savoir où aller immédiatement (haut gauche → CTA)
4. **Le background sert le texte** — jamais l'inverse. Si le background attire plus que le titre, le réduire
5. **Social proof dans le hero lui-même** — avatars + stats + logos = confiance immédiate avant le scroll
6. **Mobile first pour le hero** — concevoir d'abord en 375px, puis scaler. Le hero mobile casse toujours en premier

#### 10 sections d'une landing high-converting (source: @namyakhann — 6.2k bookmarks)
1. Hero — valeur + CTA immédiat
2. Social proof — logos clients / stats
3. Problem — douleur que tu résous
4. Solution — ton produit comme réponse
5. Features — bento grid ou liste avec icônes
6. How it works — 3 étapes max, visuel
7. Testimonials — vrais noms, vrais résultats chiffrés
8. Pricing — 3 tiers, mettre en avant le middle
9. FAQ — objections réelles des prospects
10. Final CTA — répéter la proposition de valeur + urgence

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

## 5 Tips Bento Cards Premium

1. **Legibility first** — aussi belle que soit la carte, si c'est dur à lire elle échoue. Contraste texte minimum WCAG AA, jamais de texte sur fond moyen
2. **Break the Grid intentionnellement** — la symétrie parfaite est ennuyeuse. Décaler un bloc, faire "sortir" un élément, varier les hauteurs. L'asymétrie contrôlée = caractère
3. **Add Texture** — détails subtils (noise overlay, grain, pattern discret en background de carte) pour casser le flat design sans surcharger
4. **Merge your bentos** — laisser une carte "couler" dans la suivante. Créer des transitions entre idées via la taille, le mouvement ou la mise en page. Un bento = un flow, pas une grille d'items isolés
5. **Animate your bentos** — hover subtil, soft glow au survol, expanding cards. Le mouvement intentionnel rend l'interface premium et vivante

---

## Global Layout Specs

- Mobile-first with Tailwind breakpoints (320px, 768px, 1200px+)
- Semantic HTML5: `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- 4px increment spacing system
- Section padding: `py-24` / `py-32`
- Container: `max-w-7xl mx-auto px-6`
- No horizontal scroll, no fixed pixel values for main layouts
- Border-radius rule: parent radius = child radius + inner spacing
