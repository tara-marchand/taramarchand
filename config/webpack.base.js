/* eslint-env node */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const babelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
};

module.exports = {
  config: {
    context: path.resolve(process.cwd()),
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
      // Rules for TS(X) and CSS|SCSS|SASS individually set in dev & prod configs.
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: ['/app/src', '/static/src'],
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
      path: path.resolve(process.cwd(), 'static/dist'),
      publicPath: '/static/'
    },
    plugins: [
      new CopyPlugin([{ from: './static/src/images', to: 'images' }]),
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        swDest: 'worker.js'
      })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
      modules: ['node_modules', 'static/src']
    },
    target: 'web'
  }
};
