const node_externals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  // externals: [node_externals()],
  entry: [
  	'webpack-hot-middleware/client',
  	'./static/src/js/app.js',
	],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'static', 'dist'),
    publicPath: '/js'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'static', 'dist'),
    publicPath: '/js'
  },
  module: {
	  rules: [
	    {
	    	test: /\.js$/,
	    	exclude: /node_modules/,
	    	use: 'babel-loader'
	    },
	    {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'postcss-loader',
        ],
      }	
	  ]
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};