# Slash Commands Reference

## `/build <page-type> <description>`

Generate a complete page from scratch.

**Page types:** `landing`, `dashboard`, `pricing`, `auth`, `settings`, `profile`, `blog`, `docs`, `changelog`

**Examples:**
```
/build landing AI-powered code review tool for engineering teams
/build dashboard Analytics dashboard for an e-commerce SaaS
/build pricing Three-tier pricing for a developer tool
/build auth Login + signup page for a fintech app
```

**What happens:**
1. Loads design-system, page-structure, motion-patterns references
2. Selects tech stack based on complexity (React/Next.js or static HTML)
3. Generates all mandatory sections (minimum 5)
4. Applies current dial values for motion/variance/density
5. Runs pre-flight checklist
6. Invokes image-generator as final step

**Flags:**
- Add `--static` to force HTML/CSS/JS output
- Add `--react` to force React/Next.js output
- Add `--minimal` to skip non-essential sections

---

## `/polish`

Final pre-ship quality pass on existing code. Non-destructive.

**What it checks and fixes:**
- Contrast ratios (adjusts colors to meet WCAG AA)
- Spacing consistency (normalizes to 4px grid)
- Copy quality (replaces generic CTAs, lorem ipsum)
- Micro-interactions (adds missing hover/focus states)
- Tactile feedback (adds active states: `scale-[0.98]`, pressed effects)
- Border consistency
- Typography hierarchy

**Example:**
```
/polish
/polish src/components/Hero.tsx
```

---

## `/audit`

WCAG 2.2 AA + anti-slop report. **No code changes.** Output only.

**Output format:** `file:line` references with severity (Critical/Warning/Info).

**What it checks:**
- WCAG AA contrast ratios
- Semantic HTML usage
- Focus indicators and keyboard navigation
- Loading/empty/error states
- Anti-slop patterns (centered hero, neon accents, default shadcn, etc.)
- Missing ARIA attributes

**Example:**
```
/audit
/audit src/app/page.tsx
```

---

## `/critique`

UX design review written as a principal designer. **No code changes.**

**Output:** Free-form review covering:
- Nielsen 10 heuristics analysis
- User flow assessment
- Cognitive load evaluation
- Visual hierarchy clarity
- Information architecture
- Interaction design quality
- Specific recommendations with priority

**Example:**
```
/critique
/critique src/components/Dashboard.tsx
```

---

## `/animate [intensity]`

Add motion patterns to existing code.

**What it adds:**
- Scroll-triggered reveals (fade-in, slide-in, scale-in with stagger)
- Hover effects on interactive elements
- Micro-interactions (button press, input focus, card hover)
- Perpetual animations when intensity > 5 (pulse, shimmer, float)
- Spring physics on interactive elements when intensity > 6
- Autonomous demos (ghost cursor, type-delete-retype) when intensity > 7

**Always respects `prefers-reduced-motion: reduce`.**

**Example:**
```
/animate
/animate 8
/animate 3
```

---

## `/imagify [mood]`

Run the Gemini image generation pipeline.

**Mood keywords:** `dark moody`, `clean bright`, `cinematic`, `minimal`, `warm`, `cold`, `dramatic`

**What it does:**
1. Scans the page for image zones (hero backgrounds, feature illustrations, logos, avatars)
2. Crafts cinematic prompts for each zone
3. With `GEMINI_API_KEY`: generates via Gemini 2.0 Flash
4. Without key: falls back to curated `picsum.photos` placeholders

**Example:**
```
/imagify
/imagify dark moody
/imagify clean bright
```

---

## `/dials variance=N motion=N density=N`

Adjust design dials mid-session. Accepts partial sets.

**Examples:**
```
/dials variance=6 motion=8 density=3
/dials motion=2
/dials density=9
```

**Effects:**
- `variance=1-3`: Symmetric, grid-aligned, centered layouts
- `variance=7-10`: Asymmetric, creative, artsy layouts
- `motion=1-3`: Minimal transitions, no scroll animations
- `motion=7-10`: Cinematic springs, autonomous demos, perpetual animations
- `density=1-3`: Generous whitespace, art gallery feel
- `density=7-10`: Cockpit dense, `divide-y` instead of cards, monospace numbers

---

## `/variant <preset-name>`

Swap brand preset. Re-themes the current output.

**Available presets:**
| Name | One-line |
|------|----------|
| `vercel` | Black/white, Geist, zero accent |
| `linear` | Near-black, indigo accent, dense |
| `stripe` | Navy, prismatic gradients, generous |
| `raycast` | Dark chrome, multi-hue, rounded-XL |
| `superhuman` | Purple glow, monospace metadata, fast |
| `notion` | Off-white, serif display, editorial |
| `vs-code` | Editor-dark, syntax colors, monospace |

**What changes:** Colors, fonts, spacing, border-radius, motion intensity, banned patterns.

**Example:**
```
/variant linear
/variant raycast
```
