'use strict';

import dirname from './dirname';

// import newrelic from 'newrelic';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import express from 'express';
import morgan from 'morgan';
// import mime from 'mime-types';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { default as webpackDevConfig } from '../webpack.dev';
import { default as webpackProdConfig } from '../webpack.prod';

dotenv.config();

const app = express();

let webpackConfig;

if (process.env.NODE_ENV === 'development') {
  webpackConfig = webpackDevConfig;
} else if (process.env.NODE_ENV === 'production') {
  webpackConfig = webpackProdConfig;
}

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'development') {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      // publicPath: webpackConfig.output.publicPath,
      reload: true
    })
  );
} else if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

// controllers

app.use(bodyParser.raw());

app.use(
  '/static',
  express.static(path.resolve(dirname, '..', '..', 'static', 'dist'), {
    index: false
  })
);
app.use(
  '/node_modules',
  express.static(path.resolve(dirname, '..', '..', 'node_modules'))
);

// logging

app.use(
  morgan(
    '[:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length]'
  )
);

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
  })
);
app.set('view engine', '.hbs');

// routes
// app.get('*', (req, res) => {
//   let type = mime.lookup(req.path);
//   if (!type) {
//     type = 'text/html';
//   }

//   return res.type(type).render('index');
// });

app.get('*', (req, res) => {
  res.render('index', {
    isProd: process.env.NODE_ENV === 'production'
  });
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.info(`App listening on port ${port}.`);
});
