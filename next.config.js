/**
 * @type {import('next').NextConfig}
 */
const fs = require('fs');

const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
