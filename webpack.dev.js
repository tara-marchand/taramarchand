const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

dotenv.config();

module.exports = {
  context: path.resolve(process.cwd()),
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?http://localhost:8080',
      './client/src/index.tsx',
    ],
  },
  mode: 'development',
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
        include: [path.resolve(process.cwd(), 'client/src')],
        use: [
          { loader: 'react-hot-loader/webpack' },
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
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
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
    removeAvailableModules: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          filename: 'vendors.js',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  output: {
    filename: 'main.js',
    path: path.resolve(process.cwd(), 'client/dist'),
    publicPath: '/client/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [{ from: './client/src/images', to: 'images' }],
    }),
    new webpack.EnvironmentPlugin(['AMPLITUDE_API_KEY', 'NODE_ENV']),
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    modules: ['node_modules', 'client/src'],
  },
  target: 'web',
  watchOptions: {
    ignored: [
      path.resolve(process.cwd(), '\\.next'),
      path.resolve(process.cwd(), '.*.js'),
      path.resolve(process.cwd(), '.*.json'),
      path.resolve(process.cwd(), 'build'),
      path.resolve(process.cwd(), 'client/dist'),
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), 'pages'),
      path.resolve(process.cwd(), 'Procfile.*'),
      path.resolve(process.cwd(), 'public'),
      path.resolve(process.cwd(), 'server'),
      path.resolve(process.cwd(), 'stats'),
    ],
  },
};
