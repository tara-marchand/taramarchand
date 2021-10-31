import { NextConfig } from 'next';

const fs = require('fs');
const { merge } = require('webpack-merge');
const nodeExternals = require('@newrelic/webpack-plugin/lib/externals');
const NewrelicWebpackPlugin = require('@newrelic/webpack-plugin/lib/NewrelicWebpackPlugin');
const path = require('path');

export const getNextConfig = (): NextConfig => {
  const env = {
    NEW_RELIC_SNIPPET: fs
      .readFileSync(__dirname + '/utils/newRelicSnippet.js')
      .toString(),
    COUNTER_SNIPPET: fs
      .readFileSync(__dirname + '/utils/counterSnippet.js')
      .toString(),
    POSTHOG_SNIPPET: fs
      .readFileSync(__dirname + '/utils/postHogSnippet.js')
      .toString(),
  };

  const experimental = {
    esmExternals: true,
  };

  const typescript = {
    ignoreBuildErrors: true,
  };

  const webpack: NextConfig['webpack'] = (config, { dev, isServer }) => {
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
    swcMinify: true,
    typescript,
    // @ts-ignore
    // webpack,
  };
};
