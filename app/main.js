const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const NodeCache = require('node-cache');
const path = require('path');
const router = require('./router');

const myCache = new NodeCache();

dotenv.config();

function main(app) {
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

module.exports = {
  myCache,
  main,
};
