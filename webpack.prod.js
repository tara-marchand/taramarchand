const MinifyPlugin = require('babel-minify-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = env => {
  return merge(common(env), {
    plugins: [new MinifyPlugin()]
  })
}
