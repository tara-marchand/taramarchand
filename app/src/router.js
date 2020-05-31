import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import covid19Controller from './controllers/covid19';
import models from './models';

const { NEW_RELIC_ENABLED: isNewRelicEnabled, NODE_ENV: nodeEnv } = process.env;
const isProd = nodeEnv === 'production';
const baseForApi = 'api';
const router = express.Router();

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

router.use(
  morgan(
    '[:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length]'
  )
);

router.use(
  '/static',
  express.static(path.resolve(__dirname, '../../static/dist'), {
    index: false
  })
);

router.use(
  '/node_modules',
  express.static(path.resolve(__dirname, '../../node_modules'))
);

router.get('/favicon.ico', (req, res) => res.status(204));

router.get('/api/books', (req, res) => {
  models.Book.findAll().then(books => {
    res
      .status(200)
      .json(books)
      .end();
  });
});

router.get('/api/covid19/us', (req, res) => {
  return covid19Controller.getUsCases(req, res);
});

router.get('/api/covid19/world', (req, res) => {
  return covid19Controller.getWorldCases(req, res);
});

router.get('/:base?', (req, res) => {
  if (!req.params.base || req.params.base !== baseForApi) {
    getBrowserTimingHeader().then(browserTimingHeader => {
      res.render('index', {
        browserTimingHeader,
        isNewRelicEnabled,
        isProd
      });
    });
  }
});

export default router;
