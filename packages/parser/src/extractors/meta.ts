/**
 * Meta extractor — pulls the document title, and optional YAML-ish front matter
 * from an "About" / "Meta" section.
 *
 * Today we only look at section bodies; YAML frontmatter support comes in a
 * follow-up iteration (requires remark-frontmatter).
 */
import type { Heading, Root } from "mdast";
import { toString as mdToString } from "mdast-util-to-string";

export interface ExtractedMeta {
  name?: string;
  description?: string;
  inspirations: string[];
}

/** Pull an H1 title if present — slug inferred from it by the caller. */
export function extractTitle(tree: Root): string | null {
  for (const node of tree.children) {
    if (node.type === "heading" && (node as Heading).depth === 1) {
      return mdToString(node).trim();
    }
  }
  return null;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
