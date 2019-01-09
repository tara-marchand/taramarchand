/* eslint-env node */
const path = require('path');
const webpack = require('webpack');

const babelOptions = {
  presets: ['env', 'react'],
  plugins: ['transform-class-properties', 'transform-object-rest-spread']
};

module.exports = {
  config: {
    context: path.resolve(__dirname),
    devtool: 'inline-source-map',
    entry: [
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './static/src/index.tsx'
    ],
    externals: ['foundation-sites'],
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: path.resolve(__dirname),
          // include: [path.resolve(__dirname, 'static/src')],
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions
            }
          ]
        },
        {
          test: /\.ts(x?)$/,
          include: [path.resolve(__dirname, 'static/src')],
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true // HMR doesn't work without this
              }
            }
          ]
        },
        {
          test: /\.(css|scss|sass)/,
          include: [
            path.resolve(__dirname, 'static/src'),
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'node_modules/foundation-sites/scss')
          ],
          use: [
            {
              loader: 'style-loader',
              options: {
                hmr: true
              }
            },
            'css-loader',
            'sass-loader'
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
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(true),
          NODE_ENV: JSON.stringify('development')
        }
      })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      modules: ['node_modules', path.resolve(__dirname, 'static/src')]
    },
    target: 'web'
  }
};
