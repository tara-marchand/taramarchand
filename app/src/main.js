import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import path from 'path';
import models from './models';
import fetch from 'isomorphic-fetch';
import parse from 'csv-parse/lib/sync';

dotenv.config();

const { NEW_RELIC_ENABLED: isNewRelicEnabled, NODE_ENV: nodeEnv } = process.env;
const isProd = nodeEnv === 'production';

function getBrowserTimingHeader() {
  return new Promise((resolve, reject) => {
    if (isNewRelicEnabled) {
      import('newrelic').then(newrelic => {
        resolve(newrelic.getBrowserTimingHeader());
      });
    } else {
      resolve({});
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

  app.get('/api/covid19', (req, res) => {
    const covid19Url =
      'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';

    return fetch(covid19Url)
      .then(function(response) {
        return response.ok ? response.text() : Promise.reject(response.status);
      })
      .then(function(text) {
        return res
          .status(200)
          .json(
            parse(text, {
              columns: true,
              skip_empty_lines: true
            })
          )
          .end();
      });
  });

  app.all('*', (req, res) => {
    getBrowserTimingHeader().then(browserTimingHeader => {
      res.render('index', {
        browserTimingHeader,
        isNewRelicEnabled,
        isProd
      });
    });
  });

  const port = process.env.PORT || 5000;

  app.listen(port, function() {
    console.info(`App listening on port ${port}.`);
  });
}
