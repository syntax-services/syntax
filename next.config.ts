import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qbpoxakkalpcuawcdapd.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  eslint: {
    // ✅ This skips linting errors during builds on Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
 
