/**
 * Typography extractor — font families + inline typography rules.
 *
 * Strategy:
 *   - Tables with "usage"/"font type"/"examples" columns → map to display/body/mono.
 *   - Bullet lists whose items start with "No <X>" or begin with an imperative verb → rules.
 */
import type { RootContent } from "mdast";
import { toString as mdToString } from "mdast-util-to-string";
import { findLists, findTables, listToStrings, tableToRecord } from "./util.js";

export interface ExtractedTypography {
  fontFamilies: {
    display?: string;
    body?: string;
    mono?: string;
  };
  rules: string[];
}

const USAGE_TO_KEY: Array<[RegExp, keyof ExtractedTypography["fontFamilies"]]> = [
  [/^(display|headings?|title|hero)/i, "display"],
  [/^(body|paragraph|text|copy)/i, "body"],
  [/^(mono|monospace|code|data)/i, "mono"],
];

/** Pick the first concrete font name from a comma- or slash-separated list. */
function firstFont(raw: string): string | undefined {
  if (!raw) return undefined;
  const cleaned = raw
    .replace(/[()]/g, "")
    .split(/[,/|•·]/)
    .map((s) => s.trim())
    .filter(Boolean);
  return cleaned[0];
}

export function extractTypography(nodes: RootContent[]): ExtractedTypography {
  const out: ExtractedTypography = { fontFamilies: {}, rules: [] };

  for (const table of findTables(nodes)) {
    const rows = tableToRecord(table);
    for (const row of rows) {
      const usage = row["usage"] ?? row["role"] ?? row["type"] ?? row["font type"] ?? "";
      const examples = row["examples"] ?? row["font"] ?? row["family"] ?? row["fonts"] ?? "";
      if (!usage || !examples) continue;

      for (const [re, key] of USAGE_TO_KEY) {
        if (re.test(usage) && !out.fontFamilies[key]) {
          const font = firstFont(examples);
          if (font) out.fontFamilies[key] = font;
          break;
        }
      }
    }
  }

  for (const list of findLists(nodes)) {
    for (const item of listToStrings(list)) {
      // Keep short rules only (actionable guidelines, not long paragraphs).
      if (item.length > 0 && item.length < 200) out.rules.push(item);
    }
  }

  // Also scan paragraphs for short "No X" / "Avoid X" rules.
  for (const node of nodes) {
    if (node.type !== "paragraph") continue;
    const text = mdToString(node).trim();
    if (/^(no|never|avoid|always|prefer)\b/i.test(text) && text.length < 200) {
      out.rules.push(text);
    }
  }

  return out;
}
