import type { NextConfig } from "next";

/**
 * The screens are plain HTML files in /public (designed one by one).
 * Next.js serves them as they are, and adds the backend under /api.
 */
const SCREENS = "auth|business|dashboard|index|map|preview|resell|onboarding";

const nextConfig: NextConfig = {
  turbopack: {
    // Keep Turbopack rooted here: a package-lock.json in a parent folder
    // otherwise makes Next warn and walk outside the repo.
    root: process.cwd(),
  },
  async rewrites() {
    return [
      // Buyers open straight on the app Home.
      { source: "/", destination: "/index.html" },
      // Short addresses: /map -> /map.html, /resell -> /resell.html …
      { source: `/:screen(${SCREENS})`, destination: "/:screen.html" },
    ];
  },
};

export default nextConfig;
