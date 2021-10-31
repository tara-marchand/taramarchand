import { NextConfig } from 'next';

const fs = require('fs');
const { merge } = require('webpack-merge');
const nodeExternals = require('@newrelic/webpack-plugin/lib/externals');
const NewrelicWebpackPlugin = require('@newrelic/webpack-plugin/lib/NewrelicWebpackPlugin');

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

  return {
    env,
    experimental,
    swcMinify: true,
    typescript,
  };
};
