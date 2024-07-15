/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
