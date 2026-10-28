import type { NextConfig } from "next";

// GitHub Pages serves the site under /portfolio-site (set in the workflow).
// On a custom domain or Cloudflare Pages, leave NEXT_PUBLIC_BASE_PATH unset.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true }, // static export; images are pre-optimised by `npm run images`
  poweredByHeader: false,
};

export default nextConfig;
