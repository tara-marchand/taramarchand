import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import NodeCache from 'node-cache';
import path from 'path';
import router from './router';

export const myCache = new NodeCache();

dotenv.config();

export function main(app) {
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
      extname: '.hbs',
    })
  );

  app.set('view engine', '.hbs');

  app.use(
    '/static',
    express.static(path.resolve(process.cwd(), 'static/dist'), {
      index: false,
    })
  );

  app.use(
    '/node_modules',
    express.static(path.resolve(process.cwd(), 'node_modules'))
  );

  app.use('/', router);

  const port = process.env.PORT || 5000;

  app.listen(port, function () {
    console.info(`App listening on port ${port}.`);
  });
}
