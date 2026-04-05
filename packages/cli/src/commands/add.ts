/**
 * design-md add <brand>
 *
 * 1. Loads brand DESIGN.md from registry
 * 2. Copies it to ./design/<brand>/DESIGN.md
 * 3. Parses tokens
 * 4. Generates tailwind.config.js (v3) or updates globals.css @theme (v4)
 * 5. Generates globals.css CSS custom properties
 * 6. Injects skill into .claude/skills/ if Claude Code is detected
 */
import { existsSync, mkdirSync, writeFileSync, copyFileSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import chalk from "chalk";
import { parseDesignMdStrict } from "@design-md/parser";
import { toCssVars, toTailwindV3 } from "@design-md/exporters";
import { detectProject } from "../detect.js";
import { loadBrandDesignMd, loadRegistry } from "../registry.js";

export interface AddOptions {
  cwd?: string;
  force?: boolean;
  skipSkill?: boolean;
}

export async function cmdAdd(brandSlug: string, opts: AddOptions = {}): Promise<void> {
  const cwd = opts.cwd ?? process.cwd();
  const env = detectProject(cwd);
  const registry = loadRegistry();
  const brand = registry.brands[brandSlug];

  if (!brand) {
    console.error(chalk.red(`✖  Brand "${brandSlug}" not found.`));
    console.error(chalk.dim(`   Run: design-md list`));
    process.exit(1);
  }

  console.log("");
  console.log(chalk.bold(`  Adding brand: ${chalk.cyan(brandSlug)}`));
  console.log(chalk.dim(`  ${brand.description}`));
  console.log("");

  // ── 1. Load & parse ────────────────────────────────────────────────────────
  let source: string;
  try {
    source = loadBrandDesignMd(brandSlug);
  } catch (e) {
    console.error(chalk.red(`✖  ${(e as Error).message}`));
    process.exit(1);
  }

  const { tokens } = parseDesignMdStrict(source, {
    slug: brandSlug,
    license: brand.license,
    ...(brand.source !== undefined ? { source: brand.source } : {}),
    ...(brand.author !== undefined ? { author: brand.author } : {}),
  });

  // ── 2. Copy DESIGN.md ─────────────────────────────────────────────────────
  const destDir = join(cwd, "design", brandSlug);
  const destMd = join(destDir, "DESIGN.md");
  ensureDir(destDir);

  if (existsSync(destMd) && !opts.force) {
    console.log(chalk.yellow(`  ~ DESIGN.md already exists at design/${brandSlug}/ — skipping (use --force to overwrite)`));
  } else {
    writeFileSync(destMd, source, "utf8");
    logStep("Wrote", `design/${brandSlug}/DESIGN.md`);
  }

  // ── 3. Generate tailwind.config.js (v3) ──────────────────────────────────
  if (env.tailwindVersion === 3 || env.tailwindVersion === null) {
    const configPath = join(destDir, "tailwind.config.js");
    writeFileSync(configPath, toTailwindV3(tokens), "utf8");
    logStep("Generated", `design/${brandSlug}/tailwind.config.js`);

    if (env.tailwindVersion === null) {
      console.log(
        chalk.dim(`  ! Tailwind not detected — generated config as reference`),
      );
    }
  } else {
    console.log(chalk.dim(`  ℹ  Tailwind v4 detected — @theme block goes in globals.css`));
  }

  // ── 4. Generate globals.css ───────────────────────────────────────────────
  const cssPath = join(destDir, "globals.css");
  writeFileSync(
    cssPath,
    toCssVars(tokens, env.tailwindVersion ?? 3),
    "utf8",
  );
  logStep("Generated", `design/${brandSlug}/globals.css`);

  // ── 5. Inject Claude Code skill ───────────────────────────────────────────
  if (!opts.skipSkill) {
    await injectClaudeSkill(cwd, env.hasClaudeSkills);
  }

  // ── 6. Summary ────────────────────────────────────────────────────────────
  console.log("");
  console.log(chalk.green("  ✔  Done!"));
  console.log("");
  console.log(chalk.bold("  Next steps:"));
  console.log(
    `    ${chalk.dim("1.")} Import the CSS vars in your app:`,
  );
  console.log(
    chalk.cyan(`       import "@/design/${brandSlug}/globals.css"`),
  );
  if (env.tailwindVersion === 3) {
    console.log(
      `    ${chalk.dim("2.")} Merge the generated Tailwind config:`,
    );
    console.log(
      chalk.cyan(`       # Merge design/${brandSlug}/tailwind.config.js → tailwind.config.js`),
    );
  }
  console.log("");
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function ensureDir(dir: string): void {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function logStep(verb: string, path: string): void {
  console.log(`  ${chalk.green("✔")}  ${chalk.bold(verb)} ${chalk.dim(path)}`);
}

/**
 * Copy the uxui-designer skill into .claude/skills/ if Claude Code is present.
 * Creates .claude/skills/ if it doesn't exist.
 */
async function injectClaudeSkill(cwd: string, skillsDirExists: boolean): Promise<void> {
  const skillsDir = join(cwd, ".claude", "skills");

  if (!skillsDirExists) {
    // No .claude/ at all — don't create without asking.
    console.log(
      chalk.dim(
        "  ℹ  No .claude/skills/ directory found — skipping skill injection.",
      ),
    );
    console.log(
      chalk.dim(
        "     To use the uxui-designer skill: cp -r <registry>/skills/uxui-designer .claude/skills/",
      ),
    );
    return;
  }

  const targetSkillDir = join(skillsDir, "uxui-designer");
  if (existsSync(targetSkillDir)) {
    console.log(
      chalk.dim("  ℹ  .claude/skills/uxui-designer already present — skipping"),
    );
    return;
  }

  // Locate the source skill directory.
  const { fileURLToPath } = await import("node:url");
  const { dirname: _dirname } = await import("node:path");
  const here = _dirname(fileURLToPath(import.meta.url));
  const skillSrc = join(here, "..", "..", "..", "..", "skills", "uxui-designer");

  if (!existsSync(skillSrc)) {
    console.log(chalk.dim("  ℹ  Skill source not found — skipping injection"));
    return;
  }

  copyDirRecursive(skillSrc, targetSkillDir);
  logStep("Injected", ".claude/skills/uxui-designer");
}

function copyDirRecursive(src: string, dest: string): void {
  ensureDir(dest);
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}
