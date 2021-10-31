const fs = require('fs');
const { merge } = require('webpack-merge');
const nodeExternals = require('@newrelic/webpack-plugin/lib/externals');
const NewrelicWebpackPlugin = require('@newrelic/webpack-plugin/lib/NewrelicWebpackPlugin');

module.exports = () => {
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
