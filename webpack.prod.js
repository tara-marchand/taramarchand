/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname),
  entry: ['./static/src/index.tsx'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [['env', { modules: false }], 'react'],
              plugins: ['transform-class-properties']
            }
          }
        ]
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [['env', { modules: false }], 'react'],
              plugins: ['transform-class-properties']
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: { minimize: true }
          },
          {
            loader: 'postcss-loader'
          }
        ],
        include: [path.join(__dirname, 'static', 'src')],
        exclude: [path.join(__dirname, 'node_modules')]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { minimize: true }
          },
          { loader: 'postcss-loader' },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader?sourceMap' }
        ],
        include: [
          path.join(__dirname, 'static', 'src'),
          path.join(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {}
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'static', 'dist'),
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new MiniCssExtractPlugin({ filename: 'main.css' })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  target: 'web'
};
