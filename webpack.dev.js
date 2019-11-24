/* eslint-env node */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require(path.resolve(__dirname, 'webpack.base.js'));

const devConfig = {
  entry: [
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    './static/src/index.tsx'
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: [path.resolve(__dirname, 'static/src')],
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
          path.resolve(__dirname, 'static/src'),
          path.resolve(__dirname, 'node_modules')
        ],
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },
  watchOptions: {
    ignored: ['./*.js', 'app', 'node_modules']
  }
};

const finalConfig = merge(baseConfig.config, devConfig);

module.exports = finalConfig;
