import chalk from "chalk";
import { loadRegistry } from "../registry.js";

export function cmdList(): void {
  const registry = loadRegistry();
  const brands = Object.values(registry.brands);

  console.log("");
  console.log(chalk.bold("Available brands") + chalk.dim(` (${brands.length})`));
  console.log("");

  for (const brand of brands) {
    const tags = brand.tags.map((t) => chalk.dim(`#${t}`)).join(" ");
    console.log(
      `  ${chalk.cyan(brand.name.padEnd(20))} ${chalk.white(brand.description)}`,
    );
    console.log(`  ${"".padEnd(20)} ${tags}`);
    console.log("");
  }

  console.log(
    chalk.dim(
      `  Usage: ${chalk.white("npx design-md add <brand>")}`,
    ),
  );
  console.log("");
}
