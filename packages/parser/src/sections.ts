/**
 * Section splitter — walks the mdast tree, groups nodes under top-level (H1/H2)
 * headings, and normalizes heading text to canonical section slugs.
 *
 * DESIGN.md dialects vary in heading casing ("Palette couleurs" vs "Palette"
 * vs "Color Palette"). This module owns heading → SectionName mapping.
 */
import type { Heading, Root, RootContent } from "mdast";
import { toString as mdToString } from "mdast-util-to-string";
import type { SectionName } from "@design-md/schema";

export interface Section {
  name: SectionName;
  heading: string;
  depth: number;
  /** Top-level children between this heading and the next heading at same-or-shallower depth. */
  nodes: RootContent[];
}

/** Map loose heading text → canonical section slug. Order matters (first match wins). */
const HEADING_ALIASES: Array<[RegExp, SectionName]> = [
  [/^(meta|metadata|about|overview)$/i, "meta"],
  [/^(theme|aesthetic|mood|style)$/i, "theme"],
  [/^(palette|colou?rs?|colou?r\s+palette|colou?r\s+system)$/i, "palette"],
  [/^(typography|fonts?|typeface)$/i, "typography"],
  [/^(layout|spacing|grid|structure)$/i, "layout"],
  [/^(elevation|shadows?|depth|borders?)$/i, "elevation"],
  [/^(motion|animations?|transitions?)$/i, "motion"],
  [/^(dials?|design\s+dials?|intensity)$/i, "dials"],
  [/^(components?|ui\s+components?|primitives?)$/i, "components"],
  [/^(responsive|breakpoints?|viewports?)$/i, "responsive"],
  [/^(accessibility|a11y|wcag)$/i, "accessibility"],
  [/^(rules|guidelines|do.?s.*don.?ts|anti.?patterns?)$/i, "rules"],
  [/^(prompts?|ai\s+prompts?)$/i, "prompts"],
];

export function classifyHeading(text: string): SectionName | null {
  const trimmed = text.trim();
  for (const [re, name] of HEADING_ALIASES) {
    if (re.test(trimmed)) return name;
  }
  return null;
}

/**
 * Split an mdast Root into canonical sections.
 * Uses H1 and H2 as section boundaries. H3+ stay nested inside their parent section.
 */
export function splitSections(tree: Root): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const node of tree.children) {
    if (node.type === "heading" && (node as Heading).depth <= 2) {
      const heading = node as Heading;
      const text = mdToString(heading);
      const name = classifyHeading(text);

      if (name) {
        if (current) sections.push(current);
        current = { name, heading: text, depth: heading.depth, nodes: [] };
        continue;
      }
    }

    if (current) current.nodes.push(node);
  }

  if (current) sections.push(current);
  return sections;
}
