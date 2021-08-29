const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');
const fs = require('fs');
const { merge } = require('webpack-merge');
const nodeExternals = require('@newrelic/webpack-plugin/lib/externals');
const NewrelicWebpackPlugin = require('@newrelic/webpack-plugin/lib/NewrelicWebpackPlugin');

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(
    `isDev: ${isDev} -- isProd: ${isProd} -- isStaging: ${isStaging}`
  );

  const env = {
    NEW_RELIC_SNIPPET: fs
      .readFileSync('./src/utils/newRelicSnippet.ts')
      .toString(),
    COUNTER_SNIPPET: fs
      .readFileSync('./src/utils/counterSnippet.ts')
      .toString(),
    POSTHOG_SNIPPET: fs
      .readFileSync('./src/utils/postHogSnippet.ts')
      .toString(),
  };

  const experimental = {
    esmExternals: true,
  };

  const typescript = {
    ignoreBuildErrors: true,
  };

  const webpack = (
    config,
    { _buildId, dev, isServer, _defaultLoaders, _webpack }
  ) => {
    if (!dev && isServer) {
      return merge({}, config, {
        // Return the modified config
        externals: [nodeExternals()],
        plugins: [new NewrelicWebpackPlugin()],
      });
    }
    return config;
  };

  // next.config.js object
  return {
    env,
    experimental,
    typescript,
    webpack,
  };
};
