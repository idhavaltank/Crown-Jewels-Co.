import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "ibb.co"], // Add allowed external image domains here
  },
};

export default nextConfig;
