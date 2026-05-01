import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async rewrites() {
    return [
      // Root serves the kami editorial portfolio (URL bar stays "/")
      { source: "/", destination: "/portfolio-ref/index.html" },
      // Direct /portfolio-ref entry points still work
      { source: "/portfolio-ref", destination: "/portfolio-ref/index.html" },
      { source: "/portfolio-ref/", destination: "/portfolio-ref/index.html" },
    ];
  },
};

export default nextConfig;
