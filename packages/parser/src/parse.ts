/**
 * Top-level parser: DESIGN.md source → canonical DesignTokens (partial).
 *
 * The parser is deliberately lenient — it never throws on unknown sections and
 * never fabricates values. Missing fields stay missing; callers run zod validation
 * themselves when they need strictness.
 */
import type { Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import {
  DesignTokens,
  type DesignTokensInput,
} from "@design-md/schema";
import { extractTitle, slugify } from "./extractors/meta.js";
import { extractPalette } from "./extractors/palette.js";
import { extractRules } from "./extractors/rules.js";
import { extractTypography } from "./extractors/typography.js";
import { splitSections } from "./sections.js";

export interface ParseOptions {
  /** Override the detected slug (defaults to slugified H1 title, else "unnamed"). */
  slug?: string;
  /** URL to credit as upstream source. Copied to `meta.source`. */
  source?: string;
  /** Author/owner string — copied to `meta.author`. */
  author?: string;
  /** License string — defaults to "MIT". */
  license?: string;
}

export interface ParseResult {
  tokens: DesignTokensInput;
  /** Sections we matched by name. Useful for diagnostics / coverage reports. */
  matchedSections: string[];
  /** Sections we couldn't classify (raw heading text). */
  unknownHeadings: string[];
}

function parseToMdast(source: string): Root {
  return unified().use(remarkParse).use(remarkGfm).parse(source) as Root;
}

export function parseDesignMd(source: string, opts: ParseOptions = {}): ParseResult {
  const tree = parseToMdast(source);
  const sections = splitSections(tree);

  const title = extractTitle(tree);
  const slug = opts.slug ?? (title ? slugify(title) : "unnamed");

  const tokens: DesignTokensInput = {
    meta: {
      name: title ?? slug,
      slug,
      version: "0.1.0",
      license: opts.license ?? "MIT",
      ...(opts.source !== undefined ? { source: opts.source } : {}),
      ...(opts.author !== undefined ? { author: opts.author } : {}),
    },
  };

  const matched: string[] = [];

  for (const section of sections) {
    matched.push(section.name);
    switch (section.name) {
      case "palette": {
        const p = extractPalette(section.nodes);
        tokens.palette = {
          ...(p.background !== undefined ? { background: p.background } : {}),
          ...(p.foreground !== undefined ? { foreground: p.foreground } : {}),
          ...(p.surface !== undefined ? { surface: p.surface } : {}),
          ...(p.border !== undefined ? { border: p.border } : {}),
          ...(p.accent !== undefined ? { accent: p.accent } : {}),
          ...(p.muted !== undefined ? { muted: p.muted } : {}),
          ...(Object.keys(p.custom).length > 0 ? { custom: p.custom } : {}),
        };
        break;
      }
      case "typography": {
        const t = extractTypography(section.nodes);
        tokens.typography = {
          ...(Object.keys(t.fontFamilies).length > 0
            ? { fontFamilies: t.fontFamilies }
            : {}),
          rules: t.rules,
        };
        break;
      }
      case "rules": {
        tokens.rules = extractRules(section.nodes);
        break;
      }
      // theme, layout, elevation, motion, dials, components, responsive,
      // accessibility, prompts — extractors land in subsequent iterations.
      default:
        break;
    }
  }

  // Gather unclassified top-level headings for diagnostics.
  const unknownHeadings: string[] = [];
  for (const node of tree.children) {
    if (node.type === "heading" && node.depth <= 2) {
      const text = (node.children ?? [])
        .map((c: unknown) => (c as { value?: string }).value ?? "")
        .join("")
        .trim();
      if (text && !matched.includes(text.toLowerCase() as never)) {
        if (!sections.some((s) => s.heading === text)) unknownHeadings.push(text);
      }
    }
  }

  return { tokens, matchedSections: matched, unknownHeadings };
}

/** Parse + zod-validate in one call. Throws on invalid output. */
export function parseDesignMdStrict(source: string, opts: ParseOptions = {}) {
  const { tokens, matchedSections, unknownHeadings } = parseDesignMd(source, opts);
  const validated = DesignTokens.parse(tokens);
  return { tokens: validated, matchedSections, unknownHeadings };
}
