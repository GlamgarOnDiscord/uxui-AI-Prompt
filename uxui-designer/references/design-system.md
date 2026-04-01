# Design System Reference

## Table des matières
- [Palette couleurs — Dark Mode](#palette-couleurs--dark-mode)
- [Palette couleurs — Light Mode](#palette-couleurs--light-mode)
- [Règles couleurs](#règles-couleurs)
- [Typographie](#typographie)
- [Layout & Spacing](#layout--spacing)
- [Component Styles](#component-styles)
- [Effects & Backgrounds](#effects--backgrounds)
- [Glassmorphism](#glassmorphism)
- [Icon Libraries & SVG Rules](#icon-libraries--svg-rules)
- [Accessibilité (WCAG)](#accessibilité-wcag)
- [Anti-Patterns](#anti-patterns)
- [Performance & Code Quality](#performance--code-quality)

---

## Palette couleurs — Dark Mode

| Element | Classes | Notes |
|---------|---------|-------|
| Backgrounds | `bg-black`, `bg-zinc-950`, `bg-[#09090b]` | Never pure grays; use Zinc/Slate |
| Surfaces | `bg-zinc-900/50` + `backdrop-blur-sm` | Subtle glass effect |
| Borders | `border border-white/5` or `border-white/10` | Ultra-thin and subtle |
| Headings | `text-white` | High contrast |
| Body Text | `text-zinc-400` | Readable but subdued |
| Subtle Text | `text-zinc-500`, `text-zinc-600` | Labels, captions |
| Accents | Emerald, Teal, or muted Indigo | Sparingly — glows and CTAs only |

## Palette couleurs — Light Mode

Only if requested by the user.

| Element | Classes | Notes |
|---------|---------|-------|
| Backgrounds | `bg-stone-50`, `bg-zinc-50`, `bg-[#f9fafb]` | Never pure white |
| Surfaces | `#ffffff` with `border border-slate-200/50` | 1px border for depth |
| Text | `#0f172a`, `text-zinc-800` | Never pure black |

## Règles gradients (source: @Ishanzaad 4.5k bookmarks + @LexnLin)

> Ces règles sont issues des posts les plus bookmarkés de la communauté X design (mars 2026)

- **Max 2-3 couleurs, même famille** — ne pas mélanger des familles de teintes opposées
- **Tester en noir et blanc d'abord** — si le contraste est nul en N&B, le gradient est raté
- **Centre légèrement plus bright** — un subtil highlight au centre donne de la profondeur
- **Grands backgrounds = pâles** — saturation < 30% pour les backgrounds larges, réserver l'intensité aux petits éléments
- **`repeating-linear-gradient`** pour les effets de lignes/grilles — bien plus performant que des divs
  ```css
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 40px,
    rgba(255,255,255,0.03) 40px,
    rgba(255,255,255,0.03) 41px
  );
  mask: linear-gradient(to bottom, transparent 0%, black 50%);
  ```
- **Radial gradient glow** pour les accents CTA :
  ```css
  background: radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%);
  ```

## Règles couleurs

- Évite les couleurs saturées/néon (electric purple, electric blue, magenta, turquoise) — elles créent un look "Web3/AI" cheap et non professionnel
- Utilise Off-Black (`bg-zinc-950`, `bg-[#09090b]`) plutôt que `#000000` — le noir pur est trop dur et crée un contraste inconfortable avec les surfaces
- **AI Purple/Blue ban:** No purple button glows, no neon gradients. Use neutral bases (Zinc/Slate) with a single high-contrast accent (Emerald, Deep Rose, or Electric Blue muted)
- Max 1 accent color. Saturation < 80%
- Stick to one palette — do not mix warm and cool grays in the same project
- Color rule **60-30-10** : 60% primary (background), 30% secondary (text), 10% accent (CTA)
- Ensure WCAG AA contrast minimum (4.5:1 for normal text, 3:1 for large text)
- WCAG AAA preferred (7:1 for normal text, 4.5:1 for large text)

---

## Typographie

### Multi-font system (2-3 fonts maximum)

| Usage | Font Type | Examples |
|-------|-----------|----------|
| Display/Headings | Modern geometric | Geist, Cabinet Grotesk, Satoshi, Outfit, Cal Sans, Plus Jakarta |
| Body Text | Clean, readable | DM Sans, Satoshi — avoid Inter for premium interfaces, it's too generic |
| Monospace (data/code) | Technical | Geist Mono, JetBrains Mono |

### Typography Rules
- Headlines: `text-4xl md:text-6xl tracking-tighter leading-none`
- Body: `text-base leading-relaxed max-w-[65ch]`
- Les polices Serif sont interdites sur les Dashboards/Software UIs — utilise Sans-Serif + Mono car les interfaces techniques nécessitent une lecture rapide et uniforme
- Create reusable CSS classes for each text type
- Minimum 12px font size on mobile
- Responsive font sizing (`text-5xl sm:text-6xl lg:text-7xl`)
- When `VISUAL_DENSITY > 7`: use `font-mono` for all numbers and data values — monospace aligns columns perfectly in dense data layouts

---

## Layout & Spacing

### Principles
- Mobile-first approach with Tailwind breakpoints
- Use semantic HTML5: `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Never create "div soup" without structure
- Never use fixed pixel values for main layouts; use `%`, `rem`, `vw`, `max-w`
- Always limit reading width (`max-width`) for text content — `max-w-[65ch]` for paragraphs
- Never generate horizontal scroll
- Contain page layouts: `max-w-[1400px] mx-auto` or `max-w-7xl`

### Spacing System
- Based on 4px increments
- Generous vertical margins between sections (`py-24`, `py-32`)
- Consistent padding adapted to content

#### Spacing Cheatsheet — Règle de Proximité
Les éléments proches sont perçus comme appartenant au même groupe. Utilise ce système cohérent :

| Usage | Valeur Tailwind | px |
|---|---|---|
| Intra-composant (label → input) | `gap-1` / `space-y-1` | 4px |
| Éléments liés (icône → texte) | `gap-2` / `space-y-2` | 8px |
| Groupe compact | `gap-3` / `space-y-3` | 12px |
| Séparation standard | `gap-4` / `space-y-4` | 16px |
| Groupes distincts | `gap-6` / `space-y-6` | 24px |
| Sections proches | `gap-8` / `space-y-8` | 32px |
| Sections distinctes | `gap-12` / `space-y-12` | 48px |
| Sections majeures | `gap-16` / `space-y-16` | 64px |

**Règle clé** : l'espacement entre deux groupes doit toujours être plus grand que l'espacement à l'intérieur d'un groupe.

#### Dark Mode via CSS Variables (recommandé vs `dark:` Tailwind)
Plutôt que de préfixer chaque style avec `dark:`, définir des CSS vars globales — bien plus maintenable :

```css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96.1%;
  --border: 214.3 31.8% 91.4%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --border: 217.2 32.6% 17.5%;
}
```

```js
// tailwind.config.js
colors: {
  background: 'hsl(var(--background) / <alpha-value>)',
  foreground: 'hsl(var(--foreground) / <alpha-value>)',
  border: 'hsl(var(--border) / <alpha-value>)',
}
```

**Important** : toujours inclure `/ <alpha-value>` dans les CSS vars Tailwind pour que les utilitaires d'opacité (`bg-background/50`) continuent de fonctionner.

#### Semantic Color Palette
Nommer les couleurs par **usage** plutôt que par valeur :

| Token | Rôle | Exemple dark |
|---|---|---|
| `--background` | Fond de page | `#09090b` |
| `--surface` | Cards, panels | `#18181b` |
| `--border` | Bordures | `rgba(255,255,255,0.08)` |
| `--text-primary` | Titres | `#fafafa` |
| `--text-secondary` | Corps | `#a1a1aa` |
| `--text-muted` | Labels, captions | `#71717a` |
| `--accent` | CTA, highlights | `#10b981` |
| `--destructive` | Erreurs | `#ef4444` |
- Border-radius boomerang rule: parent radius = child radius + inner spacing

### Responsive Breakpoints
- 320px minimum (mobile)
- 768px (tablet)
- 1200px+ (desktop)

### Critical Layout Rules

- **Full-height sections:** Utilise `min-h-[100dvh]` à la place de `h-screen` — ce dernier casse sur iOS Safari car il ignore la barre d'adresse du navigateur, ce qui tronque le contenu
- **Multi-column layouts:** Pour les layouts multi-colonnes, utilise CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`) plutôt que le math flexbox (`calc(33% - 1rem)`) — plus lisible, plus robuste aux breakpoints, et élimine les bugs d'arrondi sous-pixel
- **Hero alignment:** When `DESIGN_VARIANCE > 4` (default: 8), centered Hero/H1 layouts are banned. Use Split Screen (50/50), Left-aligned content with Right-aligned asset, or Asymmetric whitespace instead — centered layouts are the #1 visual cliché of AI-generated pages
- **Mobile collapse:** Any asymmetric layout must aggressively fall back to `w-full px-4 py-8` single column on viewports < 768px

### Layout Types
- Use **Bento Grid** layouts (asymmetrical grids)
- Staggered columns
- Subtle diagonal sections (without Web3 extravagance)

---

## Component Styles

### Buttons
- Size: Generous (`min. px-8 py-4`) — small buttons feel cheap and are harder to tap on mobile
- Text: Bold/Semi-bold
- Hover: Marked effect (background, subtle shadow, animated icon)
- Style: Avoid standard rounded buttons
- Use "Shimmer Buttons" or "Spotlight Buttons" with subtle borders and internal glows
- On `:active` — use `-translate-y-[1px]` or `scale-[0.98]` for tactile physical push feedback

### Cards
- Background: Solid or subtle semi-transparent
- Border: 1px thin, discrete (`border-white/5` or `border-white/10`)
- Gradient: `bg-gradient-to-b from-white/5 to-transparent`
- Hover: Slight translateY/scale/shadow
- Overflow: Hidden if necessary
- If using SVG in one bento card, use SVGs in ALL cards — visual consistency across the grid is critical
- When `VISUAL_DENSITY > 7`: replace cards with `border-t` / `divide-y` dividers — boxes clutter data-dense layouts and waste vertical space

### Inputs
- Style: Minimalist
- Background: `bg-zinc-900`
- Border: `border-zinc-800`
- Focus: `focus:ring-indigo-500/20` or accent color
- Label always above input. Error text below. `gap-2` between elements.

### Interaction States [MANDATORY]

Never output only the "success/happy path" state — real UIs have loading, empty, and error states. Always include:
- **Loading:** Skeleton loaders matching the layout shape — no generic spinners (they look unfinished)
- **Empty State:** A composed empty state with a prompt to populate data
- **Error State:** Inline error message below the relevant field or action

---

## Effects & Backgrounds

Backgrounds must never be flat — depth and texture signal premium quality.

### Background Techniques
- **Noise textures** — apply **only** to `fixed inset-0 pointer-events-none` pseudo-elements, never to scrolling containers (causes GPU repaint on mobile, killing scroll performance)
- **Grid Patterns** (`bg-[linear-gradient(...)]`)
- **Animated Grid Patterns**
- **Particles** for ambience
- **Spotlights** for focus areas
- **Beams** for directional energy
- **WebGL** if necessary
- Never use simple random lines as SVG backgrounds — they look like placeholder graphics and cheapen the design

### Glows & Shadows
- No neon/fluorescent outer glows
- No heavy card shadows — use borders instead (they're sharper, more consistent across browsers, and work better in dark mode)

## Glassmorphism

Use sparingly. Beyond `backdrop-blur`, add a 1px inner border (`border-white/10`) and an inner shadow (`shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]`) to simulate physical edge refraction — this is what separates premium glass from generic blur.

- NO iOS 7-style glossy glass
- NO heavy glow effects combined with glass

---

## Icon Libraries & SVG Rules

### Icon Libraries (Choose one per project)
- `@phosphor-icons/react` **(preferred for React — flexible weights)**
- `@radix-ui/react-icons`
- `lucide-react` / Lucide Icons CDN
- Iconsax: `https://cdn.jsdelivr.net/npm/iconsax-font-icon@1.1.0/dist/icons.min.css`
- Font Awesome
- HugeIcons

**Standardize `strokeWidth` globally** — pick one value (e.g. `1.5` or `2.0`) and never mix throughout the project.

### SVG Rules
- Use SVGs for important icons — never emojis in production (they render differently across OS/browsers)
- Never use PNG images for simple icons — SVGs scale perfectly and weigh less
- Create custom SVG graphics to add creativity (small graphs, icons, pictograms)
- Create or use SVG illustrations for hero and key sections
- Optimize all images: compression + lazy-load
- Use clean placeholders if needed: `https://picsum.photos/seed/{slug}/800/600` or `https://placehold.co/400x250` — **never Unsplash URLs** (they break due to rate limiting and URL structure changes)

---

## Accessibilité (WCAG)

### Contrast Targets
- **WCAG AA minimum:** 4.5:1 for normal text, 3:1 for large text
- **WCAG AAA preferred:** 7:1 for normal text, 4.5:1 for large text or bold

### Accessibility Checklist
- [ ] Meaningful `alt` text on useful images
- [ ] `aria-hidden` on decorative SVGs
- [ ] Visible focus states on all interactive elements
- [ ] Smooth keyboard navigation (logical order, clear focus)
- [ ] Descriptive links and buttons (never "click here" alone)
- [ ] Sufficient contrast everywhere
- [ ] Never black text on dark/black backgrounds
- [ ] Never white text on light backgrounds
- [ ] Never use overly deep grays that fail contrast
- [ ] Accessible hover states and icon texts

---

## Design Cheatsheet — Règles minimales qui changent tout

> Règles condensées issues des posts les plus bookmarkés de la communauté

### Icônes
- Stroke width : **1.2px**
- Base size : **16px**
- Choisir une seule librairie pour tout le projet — ne pas mixer
- Préférences : Phosphor Icons, Lucide, HugeIcons

### Typographie
- **Maximum 2 font weights** : Regular pour le body, Medium pour les titres et l'emphase
- Jamais plus de 2-3 familles de polices sur un même projet
- Taille minimum : 12px mobile

### Couleurs
- Utiliser la **palette Neutral de Tailwind CSS** comme base — cohérente, accessible, battle-tested
- Ne jamais mélanger les familles warm/cool dans le même projet

### Border-radius
- **8 à 12px** — pas plus, pas moins
- Règle : parent radius = child radius + inner spacing
- Dépasser 16px = interface qui "flotte" (look Web3/App mobile, pas SaaS)

### Spacing
- Système basé sur **4px** — toujours multiplier par 4 (4, 8, 12, 16, 24, 32, 48, 64px)
- Espacement entre groupes > espacement à l'intérieur d'un groupe (règle de proximité)

---

## Anti-Patterns

### Design Anti-Patterns ❌
- NO "Web3" or overly futuristic/cyberpunk/hacker style
- NO large gradient backgrounds
- NO saturated/neon accent colors
- NO heavy glassmorphism abuse
- NO colored glows, neon shadows
- NO ultra-rounded "floating" Web3 cards
- NO intensive gradient usage
- NO "iLook" or Glossy iOS 7 style
- NO heavy drop-shadows on cards (use borders)
- NO bright/neon gradients covering the whole screen
- NO standard Bootstrap/Material Design layouts
- NO AI-look mockups or gadgets; use simple, credible SaaS UIs
- NO random/useless SVG lines in backgrounds
- NO white shadows on dark backgrounds
- NO centered hero sections when `DESIGN_VARIANCE` > 4
- NO three equal-width cards in a horizontal row — use Zig-Zag, asymmetric grid, or horizontal scroll

### 50 UI Dos & Don'ts — Condensé essentiel

**✅ DO**
- Aligner les éléments sur une grille invisible — l'alignement crée l'ordre
- Hiérarchie visuelle claire : 1 élément dominant, tout le reste secondaire
- Utiliser le whitespace comme outil de design, pas comme espace vide
- Tester chaque composant en dark ET light mode dès le début
- Utiliser des vraies données dans les mockups (jamais "Lorem ipsum" en production)
- Rendre les états hover, focus, active explicites et cohérents
- Grouper les éléments liés visuellement (couleur, espace, bordure)
- Garder les CTAs au-dessus de la fold sur mobile
- Limiter à 3 niveaux de hiérarchie typographique maximum

**❌ DON'T**
- Utiliser plus de 3 couleurs primaires dans la même interface
- Centrer tout — l'asymétrie contrôlée crée de l'intérêt visuel
- Mettre du texte sur des images sans overlay ou flou
- Utiliser des boutons de même couleur pour des actions différentes
- Oublier les états vides (empty states) et les états d'erreur
- Utiliser des animations pour décorer — seulement pour guider l'attention
- Mettre des liens en bleu sur fond sombre sans hover explicite
- Utiliser `opacity` pour désactiver — utiliser `disabled` + style dédié
- Ignorer le contraste sur les petits textes (< 14px)
- Changer le cursor par défaut sans raison claire

### Typography Anti-Patterns ❌
- NO Inter for premium/creative UI — use Geist, Satoshi, Cabinet Grotesk, or Outfit
- NO Serif fonts on Dashboards or Software UIs
- NO emojis anywhere in production code or markup

### Technical Anti-Patterns ❌
- NO inline styles except for dynamic cases
- NO `!important` unless absolutely necessary
- NO CSS duplication
- NO layout-shifting animations (only transform/opacity)
- NO `h-screen` for hero sections — use `min-h-[100dvh]`
- NO complex flexbox percentage math — use CSS Grid
- NO arbitrary z-index values — systemic contexts only
- NO uncompressed oversized images
- NO horizontal scroll
- NO `window.addEventListener('scroll')` for scroll animations — use Framer Motion or GSAP ScrollTrigger instead (they handle cleanup, RAF batching, and intersection observation automatically)

---

## Performance & Code Quality

### Code Standards
- Clean, indented HTML and Tailwind
- Reusable classes
- Semantic HTML structure
- Preconnect for external fonts
- Optimized, compressed images
- Lazy loading for images
- Animations that don't cause layout shifts
- Don't stop at 500 lines; if you haven't finished, go all the way through the process

### Performance Rules
- Grain/noise textures: apply ONLY to `fixed inset-0 pointer-events-none` pseudo-elements — never to scrolling containers
- Only animate `transform` and `opacity` — never width/height/top/left (these trigger layout recalculation on every frame)
- All `useEffect` animations must include a cleanup function
- Perpetual animations (infinite loops) must be memoized with `React.memo` and isolated in their own Client Component — never trigger re-renders in a parent layout
