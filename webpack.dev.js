const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(process.cwd()),
  devtool: 'inline-source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?http://localhost:8080',
      './static/src/index.tsx',
    ],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: ['/static/src'],
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
        include: [path.resolve(process.cwd(), 'static/src')],
        use: [
          { loader: 'react-hot-loader/webpack' },
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true, // HMR doesn't work without this
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(process.cwd(), 'static/src'),
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
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(process.cwd(), 'static/dist'),
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [{ from: './static/src/images', to: 'images' }],
    }),
    new webpack.EnvironmentPlugin(['AMPLITUDE_API_KEY', 'NODE_ENV']),
  ],
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    modules: ['node_modules', 'static/src'],
  },
  target: 'web',
  watchOptions: {
    ignored: [
      path.resolve(process.cwd(), 'Procfile.*'),
      path.resolve(process.cwd(), '.*.js'),
      path.resolve(process.cwd(), '.*.json'),
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), 'app'),
      path.resolve(process.cwd(), 'static/dist'),
    ],
  },
};
