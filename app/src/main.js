import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import path from 'path';
import models from './models';

dotenv.config();

const { NEW_RELIC_ENABLED: isNewRelicEnabled, NODE_ENV: nodeEnv } = process.env;
const isProd = nodeEnv === 'production';

function getBrowserTimingHeader() {
  new Promise((resolve, reject) => {
    if (isNewRelicEnabled) {
      import('newrelic').then(newrelic => {
        resolve(newrelic.getBrowserTimingHeader);
      });
    } else {
      resolve(() => {});
    }
  });
}

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
    const browserTimingHeader = getBrowserTimingHeader();

    res.render('index', {
      browserTimingHeader,
      isNewRelicEnabled,
      isProd
    });
  });

  const port = process.env.PORT || 5000;

  app.listen(port, function() {
    console.info(`App listening on port ${port}.`);
  });
}
