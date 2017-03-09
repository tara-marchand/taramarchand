const path = require('path');
const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

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
                [ 'env', { modules: false } ],
                'react'
              ]
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            loader: [
                'style-loader',
                'css-loader?modules&importLoaders=1',
                'postcss-loader',
            ],
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new Visualizer({
          filename: '../../webpack_stats.html'
        })
    ],
};
