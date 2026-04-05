/**
 * Lint orchestrator: find → parse → extract → check → report
 *
 * 1. Locate DESIGN.md in cwd (or fall back to defaults)
 * 2. Parse design tokens
 * 3. Glob target path for .tsx .jsx .ts .js .css files
 * 4. Extract tokens from each file
 * 5. Run rules against extracted tokens
 * 6. Return LintResult
 */
import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { glob } from "glob";
import { parseDesignMd } from "@design-md/parser";
import type { DesignTokensInput } from "@design-md/schema";
import { findDesignMd } from "./find-design-md.js";
import { extractFromCss } from "./extract/from-css.js";
import { extractFromTsx } from "./extract/from-tsx.js";
import {
  checkContrastRatioTsx,
  checkContrastRatioCss,
  checkSpacingScaleCss,
  checkSpacingScaleTsx,
  checkFontFamilyCss,
  checkFontFamilyTsx,
} from "./rules/index.js";
import type { LintViolation, LintResult } from "./types.js";
import chalk from "chalk";

// ── Default tokens when no DESIGN.md is found ─────────────────────────────────

const DEFAULT_WCAG_LEVEL: "AA" | "AAA" = "AA";
const DEFAULT_SPACE_UNIT = 4;
const DEFAULT_FONTS = { display: "Geist", body: "DM Sans", mono: "Geist Mono" };

// ── File globs ────────────────────────────────────────────────────────────────

const TSX_EXTS = new Set([".tsx", ".jsx", ".ts", ".js"]);
const CSS_EXTS = new Set([".css"]);

async function findFiles(targetPath: string): Promise<string[]> {
  const pattern = `${targetPath}/**/*.{tsx,jsx,ts,js,css}`;
  const files = await glob(pattern, { nodir: true, absolute: true });
  return files;
}

// ── Token accessors ───────────────────────────────────────────────────────────

function getWcagLevel(tokens: DesignTokensInput): "AA" | "AAA" {
  return tokens.accessibility?.wcagLevel ?? DEFAULT_WCAG_LEVEL;
}

function getSpaceUnit(tokens: DesignTokensInput): number {
  // Layout.spacing is an array of scale steps; we infer the unit from the first gap
  // Fallback: 4px standard
  return DEFAULT_SPACE_UNIT;
}

function getFontFamilies(
  tokens: DesignTokensInput,
): { display?: string; body?: string; mono?: string } {
  const ff = tokens.typography?.fontFamilies;
  if (!ff) return DEFAULT_FONTS;
  const result: { display?: string; body?: string; mono?: string } = {};
  if (ff.display !== undefined) result.display = ff.display;
  if (ff.body !== undefined) result.body = ff.body;
  if (ff.mono !== undefined) result.mono = ff.mono;
  return result;
}

// ── Per-file lint ─────────────────────────────────────────────────────────────

function lintFile(
  filePath: string,
  tokens: DesignTokensInput,
): LintViolation[] {
  const violations: LintViolation[] = [];
  const ext = extname(filePath).toLowerCase();

  let source: string;
  try {
    source = readFileSync(filePath, "utf8");
  } catch {
    return violations;
  }

  const wcagLevel = getWcagLevel(tokens);
  const spaceUnit = getSpaceUnit(tokens);
  const fontFamilies = getFontFamilies(tokens);

  if (CSS_EXTS.has(ext)) {
    const extracted = extractFromCss(source);
    violations.push(...checkContrastRatioCss(filePath, extracted, wcagLevel));
    violations.push(...checkSpacingScaleCss(filePath, extracted, spaceUnit));
    violations.push(...checkFontFamilyCss(filePath, extracted, fontFamilies));
  } else if (TSX_EXTS.has(ext)) {
    const extracted = extractFromTsx(source);
    violations.push(...checkContrastRatioTsx(filePath, extracted, wcagLevel));
    violations.push(...checkSpacingScaleTsx(filePath, extracted, spaceUnit));
    violations.push(...checkFontFamilyTsx(filePath, extracted, fontFamilies));
  }

  return violations;
}

// ── Main lint function ────────────────────────────────────────────────────────

export interface LintOptions {
  cwd?: string;
}

export async function lint(
  targetPath: string,
  opts: LintOptions = {},
): Promise<LintResult> {
  const cwd = opts.cwd ?? process.cwd();
  const resolvedTarget = resolve(cwd, targetPath);

  // 1. Find DESIGN.md
  const designMdPath = findDesignMd(cwd);
  let tokens: DesignTokensInput;

  if (designMdPath) {
    const source = readFileSync(designMdPath, "utf8");
    const { tokens: parsed } = parseDesignMd(source);
    tokens = parsed;
  } else {
    console.warn(
      chalk.yellow(
        "\n  ⚠  No DESIGN.md found — using uxui-designer default tokens (contrast: 4.5:1, spacing: 4px, fonts: Geist/DM Sans/Geist Mono)\n",
      ),
    );
    tokens = {
      meta: { name: "defaults", slug: "defaults", version: "0.1.0", license: "MIT" },
      typography: { fontFamilies: DEFAULT_FONTS, rules: [] },
      accessibility: { wcagLevel: DEFAULT_WCAG_LEVEL, focusVisible: true, reducedMotion: true },
    };
  }

  // 2. Find files
  const files = await findFiles(resolvedTarget);

  // 3. Lint each file
  const allViolations: LintViolation[] = [];
  for (const file of files) {
    allViolations.push(...lintFile(file, tokens));
  }

  // 4. Build result
  const errors = allViolations.filter((v) => v.severity === "error").length;
  const warnings = allViolations.filter((v) => v.severity === "warning").length;

  return {
    violations: allViolations,
    filesScanned: files.length,
    designMdPath,
    summary: { errors, warnings },
  };
}
