'use strict';

import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

const compiler = webpack(webpackConfig);
const app = express()

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use('/', express.static(path.join(__dirname, '..', 'static', 'dist')));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(3000, function () {
  console.log('App listening on port 3000.')
})
