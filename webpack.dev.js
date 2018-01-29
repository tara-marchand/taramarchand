const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = env => {
  return merge.strategy({
    entry: 'prepend'
  })(common(env), {
    devtool: 'eval',
    entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client'],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: [['env', { modules: false }], 'react'],
            plugins: ['transform-class-properties']
          }
        }
      ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
  })
}
