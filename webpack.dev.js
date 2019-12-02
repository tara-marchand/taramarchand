/* eslint-env node */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.js');

const WebpackWatchRunPlugin = require('./WebpackWatchRunPlugin');

const devConfig = {
  entry: {
    vendor: ['webpack-hot-middleware/client', 'react-hot-loader/patch'],
    app: './static/src/index.tsx'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: [path.resolve(process.cwd(), 'static/src')],
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader',
            options: baseConfig.babelOptions
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true // HMR doesn't work without this
            }
          }
        ]
      },
      {
        test: /\.(css|scss|sass)/,
        include: [
          path.resolve(process.cwd(), 'static/src'),
          path.resolve(process.cwd(), 'node_modules')
        ],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')(),
                require('tailwindcss')(),
                // require('precss')(),
                require('autoprefixer')()
              ],
              syntax: 'postcss-scss'
            }
          }
          // 'resolve-url-loader'
        ]
      }
    ]
  },
  optimization: {
    removeAvailableModules: true
  },
  plugins: [
    new WebpackWatchRunPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: "'development'"
      }
    })
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },
  watchOptions: {
    ignored: [
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), 'app/dist'),
      path.resolve(process.cwd(), 'static/dist')
    ]
  }
};

const finalConfig = merge(baseConfig.config, devConfig);

module.exports = finalConfig;
