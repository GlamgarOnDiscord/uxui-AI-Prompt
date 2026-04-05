/**
 * Reporter — formats LintViolations to the console in an ESLint-inspired style.
 *
 * Example output:
 *   src/Button.tsx:23  error  contrast-ratio  Text color #a1a1aa on bg #09090b has ratio 5.2:1
 *   src/Button.tsx:45  error  spacing-scale   padding: 14px is not on the 4px grid
 *
 *   2 errors, 0 warnings
 */
import chalk from "chalk";
import type { LintViolation, LintResult } from "./types.js";

const RULE_WIDTH = 16;
const SEV_WIDTH = 7;

function padEnd(str: string, len: number): string {
  return str.length >= len ? str : str + " ".repeat(len - str.length);
}

function formatViolation(v: LintViolation): string {
  const loc = chalk.dim(`${v.file}:${v.line}`);
  const sev =
    v.severity === "error"
      ? chalk.red(padEnd(v.severity, SEV_WIDTH))
      : chalk.yellow(padEnd(v.severity, SEV_WIDTH));
  const rule = chalk.cyan(padEnd(v.rule, RULE_WIDTH));
  return `  ${loc}  ${sev}  ${rule}  ${v.message}`;
}

export function reportToConsole(result: LintResult): void {
  if (result.violations.length === 0) {
    console.log(chalk.green("\n  ✔  No violations found."));
    console.log(
      chalk.dim(`     ${result.filesScanned} file(s) scanned against `) +
        chalk.dim(result.designMdPath ?? "(default tokens)"),
    );
    console.log();
    return;
  }

  // Group by file
  const byFile = new Map<string, LintViolation[]>();
  for (const v of result.violations) {
    const list = byFile.get(v.file) ?? [];
    list.push(v);
    byFile.set(v.file, list);
  }

  console.log();
  for (const [, violations] of byFile) {
    for (const v of violations) {
      console.log(formatViolation(v));
    }
  }
  console.log();

  const { errors, warnings } = result.summary;
  const errPart = errors > 0 ? chalk.red(`${errors} error${errors === 1 ? "" : "s"}`) : `0 errors`;
  const warnPart =
    warnings > 0
      ? chalk.yellow(`${warnings} warning${warnings === 1 ? "" : "s"}`)
      : `0 warnings`;

  console.log(`  ${errPart}, ${warnPart}`);
  console.log(
    chalk.dim(
      `  ${result.filesScanned} file(s) scanned  ·  ${result.designMdPath ?? "default tokens"}`,
    ),
  );
  console.log();
}
