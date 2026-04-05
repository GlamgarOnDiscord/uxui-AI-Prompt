import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { DesignTokens } from "@design-md/schema";
import { parseDesignMd, parseDesignMdStrict } from "../src/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = resolve(
  __dirname,
  "../../../registry/brands/uxui-designer/DESIGN.md",
);
const source = readFileSync(fixturePath, "utf8");

describe("parseDesignMd — uxui-designer fixture", () => {
  it("extracts the H1 title as meta.name", () => {
    const { tokens } = parseDesignMd(source);
    expect(tokens.meta.name).toBe("uxui-designer");
    expect(tokens.meta.slug).toBe("uxui-designer");
  });

  it("matches the core canonical sections", () => {
    const { matchedSections } = parseDesignMd(source);
    expect(matchedSections).toContain("theme");
    expect(matchedSections).toContain("palette");
    expect(matchedSections).toContain("typography");
    expect(matchedSections).toContain("motion");
    expect(matchedSections).toContain("dials");
    expect(matchedSections).toContain("accessibility");
    expect(matchedSections).toContain("rules");
  });

  it("extracts palette roles from the classes table", () => {
    const { tokens } = parseDesignMd(source);
    expect(tokens.palette?.background).toBe("tw:zinc-950");
    expect(tokens.palette?.surface).toBe("tw:zinc-900/50");
    expect(tokens.palette?.border).toBe("tw:white/10");
    expect(tokens.palette?.foreground).toBeDefined();
    expect(tokens.palette?.accent).toBeDefined();
  });

  it("extracts font families by usage", () => {
    const { tokens } = parseDesignMd(source);
    expect(tokens.typography?.fontFamilies?.display).toBe("Geist");
    expect(tokens.typography?.fontFamilies?.body).toBe("DM Sans");
    expect(tokens.typography?.fontFamilies?.mono).toBe("Geist Mono");
  });

  it("captures do's, don'ts and anti-patterns", () => {
    const { tokens } = parseDesignMd(source);
    expect(tokens.rules?.donts?.length ?? 0).toBeGreaterThan(0);
    expect(tokens.rules?.antiPatterns?.length ?? 0).toBeGreaterThan(0);
  });

  it("passes strict zod validation", () => {
    const { tokens } = parseDesignMdStrict(source);
    const validated = DesignTokens.parse(tokens);
    expect(validated.meta.slug).toBe("uxui-designer");
    // Dial defaults are injected by the schema when absent from source.
    expect(validated.dials.design_variance).toBeGreaterThanOrEqual(1);
    expect(validated.dials.design_variance).toBeLessThanOrEqual(10);
  });
});
