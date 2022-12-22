/**
 * @type {import('next').NextConfig}
 */
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
