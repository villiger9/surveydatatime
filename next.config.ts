import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep a small rewrite for the missing asset so dev logs don't get flooded.
  async rewrites() {
    return [
      {
        source: "/left-bg.jpg",
        destination: "/left-bg.svg",
      },
    ];
  },
};

export default nextConfig;
