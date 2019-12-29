/* eslint-env node */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.js');

const prodConfig = {
  entry: { app: './static/src/index.tsx' },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: [path.resolve(process.cwd(), 'static/src')],
        use: [
          {
            loader: 'babel-loader',
            options: baseConfig.babelOptions
          },
          {
            loader: 'ts-loader'
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')(),
                require('precss')(),
                require('tailwindcss')('./config/tailwind.config.js'),
                require('autoprefixer')()
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: 'production'
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
};

module.exports = merge(baseConfig.config, prodConfig);
