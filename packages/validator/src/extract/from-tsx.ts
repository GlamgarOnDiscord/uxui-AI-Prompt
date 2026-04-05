/**
 * Extract design-relevant values from TSX/JSX/TS/JS source using @babel/parser.
 *
 * Extracts:
 *   - className strings => Tailwind color classes, spacing classes
 *   - inline style objects => color, backgroundColor, padding, margin, gap, fontFamily
 */
import { parse, type ParserPlugin } from "@babel/parser";
import _traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

// @babel/traverse ships as a CJS module with a default export wrapped in `.default`
const traverse = (_traverse as unknown as { default: typeof _traverse }).default ?? _traverse;

export interface TsxColorUsage {
  property: string;
  value: string;
  line: number;
  /** "inline-style" | "tailwind-class" */
  source: "inline-style" | "tailwind-class";
}

export interface TsxSpacingUsage {
  property: string;
  valuePx: number;
  raw: string;
  line: number;
  source: "inline-style" | "tailwind-class";
}

export interface TsxFontUsage {
  family: string;
  line: number;
  source: "inline-style" | "tailwind-class";
}

export interface ExtractedTsx {
  colors: TsxColorUsage[];
  spacing: TsxSpacingUsage[];
  fonts: TsxFontUsage[];
}

// ── Tailwind class patterns ───────────────────────────────────────────────────

/** Matches Tailwind text-color, bg-color, border-color classes */
const TW_COLOR_RE =
  /\b(text|bg|border|ring|outline|fill|stroke|from|via|to|decoration|caret|accent|shadow)-((?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black|inherit|current|transparent)(?:-\d+)?(?:\/\d+)?)\b/g;

/** Matches Tailwind spacing classes: p-4, px-8, m-auto, gap-6, etc. */
const TW_SPACING_RE =
  /\b(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y|inset|top|right|bottom|left)-(\d+(?:\.\d+)?)\b/g;

/** Tailwind font-family classes */
const TW_FONT_FAMILY_RE = /\bfont-(sans|serif|mono)\b/g;

/** Tailwind base spacing unit in px (1 unit = 4px) */
const TW_SPACING_UNIT = 4;

// ── Inline style property sets ────────────────────────────────────────────────

const INLINE_COLOR_PROPS = new Set([
  "color",
  "backgroundColor",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "outlineColor",
  "fill",
  "stroke",
  "caretColor",
  "textDecorationColor",
]);

const INLINE_SPACING_PROPS = new Set([
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "gap",
  "rowGap",
  "columnGap",
  "inset",
  "top",
  "right",
  "bottom",
  "left",
]);

// ── Regex helpers ─────────────────────────────────────────────────────────────

const HEX_RE = /#([0-9a-fA-F]{3,8})\b/;
const PX_RE = /^(\d+(?:\.\d+)?)px$/;

function extractHexOrColorValue(value: string): string | null {
  const hexMatch = HEX_RE.exec(value);
  if (hexMatch) return hexMatch[0];
  if (/^rgba?\(/.test(value) || /^hsla?\(/.test(value) || /^oklch\(/.test(value)) {
    return value;
  }
  return null;
}

function extractPxValue(value: string): number | null {
  const m = PX_RE.exec(value.trim());
  if (m) return parseFloat(m[1] ?? "0");
  return null;
}

// ── Tailwind class extractor ──────────────────────────────────────────────────

function extractFromClassName(className: string, line: number, result: ExtractedTsx): void {
  // Colors
  TW_COLOR_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TW_COLOR_RE.exec(className)) !== null) {
    result.colors.push({
      property: m[1] ?? "",
      value: `tw:${m[0]}`,
      line,
      source: "tailwind-class",
    });
  }

  // Spacing (convert Tailwind units to px)
  TW_SPACING_RE.lastIndex = 0;
  while ((m = TW_SPACING_RE.exec(className)) !== null) {
    const units = parseFloat(m[2] ?? "0");
    const px = units * TW_SPACING_UNIT;
    result.spacing.push({
      property: m[1] ?? "",
      valuePx: px,
      raw: m[0],
      line,
      source: "tailwind-class",
    });
  }

  // Font family classes
  TW_FONT_FAMILY_RE.lastIndex = 0;
  while ((m = TW_FONT_FAMILY_RE.exec(className)) !== null) {
    result.fonts.push({
      family: `tw:font-${m[1]}`,
      line,
      source: "tailwind-class",
    });
  }
}

// ── Inline style extractor ────────────────────────────────────────────────────

function processStyleObject(
  objectExpression: t.ObjectExpression,
  line: number,
  result: ExtractedTsx,
): void {
  for (const prop of objectExpression.properties) {
    if (!t.isObjectProperty(prop)) continue;
    const key = t.isIdentifier(prop.key)
      ? prop.key.name
      : t.isStringLiteral(prop.key)
      ? prop.key.value
      : null;
    if (!key) continue;

    const valueLine = prop.value.loc?.start?.line ?? line;

    if (t.isStringLiteral(prop.value) || t.isTemplateLiteral(prop.value)) {
      const rawValue = t.isStringLiteral(prop.value)
        ? prop.value.value
        : prop.value.quasis[0]?.value.cooked ?? "";

      if (INLINE_COLOR_PROPS.has(key)) {
        const colorValue = extractHexOrColorValue(rawValue);
        if (colorValue) {
          result.colors.push({ property: key, value: colorValue, line: valueLine, source: "inline-style" });
        }
      } else if (INLINE_SPACING_PROPS.has(key)) {
        const parts = rawValue.split(/\s+/);
        for (const part of parts) {
          const px = extractPxValue(part);
          if (px !== null) {
            result.spacing.push({ property: key, valuePx: px, raw: part, line: valueLine, source: "inline-style" });
          }
        }
      } else if (key === "fontFamily") {
        const families = rawValue
          .split(",")
          .map((f) => f.trim().replace(/^['"]|['"]$/g, ""))
          .filter((f) => f.length > 0);
        for (const family of families) {
          result.fonts.push({ family, line: valueLine, source: "inline-style" });
        }
      }
    }
  }
}

// ── Main extractor ────────────────────────────────────────────────────────────

export function extractFromTsx(source: string): ExtractedTsx {
  const result: ExtractedTsx = { colors: [], spacing: [], fonts: [] };

  let ast: t.File;
  try {
    const plugins: ParserPlugin[] = ["jsx", "typescript"];
    ast = parse(source, {
      sourceType: "module",
      plugins,
      errorRecovery: true,
    });
  } catch {
    return result;
  }

  traverse(ast, {
    JSXAttribute(path: NodePath<t.JSXAttribute>) {
      const nameNode = path.node.name;
      const attrName = t.isJSXIdentifier(nameNode)
        ? nameNode.name
        : t.isJSXNamespacedName(nameNode)
        ? `${nameNode.namespace.name}:${nameNode.name.name}`
        : "";

      const line = path.node.loc?.start?.line ?? 0;
      const value = path.node.value;

      if (attrName === "className") {
        if (t.isStringLiteral(value)) {
          extractFromClassName(value.value, line, result);
        } else if (
          t.isJSXExpressionContainer(value) &&
          t.isStringLiteral(value.expression)
        ) {
          extractFromClassName(value.expression.value, line, result);
        }
      }

      if (attrName === "style") {
        if (
          t.isJSXExpressionContainer(value) &&
          t.isObjectExpression(value.expression)
        ) {
          processStyleObject(value.expression, line, result);
        }
      }
    },
  });

  return result;
}
