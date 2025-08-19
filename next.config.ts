import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
    ignoreBuildErrors: true,
  }, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be9y0zeofiyz6gpo.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org"
      }
    ],
  },
};

export default nextConfig;
