/**
 * Rules extractor — splits a "Rules / Guidelines / Anti-Patterns" section into
 * do's, don'ts, and anti-patterns based on sub-headings and bullet prefixes.
 */
import type { RootContent } from "mdast";
import { toString as mdToString } from "mdast-util-to-string";
import { findLists, listToStrings } from "./util.js";

export interface ExtractedRules {
  dos: string[];
  donts: string[];
  antiPatterns: string[];
}

const DONT_PREFIX = /^(no|never|avoid|don'?t|ban(?:ned)?|ne\s)\b/i;
const DO_PREFIX = /^(always|prefer|use|pick|do\b|choose)/i;

export function extractRules(nodes: RootContent[]): ExtractedRules {
  const out: ExtractedRules = { dos: [], donts: [], antiPatterns: [] };
  let bucket: keyof ExtractedRules | null = null;

  for (const node of nodes) {
    if (node.type === "heading") {
      const text = mdToString(node).toLowerCase();
      if (/anti.?pattern/.test(text)) bucket = "antiPatterns";
      else if (/don'?t|❌|ban|avoid/.test(text)) bucket = "donts";
      else if (/do'?s|✅|prefer|good/.test(text)) bucket = "dos";
      else bucket = null;
      continue;
    }

    if (node.type === "list") {
      const items = listToStrings(node);
      for (const item of items) {
        if (bucket) {
          out[bucket].push(item);
        } else if (DONT_PREFIX.test(item)) {
          out.donts.push(item);
        } else if (DO_PREFIX.test(item)) {
          out.dos.push(item);
        }
      }
    }
  }

  // Fallback pass: if we never found sub-heading buckets, mine all lists.
  if (out.dos.length === 0 && out.donts.length === 0 && out.antiPatterns.length === 0) {
    for (const list of findLists(nodes)) {
      for (const item of listToStrings(list)) {
        if (DONT_PREFIX.test(item)) out.donts.push(item);
        else if (DO_PREFIX.test(item)) out.dos.push(item);
      }
    }
  }

  return out;
}
