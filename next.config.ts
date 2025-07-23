import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required for static export
  basePath: "/portfolio-site", // Set this to your repo name
  assetPrefix: "/portfolio-site", // Ensures correct paths for static files
};

export default nextConfig;
