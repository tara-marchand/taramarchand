/* eslint-env node */
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const babelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    [
      'lodash',
      {
        id: ['lodash'],
      },
    ],
  ],
};

module.exports = {
  context: path.resolve(process.cwd()),
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
            options: babelOptions,
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.ts(x?)$/,
        include: [glob.sync(path.resolve(process.cwd(), 'static/src'))],
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'config/tsconfig.json',
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(css|scss|sass)$/,
        include: [
          path.resolve(process.cwd(), 'static/src'),
          path.resolve(process.cwd(), 'node_modules'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import')(),
                  require('precss')(),
                  require('tailwindcss')('./config/tailwind.config.js'),
                  require('autoprefixer')(),
                ],
              },
            },
          },
          'sass-loader',
          'resolve-url-loader',
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(process.cwd(), 'static/dist'),
    publicPath: '/static/',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './static/src/images', to: 'images' }],
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new webpack.EnvironmentPlugin(['AMPLITUDE_API_KEY', 'NODE_ENV']),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
    modules: ['node_modules', 'static/src'],
  },
  target: 'web',
};
