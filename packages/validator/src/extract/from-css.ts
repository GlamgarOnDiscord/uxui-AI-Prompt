/**
 * Extract design-relevant values from CSS/PostCSS source.
 *
 * Returns:
 *   - colors:      hex/rgb/hsl/oklch values keyed by their property context
 *   - spacingPx:   pixel values from padding/margin/gap/inset properties
 *   - fontFamilies: font-family declarations
 */
import postcss from "postcss";

export interface CssColorUsage {
  property: string;
  value: string;
  line: number;
}

export interface CssSpacingUsage {
  property: string;
  valuePx: number;
  raw: string;
  line: number;
}

export interface CssFontUsage {
  family: string;
  line: number;
}

export interface ExtractedCss {
  colors: CssColorUsage[];
  spacing: CssSpacingUsage[];
  fonts: CssFontUsage[];
}

// Regex patterns
const HEX_RE = /#([0-9a-fA-F]{3,8})\b/g;
const RGB_RE = /rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+/g;
const HSL_RE = /hsla?\(\s*[\d.]+/g;
const OKLCH_RE = /oklch\(\s*[\d.%]+/g;
const PX_VALUE_RE = /(\d+(?:\.\d+)?)px/g;
const SPACING_PROPS = new Set([
  "padding",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "margin",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "gap",
  "row-gap",
  "column-gap",
  "inset",
  "top",
  "right",
  "bottom",
  "left",
]);
const COLOR_PROPS = new Set([
  "color",
  "background",
  "background-color",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "outline-color",
  "fill",
  "stroke",
  "caret-color",
  "text-decoration-color",
]);

function extractColors(prop: string, value: string, line: number): CssColorUsage[] {
  const results: CssColorUsage[] = [];
  if (!COLOR_PROPS.has(prop.toLowerCase())) return results;

  const patterns = [HEX_RE, RGB_RE, HSL_RE, OKLCH_RE];
  for (const re of patterns) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(value)) !== null) {
      results.push({ property: prop, value: m[0], line });
    }
  }
  return results;
}

function extractSpacing(prop: string, value: string, line: number): CssSpacingUsage[] {
  const results: CssSpacingUsage[] = [];
  if (!SPACING_PROPS.has(prop.toLowerCase())) return results;

  PX_VALUE_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = PX_VALUE_RE.exec(value)) !== null) {
    const px = parseFloat(m[1] ?? "0");
    results.push({ property: prop, valuePx: px, raw: m[0], line });
  }
  return results;
}

/**
 * Parse the first font name from a font-family value.
 * Strips quotes, generic family names, and returns individual families.
 */
function parseFontFamilies(value: string): string[] {
  const GENERIC_FAMILIES = new Set([
    "serif",
    "sans-serif",
    "monospace",
    "cursive",
    "fantasy",
    "system-ui",
    "ui-serif",
    "ui-sans-serif",
    "ui-monospace",
    "ui-rounded",
    "inherit",
    "initial",
    "unset",
    "var",
  ]);

  return value
    .split(",")
    .map((f) => f.trim().replace(/^['"]|['"]$/g, ""))
    .filter((f) => f.length > 0 && !GENERIC_FAMILIES.has(f.toLowerCase()) && !f.startsWith("var("));
}

export function extractFromCss(source: string): ExtractedCss {
  const result: ExtractedCss = { colors: [], spacing: [], fonts: [] };

  let root: postcss.Root;
  try {
    root = postcss.parse(source);
  } catch {
    // Unparseable CSS — return empty
    return result;
  }

  root.walkDecls((decl) => {
    const line = decl.source?.start?.line ?? 0;
    const prop = decl.prop.toLowerCase();
    const value = decl.value;

    result.colors.push(...extractColors(prop, value, line));
    result.spacing.push(...extractSpacing(prop, value, line));

    if (prop === "font-family") {
      const families = parseFontFamilies(value);
      for (const family of families) {
        result.fonts.push({ family, line });
      }
    }
  });

  return result;
}
