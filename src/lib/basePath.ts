// Mirrors next.config.ts — needed because images.unoptimized (required for
// static export) makes next/image render local image src verbatim instead
// of automatically prefixing it with basePath.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
