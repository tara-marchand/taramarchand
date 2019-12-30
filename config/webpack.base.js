/* eslint-env node */
const path = require('path');

const babelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
};

module.exports = {
  babelOptions,
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
      publicPath: '/static'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
      modules: ['node_modules', 'static/src']
    },
    target: 'web'
  }
};
