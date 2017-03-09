const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    target: 'web',
    entry: [
        './static/src/index.js',
        'webpack-hot-middleware/client',
    ],
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'static', 'dist'),
        publicPath: '/static'
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'static', 'dist'),
        publicPath: '/static'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [
                    ['env', { modules: false }],
                    'react'
                ]
            }
        }, {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: { config: 'postcss.config.js' },
              },
            ],
          }),
          include: [path.join(__dirname, 'app'), path.join(__dirname, 'static') ],
          exclude: [path.join(__dirname, 'node_modules')],
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
          }),
          include: [path.join(__dirname, 'node_modules')],
          exclude: [path.join(__dirname, 'app'), path.join(__dirname, 'static') ],
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new Visualizer({
            filename: '../../webpack_stats.html'
        }),
        new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true),
        })
    ],
};
