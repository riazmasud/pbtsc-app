import type { NextConfig } from "next";

// NEXT_PUBLIC_ prefix is required so client components can read the same
// value at runtime (e.g. to manually prefix <Image> src, since
// images.unoptimized bypasses next/image's automatic basePath handling).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  // TODO Phase 3: Add next-pwa for service worker + push notifications
};

export default nextConfig;
