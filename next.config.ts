import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Finds the language setup in src/i18n/request.ts.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Cache Components is off for the MVP: almost every page reads the
  // session or language cookie, so we render per request. See docs/decisions.md.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
