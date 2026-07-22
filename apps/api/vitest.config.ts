import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    hookTimeout: 180000,
    include: ["src/**/*.test.ts"],
    testTimeout: 180000
  },
  resolve: {
    alias: {
      "@icraftads/config": new URL("../../packages/config/src/index.ts", import.meta.url).pathname,
      "@icraftads/types": new URL("../../packages/types/src/index.ts", import.meta.url).pathname,
      "@icraftads/validation": new URL("../../packages/validation/src/index.ts", import.meta.url)
        .pathname
    }
  }
});
