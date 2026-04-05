/**
 * Project environment detection.
 *
 * Detects: framework (Next.js / Vite / Astro / …), Tailwind version,
 * package manager, and which AI agent directories are present.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm";
export type TailwindVersion = 3 | 4 | null;
export type Framework = "nextjs" | "vite" | "astro" | "remix" | "cra" | "unknown";

export interface ProjectEnv {
  root: string;
  framework: Framework;
  tailwindVersion: TailwindVersion;
  packageManager: PackageManager;
  hasClaudeSkills: boolean;  // .claude/skills/
  hasCursorRules: boolean;   // .cursor/rules/
  hasWindsurf: boolean;      // .windsurfrules
  srcDir: string | null;     // "src" | "app" | null
}

function readJson(path: string): Record<string, unknown> | null {
  try {
    return JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function detectFramework(root: string): Framework {
  const pkg = readJson(join(root, "package.json")) ?? {};
  const deps = {
    ...(pkg["dependencies"] as Record<string, string> | undefined ?? {}),
    ...(pkg["devDependencies"] as Record<string, string> | undefined ?? {}),
  };

  if ("next" in deps) return "nextjs";
  if ("astro" in deps) return "astro";
  if ("@remix-run/react" in deps) return "remix";
  if ("react-scripts" in deps) return "cra";
  if ("vite" in deps) return "vite";
  return "unknown";
}

function detectTailwind(root: string): TailwindVersion {
  const pkg = readJson(join(root, "package.json")) ?? {};
  const allDeps = {
    ...(pkg["dependencies"] as Record<string, string> | undefined ?? {}),
    ...(pkg["devDependencies"] as Record<string, string> | undefined ?? {}),
  };

  const twVersion = allDeps["tailwindcss"];
  if (!twVersion) return null;

  // v4 announces itself as "^4.x" or ">=4.x"
  if (/^[\^~>=]*4\./.test(String(twVersion))) return 4;
  return 3;
}

function detectPackageManager(root: string): PackageManager {
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "bun.lockb"))) return "bun";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  return "npm";
}

function detectSrcDir(root: string): string | null {
  if (existsSync(join(root, "src"))) return "src";
  if (existsSync(join(root, "app"))) return "app";
  return null;
}

export function detectProject(root: string = process.cwd()): ProjectEnv {
  return {
    root,
    framework: detectFramework(root),
    tailwindVersion: detectTailwind(root),
    packageManager: detectPackageManager(root),
    hasClaudeSkills: existsSync(join(root, ".claude", "skills")),
    hasCursorRules: existsSync(join(root, ".cursor", "rules")),
    hasWindsurf: existsSync(join(root, ".windsurfrules")),
    srcDir: detectSrcDir(root),
  };
}
