import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app so a stray lockfile in the parent
  // directory can't be mistaken for the project root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
