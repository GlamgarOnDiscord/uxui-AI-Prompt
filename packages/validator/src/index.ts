/**
 * @design-md/validator — public API
 *
 * Lints UI source files against DESIGN.md design tokens.
 *
 * @example
 * import { lint } from "@design-md/validator";
 * const result = await lint("./src", { cwd: process.cwd() });
 * console.log(result.summary); // { errors: 2, warnings: 0 }
 */

// ── Public types ──────────────────────────────────────────────────────────────

export type { LintViolation, LintResult } from "./types.js";

// ── Main function ─────────────────────────────────────────────────────────────

export { lint } from "./lint.js";
export type { LintOptions } from "./lint.js";

// ── Utilities (re-exported for advanced use) ──────────────────────────────────

export { findDesignMd } from "./find-design-md.js";
export { extractFromCss } from "./extract/from-css.js";
export { extractFromTsx } from "./extract/from-tsx.js";
export { reportToConsole } from "./reporter.js";
export {
  relativeLuminance,
  contrastRatio,
  checkContrastRatioTsx,
  checkContrastRatioCss,
} from "./rules/contrast-ratio.js";
export { checkSpacingScaleCss, checkSpacingScaleTsx } from "./rules/spacing-scale.js";
export { checkFontFamilyCss, checkFontFamilyTsx } from "./rules/font-family.js";
