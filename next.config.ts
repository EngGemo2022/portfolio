import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "",
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
