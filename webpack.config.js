const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    target: 'web',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './static/src/index.js',
    ],
    output: {
        filename: 'main.bundle.js',
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
                use: ['css-loader', 'postcss-loader']
            }),
            include: [path.join(__dirname, 'app'), path.join(__dirname, 'static')],
            exclude: [path.join(__dirname, 'node_modules')],
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader'],
            }),
            include: [path.join(__dirname, 'node_modules')],
            exclude: [path.join(__dirname, 'app'), path.join(__dirname, 'static')],
        }, {
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
          test: /\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file-loader',
            'image-webpack-loader'
          ]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.BROWSER': JSON.stringify(true),
        }),
        new ExtractTextPlugin('main.css'),
    ],
};
