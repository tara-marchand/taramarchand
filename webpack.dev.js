/* eslint-env node */
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require(path.resolve(__dirname, 'webpack.base.js'));

const devConfig = {
  mode: 'development'
};

module.exports = merge(baseConfig.config, devConfig);
