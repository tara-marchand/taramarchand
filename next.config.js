/**
 * @type {import('next').NextConfig}
 */
const fs = require('fs');

const nextConfig = {
  env: {
    NEW_RELIC_SNIPPET: fs
      .readFileSync(__dirname + '/server/utils/newRelicSnippet.js')
      .toString(),
    COUNTER_SNIPPET: fs
      .readFileSync(__dirname + '/server/utils/counterSnippet.js')
      .toString(),
    POSTHOG_SNIPPET: fs
      .readFileSync(__dirname + '/server/utils/postHogSnippet.js')
      .toString(),
  },
  experimental: {
    esmExternals: true,
  },
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
