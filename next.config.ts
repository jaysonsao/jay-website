import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/book",
        destination: "/book-reviews",
      },
      {
        source: "/book/:path*",
        destination: "/book-reviews/:path*",
      },
    ];
  },
  images: {
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
