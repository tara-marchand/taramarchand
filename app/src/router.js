import express from 'express';
import models from './models';
import { getConfirmed } from './controllers/covid19';

const { NEW_RELIC_ENABLED: isNewRelicEnabled, NODE_ENV: nodeEnv } = process.env;
const isProd = nodeEnv === 'production';
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

router.get('/api/books', (req, res) => {
  models.Book.findAll().then(books => {
    res
      .status(200)
      .json(books)
      .end();
  });
});

router.get('/api/covid19', (req, res) => {
  return getConfirmed(req, res);
});

router.get('*', (req, res) => {
  getBrowserTimingHeader().then(browserTimingHeader => {
    res.render('index', {
      browserTimingHeader,
      isNewRelicEnabled,
      isProd
    });
  });
});

export default router;
