const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.production === true

module.exports = {
    context: path.resolve(__dirname),
    target: 'web',
    entry: [
        'react-hot-loader/patch', 'webpack-hot-middleware/client', './static/src/index.js'
    ],
    output: {
        filename: 'main.bundle.js',
        path: path.resolve(__dirname, 'static', 'dist'),
        publicPath: '/static'
    },
    devtool: 'eval',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'static', 'dist'),
        publicPath: '/static'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        [
                            'env', {
                                modules: false
                            }
                        ],
                        'react'
                    ]
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                }),
                include: [path.join(__dirname, 'static', 'src')],
                exclude: [path.join(__dirname, 'node_modules')]
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']}),
                include: [path.join(__dirname, 'node_modules')],
                exclude: [path.join(__dirname, 'static', 'src')]
            }, {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                }),
                include: [
                    path.join(__dirname, 'static', 'src'),
                    path.join(__dirname, 'node_modules')
                ]
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader?outputPath=static/dist&name=[name].[ext]&publicPath=/static/',
            }
        ],
    },
    plugins : [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({'process.env.BROWSER': JSON.stringify(true)}),
        new ExtractTextPlugin('main.css')
    ]
};
