/**
 * @type {import('next').NextConfig}
 */
const fs = require('fs');

const nextConfig = {
  experimental: {
    esmExternals: true,
    forceSwcTransforms: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
