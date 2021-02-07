import Airtable from 'airtable';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyStatic from 'fastify-static';
import webpackHMR from 'fastify-webpack-hmr';
import handlebars from 'handlebars';
import middie from 'middie';
import newrelic from 'newrelic';
import NodeCache from 'node-cache';
import { join, resolve as _resolve } from 'path';
import pointOfView from 'point-of-view';
import { models } from './models/index.mjs';

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';
const airtableBase = Airtable.base('app915q92oWW2aV5C');

const nrInstance = isDev ? undefined : newrelic;
const myCache = new NodeCache();

dotenv.config();

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

async function build() {
  const fastify = Fastify({ logger: true });

  await fastify.register(middie);

  fastify.register(fastifyStatic, {
    root: _resolve(process.cwd(), 'client/dist'),
    prefix: '/client/',
  });

  fastify.register(fastifyStatic, {
    root: _resolve(process.cwd(), 'node_modules'),
    prefix: '/node_modules/',
    decorateReply: false,
  });

  if (isDev) {
    fastify.register(webpackHMR, {
      config: join(process.cwd(), 'webpack.dev'),
      webpackDev: { publicPath: '/client/' },
      webpackHot: { reload: true },
    });
  } else if (isProd) {
    fastify.register(fastifyCompress);
  }

  fastify
    .register(pointOfView, {
      engine: { handlebars },
      layout: 'server/views/layouts/main.hbs',
      options: { partials: { index: 'server/views/index.hbs' } },
    })
    .after(() => {
      fastify.route({
        method: 'GET',
        url: '/api/books',
        handler: async (req, reply) => {
          const books = models.Book.findAll();
          reply.send(books);
        },
      });

      fastify.route({
        method: 'GET',
        url: '/api/jobs',
        handler: async (req, reply) => {
          const jobs = models.Job.findAll();
          reply.send(jobs);
        },
      });

      fastify.route({
        method: 'GET',
        url: '/api/jobs-airtable',
        handler: async (req, reply) => {
          const jobs = [];

          airtableBase('Job Leads')
            .select({
              maxRecords: 100,
              view: 'All Positions',
            })
            .eachPage(
              function page(jobsResult, fetchNextPage) {
                jobsResult.forEach(function (job) {
                  fastify.log.info(job);
                  jobs.push(job);
                });
                fetchNextPage();
              },
              function done(err) {
                if (err) {
                  fastify.log.error(err);
                }
                reply.send(jobs);
              }
            );
        },
      });

      fastify.route({
        method: 'GET',
        url: '/*',
        handler: (req, reply) => {
          getBrowserTimingHeader(nrInstance)
            .then((browserTimingHeader) => {
              reply.view('server/views/index.hbs', {
                browserTimingHeader,
                isProd,
              });
            })
            .catch((error) => {
              fastify.log.error(error);
              reply.sent = true;
            });
        },
      });
    });

  return fastify;
}

build()
  .then((fastify) => fastify.listen(port))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// fastify.register(fastifyNextJs).after(() => {
//   console.log(fastify);
//   fastify.next('/test');
// });

function getBrowserTimingHeader(nrInstance) {
  return new Promise((resolve, reject) => {
    try {
      if (isProd) {
        resolve(nrInstance.getBrowserTimingHeader());
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
}

export { myCache };
