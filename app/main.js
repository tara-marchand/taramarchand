const dotenv = require('dotenv');
const fastifyStatic = require('fastify-static');
const handlebars = require('handlebars');
const NodeCache = require('node-cache');
const path = require('path');
const pointOfView = require('point-of-view');
const Airtable = require('airtable');

const models = require('./models');

dotenv.config();

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const airtableBase = Airtable.base('app915q92oWW2aV5C');
const myCache = new NodeCache();
const isProd = process.env.NODE_ENV === 'production';

function main(app, newrelic) {
  app.register(pointOfView, {
    engine: {
      handlebars,
    },
    layout: 'app/views/layouts/main.hbs',
    options: {
      partials: {
        index: 'app/views/index.hbs',
      },
    },
  });

  app.register(fastifyStatic, {
    root: path.resolve(process.cwd(), 'static/dist'),
    prefix: '/static/',
  });

  app.register(fastifyStatic, {
    root: path.resolve(process.cwd(), 'node_modules'),
    prefix: '/node_modules/',
    decorateReply: false,
  });

  app.get('/api/books', (req, reply) => {
    models.Book.findAll().then((books) => {
      reply.send(books);
    });
  });

  app.get('/api/jobs', (req, reply) => {
    models.Job.findAll().then((jobs) => {
      reply.send(jobs);
    });
  });

  app.get('/api/jobs-airtable', (req, reply) => {
    const jobs = [];

    airtableBase('Job Leads')
      .select({
        maxRecords: 100,
        view: 'All Positions',
      })
      .eachPage(
        function page(jobsResult, fetchNextPage) {
          jobsResult.forEach(function (job) {
            app.log.info(job);
            jobs.push(job);
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            app.log.error(err);
          }
          reply.send(jobs);
        }
      );
  });

  app.get('*', (req, reply) => {
    getBrowserTimingHeader(newrelic).then((browserTimingHeader) => {
      reply.view('app/views/index.hbs', {
        browserTimingHeader,
        isProd,
      });
    });
  });

  const port = process.env.PORT || 5000;

  app.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.log(err);
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`App listening on port ${port}.`);
  });
}

function getBrowserTimingHeader(newrelic) {
  return new Promise((resolve) => {
    if (isProd) {
      resolve(newrelic.getBrowserTimingHeader());
    } else {
      resolve({});
    }
  });
}

module.exports = {
  myCache,
  main,
};
