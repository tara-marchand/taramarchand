import Airtable from 'airtable';
import { config as _config } from 'dotenv';
import fastify from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyNextJs from 'fastify-nextjs';
import fastifyStatic from 'fastify-static';
import HMR from 'fastify-webpack-hmr';
import handlebars from 'handlebars';
import middie from 'middie';
import NodeCache from 'node-cache';
import { join, resolve as _resolve } from 'path';
import pointOfView from 'point-of-view';
import { models } from './models/index.mjs';
const { base, configure } = Airtable;

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';
const airtableBase = base('app915q92oWW2aV5C');

const nrInstance = isDev ? undefined : require('newrelic');
const myCache = new NodeCache();

const fastifyApp = fastify();
const plugins = [
  [middie],
  [fastifyNextJs],
  [
    pointOfView,
    {
      engine: { handlebars },
      layout: 'server/views/layouts/main.hbs',
      options: { partials: { index: 'server/views/index.hbs' } },
    },
  ],
  [
    fastifyStatic,
    {
      root: _resolve(process.cwd(), 'client/dist'),
      prefix: '/client/',
    },
  ],
  [
    fastifyStatic,
    {
      root: _resolve(process.cwd(), 'node_modules'),
      prefix: '/node_modules/',
      decorateReply: false,
    },
  ],
];

plugins.forEach(([plugin, options = {}]) => {
  fastifyApp.register(plugin, options);
  fastifyApp.after((err) => fastifyApp.log.error(err));
});

if (isDev) {
  fastifyApp.register(HMR, {
    config: join(process.cwd(), 'webpack.dev'),
    webpackDev: {
      publicPath: '/client/',
    },
    webpackHot: { reload: true },
  });
} else if (isProd) {
  fastifyApp.register(fastifyCompress);
}
fastifyApp.after((err) => fastifyApp.log.error(err));

fastifyApp.ready();

_config();

configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

fastifyApp.get('/api/books', (req, reply) => {
  models.Book.findAll().then((books) => {
    reply.send(books);
  });
});

fastifyApp.get('/api/jobs', (req, reply) => {
  models.Job.findAll().then((jobs) => {
    reply.send(jobs);
  });
});

fastifyApp.get('/api/jobs-airtable', (req, reply) => {
  const jobs = [];

  airtableBase('Job Leads')
    .select({
      maxRecords: 100,
      view: 'All Positions',
    })
    .eachPage(
      function page(jobsResult, fetchNextPage) {
        jobsResult.forEach(function (job) {
          fastifyApp.log.info(job);
          jobs.push(job);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          fastifyApp.log.error(err);
        }
        reply.send(jobs);
      }
    );
});

// Next.js test
fastifyApp.get('/test', (req, reply) => {
  fastifyApp.next(req, reply, '/test');
});

fastifyApp.get('*', (req, reply) => {
  getBrowserTimingHeader(nrInstance).then((browserTimingHeader) => {
    reply.view('server/views/index.hbs', {
      browserTimingHeader,
      isProd,
    });
  });
});

fastifyApp.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    fastifyApp.log.error(err);
    process.exit(1);
  }
  fastifyApp.log.info(`Fastify app listening on port ${port}.`);
});

function getBrowserTimingHeader(newrelic) {
  return new Promise((resolve) => {
    if (isProd) {
      resolve(newrelic.getBrowserTimingHeader());
    } else {
      resolve({});
    }
  });
}

export { myCache };
