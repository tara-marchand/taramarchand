/* eslint-env node */
const dotenv = require('dotenv');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

dotenv.config();

const fileName = process.env.NODE_ENV === 'production' ? 'index.js' : 'main.js';
const serverPath = './app/src/' + fileName;

module.exports = {
  entry: {
    index: serverPath
  },
  externals: [nodeExternals()],
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-modules-commonjs'
            ]
          }
        }
      }
    ]
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: path.join(__dirname, '../app/dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  target: 'node'
};
