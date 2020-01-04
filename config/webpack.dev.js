/* eslint-env node */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

const baseConfig = require('./webpack.base.js');

const WebpackWatchRunPlugin = require('./WebpackWatchRunPlugin');

const devConfig = {
  entry: {
    app: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './static/src/index.tsx'
    ]
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
              configFile: 'config/tsconfig.json',
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
                require('precss')(),
                require('tailwindcss')('./config/tailwind.config.js'),
                require('autoprefixer')()
              ],
              sourceMap: true,
              syntax: 'postcss-scss'
            }
          },
          'resolve-url-loader'
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
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      swDest: 'worker.js'
    })
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  },
  watchOptions: {
    ignored: [
      path.resolve(process.cwd(), './*'),
      path.resolve(process.cwd(), 'config'),
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), 'app/dist'),
      path.resolve(process.cwd(), 'static/dist')
    ]
  }
};

const finalConfig = merge(baseConfig.config, devConfig);

module.exports = finalConfig;
