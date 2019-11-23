/* eslint-env node */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require(path.resolve(__dirname, 'webpack.base.js'));

const prodConfig = {
  entry: ['./static/src/index.tsx'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: [path.resolve(__dirname, 'static/src')],
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
          path.resolve(__dirname, 'static/src'),
          path.resolve(__dirname, 'node_modules')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => [
                require('precss'),
                require('postcss-import'),
                require('tailwindcss-typography'),
                require('autoprefixer')
              ]
            }
          },
          'resolve-url-loader'
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
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
};

module.exports = merge(baseConfig.config, prodConfig);
