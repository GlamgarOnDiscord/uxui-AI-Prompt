/**
 * Palette extractor.
 *
 * Strategy (ordered, first non-empty wins per role):
 *   1. Explicit tables with "role"/"element" + "color"/"value"/"hex" columns.
 *   2. Inline code spans containing Tailwind color classes, grouped by role keyword
 *      in the surrounding sentence ("background", "surface", "border", "accent"...).
 *
 * The parser stays close to the source: anything it can't confidently classify is
 * dropped into `palette.custom` rather than guessed into a canonical role.
 */
import type { RootContent } from "mdast";
import { toString as mdToString } from "mdast-util-to-string";
import {
  collectInlineCode,
  findTables,
  firstColor,
  tableToRecord,
  tailwindColorToken,
} from "./util.js";

type PaletteRole =
  | "background"
  | "foreground"
  | "surface"
  | "border"
  | "accent"
  | "muted";

const ROLE_KEYWORDS: Record<PaletteRole, RegExp> = {
  background: /\b(background|bg|backdrop|canvas)\b/i,
  foreground: /\b(foreground|heading|headings|text|body\s*text|copy)\b/i,
  surface: /\b(surface|card|panel|sheet|elevated)\b/i,
  border: /\b(border|divider|outline|rule)\b/i,
  accent: /\b(accent|primary|brand|cta|highlight)\b/i,
  muted: /\b(muted|subtle|secondary|label|caption)\b/i,
};

export interface ExtractedPalette {
  background?: string;
  foreground?: string;
  surface?: string;
  border?: string;
  accent?: string;
  muted?: string;
  custom: Record<string, string>;
}

function classifyRole(text: string): PaletteRole | null {
  for (const [role, re] of Object.entries(ROLE_KEYWORDS) as Array<[PaletteRole, RegExp]>) {
    if (re.test(text)) return role;
  }
  return null;
}

function extractFromTables(nodes: RootContent[]): Partial<ExtractedPalette> {
  const out: Partial<ExtractedPalette> = { custom: {} };

  for (const table of findTables(nodes)) {
    const rows = tableToRecord(table);
    for (const row of rows) {
      // Flexible column lookup.
      const label =
        row["element"] ?? row["role"] ?? row["name"] ?? row["token"] ?? row["usage"] ?? "";
      const valueRaw =
        row["classes"] ??
        row["class"] ??
        row["value"] ??
        row["color"] ??
        row["hex"] ??
        row["token"] ??
        "";

      if (!label || !valueRaw) continue;

      const color =
        firstColor(valueRaw) ??
        (tailwindColorToken(valueRaw) ? `tw:${tailwindColorToken(valueRaw)}` : null);
      if (!color) continue;

      const role = classifyRole(label);
      if (role && !out[role]) {
        out[role] = color;
      } else {
        out.custom ??= {};
        const key = label.toLowerCase().replace(/\s+/g, "_");
        out.custom[key] = color;
      }
    }
  }

  return out;
}

function extractFromInlineCode(nodes: RootContent[]): Partial<ExtractedPalette> {
  const out: Partial<ExtractedPalette> = { custom: {} };

  // Group inline code near the paragraph role-keyword.
  for (const node of nodes) {
    if (node.type !== "paragraph") continue;
    const text = mdToString(node);
    const role = classifyRole(text);
    if (!role || out[role]) continue;

    const codes = collectInlineCode([node]);
    for (const code of codes) {
      const tok = tailwindColorToken(code) ?? firstColor(code);
      if (tok) {
        out[role] = tailwindColorToken(code) ? `tw:${tok}` : tok;
        break;
      }
    }
  }

  return out;
}

export function extractPalette(nodes: RootContent[]): ExtractedPalette {
  const fromTables = extractFromTables(nodes);
  const fromInline = extractFromInlineCode(nodes);

  const merged: ExtractedPalette = {
    custom: { ...(fromTables.custom ?? {}), ...(fromInline.custom ?? {}) },
  };
  for (const role of ["background", "foreground", "surface", "border", "accent", "muted"] as const) {
    const value = fromTables[role] ?? fromInline[role];
    if (value !== undefined) merged[role] = value;
  }
  return merged;
}
