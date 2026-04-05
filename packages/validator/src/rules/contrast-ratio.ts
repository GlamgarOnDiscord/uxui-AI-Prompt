/**
 * Rule: contrast-ratio
 *
 * Checks text/background color pairs extracted from JSX style props for
 * WCAG 2.1 contrast ratio requirements.
 *
 * - AA normal text: >= 4.5:1
 * - AA large text: >= 3:1
 * - AAA normal text: >= 7:1
 * - AAA large text: >= 4.5:1
 *
 * Luminance formula: WCAG 2.1 relative luminance (IEC 61966-2-1)
 */
import type { LintViolation } from "../types.js";
import type { ExtractedTsx } from "../extract/from-tsx.js";
import type { ExtractedCss } from "../extract/from-css.js";

// ── Color parsing ─────────────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] | null {
  const clean = hex.replace(/^#/, "");
  if (clean.length === 3) {
    const r = parseInt((clean[0] ?? "0") + (clean[0] ?? "0"), 16);
    const g = parseInt((clean[1] ?? "0") + (clean[1] ?? "0"), 16);
    const b = parseInt((clean[2] ?? "0") + (clean[2] ?? "0"), 16);
    return [r, g, b];
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return [r, g, b];
  }
  return null;
}

function parseRgb(value: string): [number, number, number] | null {
  const match = /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/.exec(value);
  if (!match) return null;
  return [parseFloat(match[1] ?? "0"), parseFloat(match[2] ?? "0"), parseFloat(match[3] ?? "0")];
}

function parseColor(value: string): [number, number, number] | null {
  if (value.startsWith("#")) return hexToRgb(value);
  if (/^rgba?\(/i.test(value)) return parseRgb(value);
  return null;
}

// ── WCAG luminance & contrast ─────────────────────────────────────────────────

/** WCAG 2.1 relative luminance of an sRGB channel [0-255] */
function channelLuminance(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** Relative luminance of an RGB triple. Returns value in [0, 1]. */
export function relativeLuminance(r: number, g: number, b: number): number {
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

/** WCAG 2.1 contrast ratio between two luminances. Always >= 1. */
export function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── WCAG thresholds ───────────────────────────────────────────────────────────

interface WcagThresholds {
  normal: number;
  large: number;
}

function getThresholds(wcagLevel: "AA" | "AAA"): WcagThresholds {
  if (wcagLevel === "AAA") return { normal: 7, large: 4.5 };
  return { normal: 4.5, large: 3 };
}

// ── Color pair types ──────────────────────────────────────────────────────────

interface ColorPair {
  textValue: string;
  bgValue: string;
  line: number;
}

function buildPairsFromTsx(extracted: ExtractedTsx): ColorPair[] {
  const LINE_WINDOW = 30;
  const colors = extracted.colors.filter((c) => c.source === "inline-style");

  const textColors = colors.filter(
    (c) => c.property === "color" || c.property === "textDecorationColor",
  );
  const bgColors = colors.filter(
    (c) => c.property === "backgroundColor" || c.property === "background",
  );

  const pairs: ColorPair[] = [];
  for (const text of textColors) {
    const bg = bgColors.find((b) => Math.abs(b.line - text.line) <= LINE_WINDOW);
    if (bg) {
      pairs.push({ textValue: text.value, bgValue: bg.value, line: text.line });
    }
  }
  return pairs;
}

function buildPairsFromCss(extracted: ExtractedCss): ColorPair[] {
  const LINE_WINDOW = 15;
  const textColors = extracted.colors.filter(
    (c) => c.property === "color",
  );
  const bgColors = extracted.colors.filter(
    (c) => c.property === "background" || c.property === "background-color",
  );

  const pairs: ColorPair[] = [];
  for (const text of textColors) {
    const bg = bgColors.find((b) => Math.abs(b.line - text.line) <= LINE_WINDOW);
    if (bg) {
      pairs.push({ textValue: text.value, bgValue: bg.value, line: text.line });
    }
  }
  return pairs;
}

// ── Rule implementation ───────────────────────────────────────────────────────

function checkPairs(
  file: string,
  pairs: ColorPair[],
  wcagLevel: "AA" | "AAA",
): LintViolation[] {
  const violations: LintViolation[] = [];
  const thresholds = getThresholds(wcagLevel);

  for (const pair of pairs) {
    const textRgb = parseColor(pair.textValue);
    const bgRgb = parseColor(pair.bgValue);
    if (!textRgb || !bgRgb) continue;

    const textLum = relativeLuminance(...textRgb);
    const bgLum = relativeLuminance(...bgRgb);
    const ratio = contrastRatio(textLum, bgLum);

    // Default to normal text threshold (large text detection not possible without full layout)
    const required = thresholds.normal;

    if (ratio < required) {
      const aaResult = ratio >= 4.5 ? "AA pass" : "AA fail";
      const aaaResult = ratio >= 7 ? "AAA pass" : "AAA fail";

      violations.push({
        file,
        line: pair.line,
        rule: "contrast-ratio",
        severity: "error",
        message: `Text color ${pair.textValue} on bg ${pair.bgValue} has ratio ${ratio.toFixed(1)}:1 (${aaResult}, ${aaaResult})`,
        value: `${pair.textValue} / ${pair.bgValue}`,
        expected: `>= ${required}:1 (WCAG ${wcagLevel})`,
      });
    }
  }

  return violations;
}

export function checkContrastRatioTsx(
  file: string,
  extracted: ExtractedTsx,
  wcagLevel: "AA" | "AAA" = "AA",
): LintViolation[] {
  return checkPairs(file, buildPairsFromTsx(extracted), wcagLevel);
}

export function checkContrastRatioCss(
  file: string,
  extracted: ExtractedCss,
  wcagLevel: "AA" | "AAA" = "AA",
): LintViolation[] {
  return checkPairs(file, buildPairsFromCss(extracted), wcagLevel);
}
