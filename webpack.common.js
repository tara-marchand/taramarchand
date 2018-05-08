/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const babelOptions = {
  presets: [['env', { modules: false }], 'react'],
  plugins: ['transform-class-properties']
};

module.exports = env => {
  return {
    context: path.resolve(__dirname),
    target: 'web',
    entry: ['./static/src/index.ts'],
    output: {
      filename: 'main.bundle.js',
      path: path.resolve(__dirname, 'static', 'dist'),
      publicPath: '/static/'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(true),
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),
      new ExtractTextPlugin('main.css')
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { minimize: env.NODE_ENV === 'production' }
              },
              {
                loader: 'postcss-loader'
              }
            ]
          }),
          include: [path.join(__dirname, 'static', 'src')],
          exclude: [path.join(__dirname, 'node_modules')]
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { minimize: env.NODE_ENV === 'production' }
              },
              { loader: 'postcss-loader' },
              { loader: 'resolve-url-loader' },
              { loader: 'sass-loader?sourceMap' }
            ]
          }),
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
    }
  };
};
