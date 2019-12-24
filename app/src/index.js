// import newrelic from 'newrelic';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import models from './models';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { default as webpackDevConfig } from '../../config/webpack.dev';
import { default as webpackProdConfig } from '../../config/webpack.prod';

dotenv.config();

let webpackConfig;
if (process.env.NODE_ENV === 'development') {
  webpackConfig = webpackDevConfig;
} else if (process.env.NODE_ENV === 'production') {
  webpackConfig = webpackProdConfig;
}
const compiler = webpack(webpackConfig);

const app = express();

if (process.env.NODE_ENV === 'development') {
  console.log('dev middleware');
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );

  console.log('hot middleware');
  app.use(
    webpackHotMiddleware(compiler, {
      reload: true
    })
  );
} else if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

app.use(bodyParser.raw());

app.use(
  '/static',
  express.static(path.resolve(process.cwd(), 'static/dist'), {
    index: false
  })
);

app.use(
  '/gatsby',
  express.static(path.join(process.cwd(), 'static/gatsby/public'))
);

app.use(
  '/node_modules',
  express.static(path.resolve(process.cwd(), 'node_modules'))
);

app.get('/api/books', (req, res) => {
  models.Book.findAll().then(books => {
    res
      .status(200)
      .json(books)
      .end();
  });
});

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

app.all('*', (req, res) => {
  res.render('index', {
    isProd: process.env.NODE_ENV === 'production'
  });
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.info(`App listening on port ${port}.`);
});
