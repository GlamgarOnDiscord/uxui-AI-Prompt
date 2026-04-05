/**
 * Rule: spacing-scale
 *
 * Validates that all pixel spacing values (padding/margin/gap) are multiples
 * of the design system's base unit (default: 4px).
 *
 * Values below MIN_PX (2px) are ignored — they are likely borders or outlines.
 */
import type { LintViolation } from "../types.js";
import type { ExtractedCss } from "../extract/from-css.js";
import type { ExtractedTsx } from "../extract/from-tsx.js";

const MIN_PX = 2;

function isOnGrid(px: number, unit: number): boolean {
  return px % unit === 0;
}

export function checkSpacingScaleCss(
  file: string,
  extracted: ExtractedCss,
  spaceUnit = 4,
): LintViolation[] {
  const violations: LintViolation[] = [];

  for (const s of extracted.spacing) {
    if (s.valuePx < MIN_PX) continue;
    if (!isOnGrid(s.valuePx, spaceUnit)) {
      violations.push({
        file,
        line: s.line,
        rule: "spacing-scale",
        severity: "error",
        message: `${s.property}: ${s.raw} is not on the ${spaceUnit}px grid (${s.valuePx} % ${spaceUnit} = ${s.valuePx % spaceUnit})`,
        value: s.raw,
        expected: `Multiple of ${spaceUnit}px`,
      });
    }
  }

  return violations;
}

export function checkSpacingScaleTsx(
  file: string,
  extracted: ExtractedTsx,
  spaceUnit = 4,
): LintViolation[] {
  const violations: LintViolation[] = [];

  // Only check inline-style spacing; Tailwind class spacing is already on the 4px grid
  for (const s of extracted.spacing) {
    if (s.source !== "inline-style") continue;
    if (s.valuePx < MIN_PX) continue;
    if (!isOnGrid(s.valuePx, spaceUnit)) {
      violations.push({
        file,
        line: s.line,
        rule: "spacing-scale",
        severity: "error",
        message: `${s.property}: ${s.raw} is not on the ${spaceUnit}px grid (${s.valuePx} % ${spaceUnit} = ${s.valuePx % spaceUnit})`,
        value: s.raw,
        expected: `Multiple of ${spaceUnit}px`,
      });
    }
  }

  return violations;
}
