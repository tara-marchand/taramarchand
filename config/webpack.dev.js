/* eslint-env node */
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

const WebpackWatchRunPlugin = require('./WebpackWatchRunPlugin');

dotenv.config();

const babelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
};

module.exports = {
  context: path.resolve(process.cwd()),
  devtool: 'inline-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      'react-hot-loader/patch',
      './static/src/index.tsx'
    ]
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: ['/app/src', '/static/src'],
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader'
        }
      },
      {
        test: /\.ts(x?)$/,
        include: [path.resolve(process.cwd(), 'static/src')],
        use: [
          {
            loader: 'react-hot-loader/webpack'
          },
          {
            loader: 'babel-loader',
            options: babelOptions
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
              sourceMap: true
            }
          },
          'sass-loader',
          'resolve-url-loader'
        ]
      }
    ]
  },
  optimization: {
    removeAvailableModules: true
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(process.cwd(), 'static/dist'),
    publicPath: '/static/'
  },
  plugins: [
    new CopyPlugin([{ from: './static/src/images', to: 'images' }]),
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WebpackWatchRunPlugin(),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: 'worker.js'
    })
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
    modules: ['node_modules', 'static/src']
  },
  target: 'web',
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
