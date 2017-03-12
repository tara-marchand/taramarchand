'use strict';

import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config';

const compiler = webpack(webpackConfig);
const app = express()

// middleware
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.use('/static', express.static(path.join(__dirname, '..', 'static', 'dist')));
app.use('/modules', express.static(path.join(__dirname, '..', 'node_modules', 'dist')));

app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

// routes
const renderIndex = function(req, res) {
  res.render('index');
}
app.get('/*', renderIndex)

app.listen(3000, function () {
  console.log('App listening on port 3000.');
})
