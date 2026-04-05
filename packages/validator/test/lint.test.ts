/**
 * @design-md/validator — vitest test suite
 *
 * 6 minimum tests (2 per rule):
 *   - contrast-ratio: valid (no violations) + invalid (detects violations)
 *   - spacing-scale:  valid (no violations) + invalid (detects violations)
 *   - font-family:    valid (no violations) + invalid (detects violations)
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { describe, it, expect } from "vitest";
import { extractFromCss } from "../src/extract/from-css.js";
import { extractFromTsx } from "../src/extract/from-tsx.js";
import {
  checkContrastRatioTsx,
  checkContrastRatioCss,
  relativeLuminance,
  contrastRatio,
} from "../src/rules/contrast-ratio.js";
import { checkSpacingScaleCss, checkSpacingScaleTsx } from "../src/rules/spacing-scale.js";
import { checkFontFamilyCss, checkFontFamilyTsx } from "../src/rules/font-family.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = (name: string) => resolve(__dirname, "fixtures", name);

// ── Helper ────────────────────────────────────────────────────────────────────

function readFixture(name: string): string {
  return readFileSync(fixturePath(name), "utf8");
}

const ALLOWED_FONTS = { display: "Geist", body: "DM Sans", mono: "Geist Mono" };

// ─────────────────────────────────────────────────────────────────────────────
// WCAG luminance & contrast ratio math
// ─────────────────────────────────────────────────────────────────────────────

describe("WCAG luminance & contrast ratio", () => {
  it("computes luminance of black as 0", () => {
    expect(relativeLuminance(0, 0, 0)).toBe(0);
  });

  it("computes luminance of white as 1", () => {
    expect(relativeLuminance(255, 255, 255)).toBeCloseTo(1, 4);
  });

  it("returns 21:1 for black on white", () => {
    const blackLum = relativeLuminance(0, 0, 0);
    const whiteLum = relativeLuminance(255, 255, 255);
    expect(contrastRatio(whiteLum, blackLum)).toBeCloseTo(21, 0);
  });

  it("contrast ratio is symmetric", () => {
    const l1 = relativeLuminance(113, 113, 122); // #71717a zinc-500
    const l2 = relativeLuminance(39, 39, 42);   // #27272a zinc-800
    expect(contrastRatio(l1, l2)).toBeCloseTo(contrastRatio(l2, l1), 10);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Rule: contrast-ratio
// ─────────────────────────────────────────────────────────────────────────────

describe("contrast-ratio — TSX", () => {
  it("no violations on valid.tsx (high contrast #ffffff on #09090b)", () => {
    const source = readFixture("valid.tsx");
    const extracted = extractFromTsx(source);
    const violations = checkContrastRatioTsx("valid.tsx", extracted, "AA");
    expect(violations).toHaveLength(0);
  });

  it("detects low-contrast pair in invalid.tsx (#71717a on #27272a)", () => {
    const source = readFixture("invalid.tsx");
    const extracted = extractFromTsx(source);
    const violations = checkContrastRatioTsx("invalid.tsx", extracted, "AA");
    expect(violations.length).toBeGreaterThan(0);
    const v = violations[0];
    expect(v?.rule).toBe("contrast-ratio");
    expect(v?.severity).toBe("error");
    expect(v?.message).toMatch(/ratio/);
  });
});

describe("contrast-ratio — CSS", () => {
  it("no violations on CSS with only valid (no adjacent text+bg pairs)", () => {
    // A simple CSS file with only background — no text color paired nearby
    const source = `.hero { background-color: #09090b; }`;
    const extracted = extractFromCss(source);
    const violations = checkContrastRatioCss("test.css", extracted, "AA");
    expect(violations).toHaveLength(0);
  });

  it("detects low-contrast pair in invalid.css", () => {
    const source = readFixture("invalid.css");
    const extracted = extractFromCss(source);
    const violations = checkContrastRatioCss("invalid.css", extracted, "AA");
    expect(violations.length).toBeGreaterThan(0);
    expect(violations[0]?.rule).toBe("contrast-ratio");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Rule: spacing-scale
// ─────────────────────────────────────────────────────────────────────────────

describe("spacing-scale — CSS", () => {
  it("no violations for valid CSS spacing (all multiples of 4px)", () => {
    const source = `.ok { padding: 8px; margin: 16px; gap: 4px; }`;
    const extracted = extractFromCss(source);
    const violations = checkSpacingScaleCss("ok.css", extracted, 4);
    expect(violations).toHaveLength(0);
  });

  it("detects non-4px spacing in invalid.css (14px, 10px, 6px)", () => {
    const source = readFixture("invalid.css");
    const extracted = extractFromCss(source);
    const violations = checkSpacingScaleCss("invalid.css", extracted, 4);
    expect(violations.length).toBeGreaterThan(0);

    const offenders = violations.map((v) => v.value ?? "");
    expect(offenders).toContain("14px");
    expect(offenders).toContain("10px");
  });
});

describe("spacing-scale — TSX", () => {
  it("no violations on valid.tsx (all spacing is on the 4px grid)", () => {
    const source = readFixture("valid.tsx");
    const extracted = extractFromTsx(source);
    const violations = checkSpacingScaleTsx("valid.tsx", extracted, 4);
    expect(violations).toHaveLength(0);
  });

  it("detects non-4px inline style spacing in invalid.tsx (14px padding, 10px margin)", () => {
    const source = readFixture("invalid.tsx");
    const extracted = extractFromTsx(source);
    const violations = checkSpacingScaleTsx("invalid.tsx", extracted, 4);
    expect(violations.length).toBeGreaterThan(0);

    const offenders = violations.map((v) => v.value ?? "");
    expect(offenders).toContain("14px");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Rule: font-family
// ─────────────────────────────────────────────────────────────────────────────

describe("font-family — CSS", () => {
  it("no violations when using allowed fonts (Geist, DM Sans, Geist Mono)", () => {
    const source = `
      .heading { font-family: "Geist", sans-serif; }
      .body { font-family: "DM Sans", sans-serif; }
      .code { font-family: "Geist Mono", monospace; }
    `;
    const extracted = extractFromCss(source);
    const violations = checkFontFamilyCss("ok.css", extracted, ALLOWED_FONTS);
    expect(violations).toHaveLength(0);
  });

  it("detects unauthorized font (Roboto) in invalid.css", () => {
    const source = readFixture("invalid.css");
    const extracted = extractFromCss(source);
    const violations = checkFontFamilyCss("invalid.css", extracted, ALLOWED_FONTS);
    expect(violations.length).toBeGreaterThan(0);
    expect(violations[0]?.rule).toBe("font-family");
    expect(violations[0]?.value).toBe("Roboto");
  });
});

describe("font-family — TSX", () => {
  it("no violations on valid.tsx (Geist is in DESIGN.md fonts)", () => {
    const source = readFixture("valid.tsx");
    const extracted = extractFromTsx(source);
    const violations = checkFontFamilyTsx("valid.tsx", extracted, ALLOWED_FONTS);
    // "sans-serif" is a generic family and should be filtered out
    expect(violations).toHaveLength(0);
  });

  it("detects Inter font in invalid.tsx (not in DESIGN.md)", () => {
    const source = readFixture("invalid.tsx");
    const extracted = extractFromTsx(source);
    const violations = checkFontFamilyTsx("invalid.tsx", extracted, ALLOWED_FONTS);
    expect(violations.length).toBeGreaterThan(0);
    expect(violations[0]?.rule).toBe("font-family");
    expect(violations[0]?.value).toBe("Inter");
  });
});
