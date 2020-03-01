/* eslint-env node */
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
  entry: { app: ['./static/src/index.tsx'] },
  mode: 'production',
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
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'config/tsconfig.json',
              transpileOnly: true
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
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
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
    minimizer: [
      new TerserPlugin({
        cache: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(process.cwd(), 'static/dist'),
    publicPath: '/static/'
  },
  plugins: [
    new CopyPlugin([{ from: './static/src/images', to: 'images' }]),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      swDest: 'worker.js'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
    modules: ['node_modules', 'static/src']
  },
  target: 'web'
};
