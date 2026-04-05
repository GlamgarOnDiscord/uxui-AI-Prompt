/**
 * Rule: font-family
 *
 * Checks that all font-family values found in CSS and JSX inline styles
 * are present in the DESIGN.md typography.fontFamilies definition.
 *
 * Tailwind utility classes (font-sans, font-serif, font-mono) are exempt
 * because they resolve to CSS variables defined by the design system.
 */
import type { LintViolation } from "../types.js";
import type { ExtractedCss } from "../extract/from-css.js";
import type { ExtractedTsx } from "../extract/from-tsx.js";

/** Default allowed font families when no DESIGN.md is found */
const DEFAULT_ALLOWED_FONTS = new Set(["Geist", "DM Sans", "Geist Mono"]);

function buildAllowedSet(
  fontFamilies: { display?: string; body?: string; mono?: string } | null | undefined,
): Set<string> {
  if (!fontFamilies) return DEFAULT_ALLOWED_FONTS;

  const allowed = new Set<string>();
  if (fontFamilies.display) allowed.add(fontFamilies.display);
  if (fontFamilies.body) allowed.add(fontFamilies.body);
  if (fontFamilies.mono) allowed.add(fontFamilies.mono);

  if (allowed.size === 0) return DEFAULT_ALLOWED_FONTS;
  return allowed;
}

/** CSS generic font families — never require DESIGN.md validation. */
const GENERIC_FAMILIES = new Set([
  "sans-serif", "serif", "monospace", "cursive", "fantasy",
  "system-ui", "ui-sans-serif", "ui-serif", "ui-monospace",
  "ui-rounded", "inherit", "initial", "unset",
]);

function isTailwindFontClass(family: string): boolean {
  return family.startsWith("tw:font-");
}

function isGenericFamily(family: string): boolean {
  return GENERIC_FAMILIES.has(family.toLowerCase());
}

function checkFamily(
  file: string,
  family: string,
  line: number,
  allowed: Set<string>,
  violations: LintViolation[],
): void {
  if (isTailwindFontClass(family)) return; // Tailwind utility — exempt

  // Normalize: strip quotes and extra whitespace
  const normalized = family.trim().replace(/^['"]|['"]$/g, "");
  if (!normalized) return;
  if (isGenericFamily(normalized)) return; // CSS generic families — always valid

  // Check against allowed set (case-insensitive match)
  const isAllowed = Array.from(allowed).some(
    (f) => f.toLowerCase() === normalized.toLowerCase(),
  );

  if (!isAllowed) {
    violations.push({
      file,
      line,
      rule: "font-family",
      severity: "error",
      message: `Font "${normalized}" is not defined in DESIGN.md typography.fontFamilies`,
      value: normalized,
      expected: Array.from(allowed).join(", ") || "(none defined)",
    });
  }
}

export function checkFontFamilyCss(
  file: string,
  extracted: ExtractedCss,
  fontFamilies: { display?: string; body?: string; mono?: string } | null | undefined,
): LintViolation[] {
  const violations: LintViolation[] = [];
  const allowed = buildAllowedSet(fontFamilies);

  for (const font of extracted.fonts) {
    checkFamily(file, font.family, font.line, allowed, violations);
  }

  return violations;
}

export function checkFontFamilyTsx(
  file: string,
  extracted: ExtractedTsx,
  fontFamilies: { display?: string; body?: string; mono?: string } | null | undefined,
): LintViolation[] {
  const violations: LintViolation[] = [];
  const allowed = buildAllowedSet(fontFamilies);

  for (const font of extracted.fonts) {
    if (isTailwindFontClass(font.family)) continue;
    checkFamily(file, font.family, font.line, allowed, violations);
  }

  return violations;
}
