/* eslint-env node */
const path = require('path');
const webpack = require('webpack');

const babelOptions = {
  presets: ['env', 'react'],
  plugins: ['transform-class-properties', 'transform-object-rest-spread']
};

module.exports = {
  babelOptions,
  config: {
    context: path.resolve(__dirname),
    devtool: 'inline-source-map',
    externals: ['foundation-sites'],
    mode: 'development',
    module: {
      // Rules for TS(X) and CSS|SCSS|SASS individually set in dev & prod configs.
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: path.resolve(__dirname),
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
        }
      ]
    },
    output: {
      filename: 'main.bundle.js',
      path: path.resolve(__dirname, 'static', 'dist'),
      publicPath: '/static/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: ['node_modules', path.resolve(__dirname, 'static/src')]
    },
    target: 'web'
  }
};