import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site to out/ (`next build`). No server runtime — the app
  // has no API routes, next/image, dynamic segments, or server actions, so it
  // exports cleanly. Serve out/ with any static host; `next start` won't serve this.
  output: "export",
};

export default nextConfig;
