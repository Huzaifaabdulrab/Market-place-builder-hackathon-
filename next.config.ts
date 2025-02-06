import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.sanity.io'], // Add Sanity CDN domain here
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    turbo: false,   }

}

export default nextConfig;

