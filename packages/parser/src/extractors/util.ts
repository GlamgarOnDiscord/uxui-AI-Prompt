/**
 * Shared mdast → data helpers for extractors.
 */
import type { Code, InlineCode, List, RootContent, Table, TableRow } from "mdast";
import { toString as mdToString } from "mdast-util-to-string";

/** Extract all top-level tables from a list of nodes. */
export function findTables(nodes: RootContent[]): Table[] {
  return nodes.filter((n): n is Table => n.type === "table");
}

/** Extract all top-level lists (ul/ol) from a list of nodes. */
export function findLists(nodes: RootContent[]): List[] {
  return nodes.filter((n): n is List => n.type === "list");
}

/** Extract all fenced code blocks from a list of nodes. */
export function findCodeBlocks(nodes: RootContent[]): Code[] {
  return nodes.filter((n): n is Code => n.type === "code");
}

/** Convert a mdast Table to a record of rows, keyed by the first column. */
export function tableToRecord(table: Table): Array<Record<string, string>> {
  if (table.children.length < 2) return [];
  const [headerRow, ...bodyRows] = table.children as [TableRow, ...TableRow[]];
  const headers = headerRow.children.map((c) => mdToString(c).trim().toLowerCase());
  return bodyRows.map((row) => {
    const rec: Record<string, string> = {};
    row.children.forEach((cell, i) => {
      const key = headers[i] ?? `col_${i}`;
      rec[key] = mdToString(cell).trim();
    });
    return rec;
  });
}

/** Flatten list items to plain strings (strips inline markdown). */
export function listToStrings(list: List): string[] {
  return list.children.map((item) => mdToString(item).trim()).filter(Boolean);
}

/**
 * Collect all inline code spans in a node subtree. Useful for extracting
 * Tailwind classes mentioned inline (e.g. `bg-zinc-950`).
 */
export function collectInlineCode(nodes: RootContent[]): string[] {
  const results: string[] = [];
  const walk = (n: unknown): void => {
    if (!n || typeof n !== "object") return;
    const node = n as { type?: string; value?: string; children?: unknown[] };
    if (node.type === "inlineCode" && typeof node.value === "string") {
      results.push(node.value);
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  nodes.forEach(walk);
  return results;
}

/**
 * Attempt to find a hex/rgb/hsl color string inside a text blob.
 * Returns the first match or null.
 */
export function firstColor(text: string): string | null {
  const hex = text.match(/#[0-9a-fA-F]{3,8}\b/);
  if (hex) return hex[0];
  const fn = text.match(/\b(?:rgb|rgba|hsl|hsla|oklch|oklab)\([^)]+\)/);
  if (fn) return fn[0];
  return null;
}

/**
 * Extract Tailwind color token like `zinc-950` from `bg-zinc-950` / `text-zinc-400`.
 * Returns null when no Tailwind color class is present.
 */
export function tailwindColorToken(text: string): string | null {
  // Prefixed form: bg-zinc-950, border-white/10, text-white, bg-zinc-900/50
  const prefixed = text.match(
    /\b(?:bg|text|border|ring|from|to|via|fill|stroke)-([a-z]+(?:-\d{2,3})?(?:\/\d+)?)\b/,
  );
  if (prefixed) return prefixed[1] ?? null;

  // Bare token form: emerald-500, zinc-950/50, white — no utility prefix.
  // Must look like <color-name>[-<scale>][/<opacity>].
  const bare = text.trim().match(
    /^([a-z]+(?:-\d{2,3})?(?:\/\d+)?)$/,
  );
  return bare ? (bare[1] ?? null) : null;
}
