/**
 * Registry access helpers.
 *
 * Loads registry/index.json relative to the CLI package — works both from the
 * monorepo root (development) and from a published npm install (dist/).
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export interface BrandMeta {
  name: string;
  description: string;
  path: string;
  source?: string;
  license: string;
  author?: string;
  tags: string[];
}

export interface RegistryIndex {
  version: string;
  brands: Record<string, BrandMeta>;
}

function findRegistryRoot(startDir: string): string | null {
  // Walk up to find the registry/index.json
  let dir = startDir;
  for (let i = 0; i < 8; i++) {
    const candidate = join(dir, "registry", "index.json");
    if (existsSync(candidate)) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

let _root: string | null = null;

function getRoot(): string {
  if (_root) return _root;
  // In the monorepo the CLI package is at packages/cli/ — registry is at ../../registry/
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const candidate = join(__dirname, "..", "..", "..", "registry");
  if (existsSync(candidate)) {
    _root = resolve(join(__dirname, "..", "..", ".."));
    return _root;
  }
  // Published: registry ships alongside dist
  const sibling = join(__dirname, "..", "registry");
  if (existsSync(sibling)) {
    _root = resolve(join(__dirname, ".."));
    return _root;
  }
  // Fallback: walk up from cwd
  const found = findRegistryRoot(process.cwd());
  _root = found ?? process.cwd();
  return _root;
}

export function loadRegistry(): RegistryIndex {
  const indexPath = join(getRoot(), "registry", "index.json");
  if (!existsSync(indexPath)) {
    throw new Error(`Registry not found at ${indexPath}`);
  }
  return JSON.parse(readFileSync(indexPath, "utf8")) as RegistryIndex;
}

export function loadBrandDesignMd(slug: string): string {
  const registry = loadRegistry();
  const brand = registry.brands[slug];
  if (!brand) {
    throw new Error(
      `Brand "${slug}" not found. Run: design-md list`,
    );
  }
  const mdPath = join(getRoot(), "registry", brand.path);
  if (!existsSync(mdPath)) {
    throw new Error(
      `DESIGN.md for "${slug}" not found at ${mdPath}. ` +
        `Run: pnpm tsx scripts/sync-registry.ts to pull it.`,
    );
  }
  return readFileSync(mdPath, "utf8");
}
