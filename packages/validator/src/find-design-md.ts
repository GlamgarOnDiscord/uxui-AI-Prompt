/**
 * Locate the active DESIGN.md for a given project root.
 *
 * Search order (mirrors the uxui-designer skill convention):
 *   1. ./design/<brand>/DESIGN.md  — first match under ./design/
 *   2. ./DESIGN.md                 — root-level fallback
 *
 * Returns the absolute path to the first DESIGN.md found, or null.
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

export function findDesignMd(cwd: string): string | null {
  // 1. Look under ./design/<brand>/DESIGN.md
  const designDir = join(cwd, "design");
  if (existsSync(designDir) && statSync(designDir).isDirectory()) {
    for (const entry of readdirSync(designDir)) {
      const candidate = join(designDir, entry, "DESIGN.md");
      if (existsSync(candidate) && statSync(candidate).isFile()) {
        return candidate;
      }
    }
  }

  // 2. Root-level DESIGN.md
  const rootCandidate = join(cwd, "DESIGN.md");
  if (existsSync(rootCandidate) && statSync(rootCandidate).isFile()) {
    return rootCandidate;
  }

  return null;
}
