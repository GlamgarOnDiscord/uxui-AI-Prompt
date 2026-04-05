/**
 * design-md init
 *
 * Interactive bootstrap:
 *  1. Detect / confirm project environment
 *  2. Pick a brand from the registry
 *  3. Run `add` with the chosen brand
 *  4. Print a getting-started checklist
 */
import chalk from "chalk";
import prompts from "prompts";
import { detectProject } from "../detect.js";
import { loadRegistry } from "../registry.js";
import { cmdAdd } from "./add.js";

export async function cmdInit(opts: { cwd?: string } = {}): Promise<void> {
  const cwd = opts.cwd ?? process.cwd();
  const env = detectProject(cwd);
  const registry = loadRegistry();

  console.log("");
  console.log(chalk.bold("  design-md init"));
  console.log(chalk.dim("  Bootstrap a brand design system in your project"));
  console.log("");

  // Show detected environment
  console.log(
    `  ${chalk.dim("Framework:")}     ${chalk.cyan(env.framework)}`,
  );
  console.log(
    `  ${chalk.dim("Tailwind:")}      ${chalk.cyan(env.tailwindVersion ? `v${env.tailwindVersion}` : "not detected")}`,
  );
  console.log(
    `  ${chalk.dim("Pkg manager:")}   ${chalk.cyan(env.packageManager)}`,
  );
  console.log(
    `  ${chalk.dim("Claude Code:")}   ${chalk.cyan(env.hasClaudeSkills ? "✔ .claude/skills/ found" : "not detected")}`,
  );
  console.log("");

  const brandChoices = Object.entries(registry.brands).map(([slug, b]) => ({
    title: slug,
    description: b.description,
    value: slug,
  }));

  const answers = await prompts([
    {
      type: "select",
      name: "brand",
      message: "Which brand design system?",
      choices: brandChoices,
    },
    {
      type: "confirm",
      name: "injectSkill",
      message: "Inject uxui-designer skill into .claude/skills/?",
      initial: env.hasClaudeSkills,
    },
  ]);

  if (!answers.brand) {
    console.log(chalk.dim("\n  Cancelled.\n"));
    return;
  }

  await cmdAdd(answers.brand as string, {
    cwd,
    skipSkill: !(answers.injectSkill as boolean),
  });

  // Getting-started checklist
  console.log(chalk.bold("  Getting started:"));
  console.log("");
  console.log(`  ${chalk.dim("□")} Open ${chalk.cyan(`design/${answers.brand as string}/DESIGN.md`)} to review tokens`);
  console.log(`  ${chalk.dim("□")} Import ${chalk.cyan(`design/${answers.brand as string}/globals.css`)} in your layout`);
  if (env.tailwindVersion === 3) {
    console.log(`  ${chalk.dim("□")} Merge ${chalk.cyan(`design/${answers.brand as string}/tailwind.config.js`)} into your Tailwind config`);
  }
  if (env.hasClaudeSkills && answers.injectSkill) {
    console.log(`  ${chalk.dim("□")} Ask Claude: ${chalk.cyan('"Build a landing page — use the uxui-designer skill"')}`);
  }
  console.log(`  ${chalk.dim("□")} Run ${chalk.cyan(`npx design-md lint ./src`)} to validate your UI against the design tokens`);
  console.log("");
}
