#!/usr/bin/env node
/**
 * design-md CLI — entry point
 *
 * Commands:
 *   design-md add <brand>   Copy DESIGN.md, generate tailwind.config.js + globals.css
 *   design-md list          List available brands in the registry
 *   design-md init          Interactive project bootstrap
 *   design-md lint [path]   Validate UI code against active DESIGN.md tokens (J7-8)
 *
 * Aliases:
 *   dmk <command>           Same as design-md, short form for power users
 */
import { Command } from "commander";
import chalk from "chalk";
import { cmdList } from "./commands/list.js";
import { cmdAdd } from "./commands/add.js";
import { cmdInit } from "./commands/init.js";

const program = new Command();

program
  .name("design-md")
  .description(
    chalk.bold("design-md-kit") +
      " — the execution layer for DESIGN.md\n" +
      chalk.dim("  Parses, scaffolds, and validates brand design systems in your project.\n") +
      chalk.dim("  Built by ") + chalk.cyan("Glamgar") + chalk.dim(" — github.com/GlamgarOnDiscord/uxui-AI-Prompt"),
  )
  .version("0.1.0");

// ── design-md list ────────────────────────────────────────────────────────────
program
  .command("list")
  .alias("ls")
  .description("List all available brands in the registry")
  .action(() => {
    cmdList();
  });

// ── design-md add <brand> ─────────────────────────────────────────────────────
program
  .command("add <brand>")
  .description("Copy a brand DESIGN.md and generate Tailwind config + CSS variables")
  .option("-f, --force", "Overwrite existing files", false)
  .option("--skip-skill", "Skip Claude Code skill injection", false)
  .option("--cwd <path>", "Working directory (defaults to cwd)")
  .action(async (brand: string, opts: { force: boolean; skipSkill: boolean; cwd?: string }) => {
    await cmdAdd(brand, {
      force: opts.force,
      skipSkill: opts.skipSkill,
      ...(opts.cwd !== undefined ? { cwd: opts.cwd } : {}),
    });
  });

// ── design-md init ────────────────────────────────────────────────────────────
program
  .command("init")
  .description("Interactive bootstrap — picks a brand and scaffolds the full design system")
  .option("--cwd <path>", "Working directory (defaults to cwd)")
  .action(async (opts: { cwd?: string }) => {
    await cmdInit(opts.cwd !== undefined ? { cwd: opts.cwd } : {});
  });

// ── design-md lint [path] ─────────────────────────────────────────────────────
program
  .command("lint [path]")
  .description("Validate UI source files against the active DESIGN.md tokens")
  .option("--cwd <path>", "Working directory (defaults to cwd)")
  .action(async (path: string | undefined, opts: { cwd?: string }) => {
    const { lint } = await import("@design-md/validator");
    const { reportToConsole } = await import("@design-md/validator");
    const result = await lint(path ?? "./src", opts.cwd !== undefined ? { cwd: opts.cwd } : {});
    reportToConsole(result);
    if (result.summary.errors > 0) process.exit(1);
  });

program.parse();
