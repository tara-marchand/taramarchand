const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: [
  	'./static/src/app.js',
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
  target: 'node'
};