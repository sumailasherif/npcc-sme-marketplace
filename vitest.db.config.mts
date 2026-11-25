import { defineConfig } from "vitest/config";

/** Database (RLS) tests. Need a local Supabase: see docs/testing.md. */
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    include: ["tests/db/**/*.test.ts"],
    environment: "node",
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
