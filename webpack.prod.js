const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(process.cwd()),
  entry: { app: ['./client/src/index.tsx'] },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: ['/client/src'],
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: { loader: 'file-loader' },
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: { loader: 'url-loader' },
      },
      {
        test: /\.ts(x?)$/,
        include: [glob.sync(path.resolve(process.cwd(), 'client/src'))],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(process.cwd(), 'client/src'),
          path.resolve(process.cwd(), 'node_modules'),
        ],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  node: {
    fs: 'empty',
  },
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(process.cwd(), 'client/dist'),
    publicPath: '/client/',
  },
  performance: {
    hints: false,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './client/src/images', to: 'images' }],
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new webpack.EnvironmentPlugin(['AMPLITUDE_API_KEY', 'NODE_ENV']),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    modules: ['node_modules', 'client/src'],
  },
  target: 'web',
};