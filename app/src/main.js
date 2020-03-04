import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import path from 'path';
import models from './models';

dotenv.config();

export function finishInit(app) {
  app.use(bodyParser.raw());

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

  app.all('*', (req, res) => {
    res.render('index', {
      isProd: process.env.NODE_ENV === 'production'
    });
  });

  const port = process.env.PORT || 5000;

  app.listen(port, function() {
    console.info(`App listening on port ${port}.`);
  });
}
