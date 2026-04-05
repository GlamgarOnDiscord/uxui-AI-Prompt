import { defineConfig } from "vitest/config";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      // Resolve workspace packages from source so no pre-build needed in dev.
      "@design-md/schema": resolve(__dirname, "../schema/src/index.ts"),
      "@design-md/parser": resolve(__dirname, "../parser/src/index.ts"),
    },
  },
  test: {
    include: ["test/**/*.test.ts"],
  },
});
