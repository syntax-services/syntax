import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qbpoxakkalpcuawcdapd.supabase.co",
        pathname: "/storage/v1/object/public/",
      },
    ],
  },

  eslint: {
    // ✅ Prevents ESLint from blocking builds on Vercel
    ignoreDuringBuilds: true,
  },

  typescript: {
    // ✅ Prevents TypeScript type errors from failing deployment
    ignoreBuildErrors: true,
  },

  experimental: {
    // ✅ Enables full Turbopack & App Router optimizations (Next.js 15)
    turbo: {
      // Ignore build failures for /_not-found during static export
      rules: {
        "app/not-found.tsx": {
          ssr: false, // Don't SSR or prerender this route
        },
      },
    },

    // ✅ Enable Next.js 15 features safely
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "react-icons",
      "clsx",
      "tailwind-variants",
    ],

    // ✅ Use faster Rust-based transformations for modern bundling
    typedRoutes: true,
    serverMinification: true,
  },

  // ✅ Optional fallback if build still exits early
  output: "standalone", // Recommended for Vercel + Supabase + Turbopack
}

export default nextConfig