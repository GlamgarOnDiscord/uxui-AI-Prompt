/**
 * Canonical DesignTokens schema.
 *
 * Superset of the VoltAgent Stitch 9-section format, with first-class support for:
 *  - `dials` (DESIGN_VARIANCE / MOTION_INTENSITY / VISUAL_DENSITY) — Glamgar extension
 *  - `motion` (durations, easings, signature patterns)
 *  - `accessibility` (WCAG targets, contrast ratios)
 *
 * Any valid Stitch DESIGN.md parses cleanly into a partial of this shape. Fields that
 * the source document doesn't cover are simply absent — never synthesized.
 */
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Primitives
// ─────────────────────────────────────────────────────────────────────────────

/** Hex, rgb(), hsl(), oklch(), or Tailwind-style tokens. Normalization happens later. */
export const ColorValue = z.string().min(1);

/** A color can be a single string or a scale keyed by variant (50..950, DEFAULT, foreground). */
export const ColorScale = z.union([
  ColorValue,
  z.object({
    DEFAULT: ColorValue.optional(),
    foreground: ColorValue.optional(),
    50: ColorValue.optional(),
    100: ColorValue.optional(),
    200: ColorValue.optional(),
    300: ColorValue.optional(),
    400: ColorValue.optional(),
    500: ColorValue.optional(),
    600: ColorValue.optional(),
    700: ColorValue.optional(),
    800: ColorValue.optional(),
    900: ColorValue.optional(),
    950: ColorValue.optional(),
  }).passthrough(),
]);

export const ScaleStep = z.union([z.string(), z.number()]);

// ─────────────────────────────────────────────────────────────────────────────
// Sections
// ─────────────────────────────────────────────────────────────────────────────

export const Meta = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  version: z.string().default("0.1.0"),
  source: z.string().url().optional(),
  license: z.string().default("MIT"),
  author: z.string().optional(),
  description: z.string().optional(),
});

export const Theme = z.object({
  mode: z.enum(["dark", "light", "both"]).default("dark"),
  base: z.string().optional(), // "zinc" | "slate" | "neutral" | custom
  aesthetic: z.string().optional(), // free-text descriptor: "premium SaaS dark-first"
  inspirations: z.array(z.string()).default([]), // ["Linear", "Vercel", "Raycast"]
});

export const Palette = z.object({
  background: ColorScale.optional(),
  foreground: ColorScale.optional(),
  surface: ColorScale.optional(),
  border: ColorScale.optional(),
  accent: ColorScale.optional(),
  muted: ColorScale.optional(),
  semantic: z.object({
    success: ColorScale.optional(),
    warning: ColorScale.optional(),
    error: ColorScale.optional(),
    info: ColorScale.optional(),
  }).partial().optional(),
  custom: z.record(ColorScale).optional(), // escape hatch for brand-specific tokens
});

export const Typography = z.object({
  fontFamilies: z.object({
    display: z.string().optional(),
    body: z.string().optional(),
    mono: z.string().optional(),
  }).partial().optional(),
  scale: z.record(ScaleStep).optional(), // { xs: "0.75rem", sm: "0.875rem", ... }
  weights: z.record(z.number()).optional(),
  tracking: z.record(ScaleStep).optional(),
  leading: z.record(ScaleStep).optional(),
  rules: z.array(z.string()).default([]), // "No Inter for premium UI", etc.
});

export const Layout = z.object({
  container: z.object({
    maxWidth: z.string().optional(),
    padding: z.string().optional(),
  }).partial().optional(),
  spacing: z.array(ScaleStep).optional(), // 4px-scale: [0, 4, 8, 12, 16, 24, ...]
  grid: z.object({
    columns: z.number().optional(),
    gap: ScaleStep.optional(),
  }).partial().optional(),
  radius: z.record(ScaleStep).optional(), // { sm: "0.25rem", md: "0.5rem", ... }
});

export const Elevation = z.object({
  shadows: z.record(z.string()).optional(),
  blur: z.record(z.string()).optional(),
  borders: z.object({
    default: z.string().optional(),
    subtle: z.string().optional(),
    strong: z.string().optional(),
  }).partial().optional(),
});

export const Motion = z.object({
  durations: z.object({
    fast: z.string().optional(),   // "200ms"
    normal: z.string().optional(), // "300ms"
    slow: z.string().optional(),   // "500ms"
  }).partial().optional(),
  easings: z.record(z.string()).optional(),
  spring: z.object({
    stiffness: z.number().optional(),
    damping: z.number().optional(),
  }).partial().optional(),
  /** Glamgar signature motion patterns referenced by name. */
  patterns: z.array(z.enum([
    "ghost-cursor",
    "type-delete-retype",
    "algorithm-visualizer",
    "live-property-editor",
    "autonomous-dashboard",
    "morphing-metric",
  ])).default([]),
});

/** Glamgar's 3-dial system. First-class in the canonical schema. */
export const Dials = z.object({
  design_variance: z.number().int().min(1).max(10).default(8),
  motion_intensity: z.number().int().min(1).max(10).default(6),
  visual_density: z.number().int().min(1).max(10).default(4),
});

export const ComponentSpec = z.object({
  base: z.string().optional(),     // e.g. "bg-zinc-900 border border-white/10 rounded-2xl"
  variants: z.record(z.string()).optional(),
  sizes: z.record(z.string()).optional(),
  rules: z.array(z.string()).default([]),
}).partial();

export const Components = z.object({
  button: ComponentSpec.optional(),
  card: ComponentSpec.optional(),
  input: ComponentSpec.optional(),
  badge: ComponentSpec.optional(),
  nav: ComponentSpec.optional(),
  custom: z.record(ComponentSpec).optional(),
});

export const Responsive = z.object({
  breakpoints: z.record(z.string()).optional(), // { sm: "640px", md: "768px", ... }
  approach: z.enum(["mobile-first", "desktop-first"]).default("mobile-first"),
});

export const Accessibility = z.object({
  wcagLevel: z.enum(["AA", "AAA"]).default("AA"),
  contrast: z.object({
    normal: z.number().optional(),  // e.g. 4.5 (AA) or 7 (AAA)
    large: z.number().optional(),   // e.g. 3 (AA) or 4.5 (AAA)
  }).partial().optional(),
  focusVisible: z.boolean().default(true),
  reducedMotion: z.boolean().default(true),
});

export const Rules = z.object({
  dos: z.array(z.string()).default([]),
  donts: z.array(z.string()).default([]),
  antiPatterns: z.array(z.string()).default([]),
});

export const Prompts = z.object({
  hero: z.string().optional(),
  features: z.string().optional(),
  onboarding: z.string().optional(),
  pricing: z.string().optional(),
  custom: z.record(z.string()).optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────

export const DesignTokens = z.object({
  meta: Meta,
  theme: Theme.default({ mode: "dark", inspirations: [] }),
  palette: Palette.default({}),
  typography: Typography.default({ rules: [] }),
  layout: Layout.default({}),
  elevation: Elevation.default({}),
  motion: Motion.default({ patterns: [] }),
  dials: Dials.default({ design_variance: 8, motion_intensity: 6, visual_density: 4 }),
  components: Components.default({}),
  responsive: Responsive.default({ approach: "mobile-first" }),
  accessibility: Accessibility.default({
    wcagLevel: "AA",
    focusVisible: true,
    reducedMotion: true,
  }),
  rules: Rules.default({ dos: [], donts: [], antiPatterns: [] }),
  prompts: Prompts.default({}),
});

export type DesignTokens = z.infer<typeof DesignTokens>;
export type DesignTokensInput = z.input<typeof DesignTokens>;

/** The 9 canonical section names, in document order. */
export const SECTION_NAMES = [
  "meta",
  "theme",
  "palette",
  "typography",
  "layout",
  "elevation",
  "motion",
  "dials",
  "components",
  "responsive",
  "accessibility",
  "rules",
  "prompts",
] as const;

export type SectionName = (typeof SECTION_NAMES)[number];
