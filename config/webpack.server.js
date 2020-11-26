/* eslint-env node */
const dotenv = require('dotenv');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const NewrelicWebpackPlugin = require('@newrelic/webpack-plugin/lib/NewrelicWebpackPlugin');

dotenv.config();

const fileName =
  process.env.NODE_ENV === 'production' ? 'index-prod.js' : 'index-dev.js';
const serverPath = `./app/src/${fileName}`;

module.exports = {
  entry: {
    index: serverPath,
  },
  experiments: {
    topLevelAwait: true,
  },
  externals: [nodeExternals()],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(process.cwd(), 'app/src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-modules-commonjs',
            ],
          },
        },
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: path.join(__dirname, '../app/dist'),
    publicPath: '/',
  },
  plugins: [
    new NewrelicWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  target: 'node',
};
