import Airtable from 'airtable';
import Fastify, { FastifyInstance } from 'fastify';
import { get } from 'lodash';
import NodeCache from 'node-cache';
import { Level } from 'pino';

import fastifyCookie from '@fastify/cookie';
import fastifyNext from '@fastify/nextjs';

import { getPinoLogger } from './logger';
import { port } from './port';
import { resumeToText } from './resumeToText';
import schema from './schemas/index.json';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const logLevel: Level = isProd ? 'info' : 'debug';
const cache = new NodeCache();

const airtableApiKey = get(process.env, 'AIRTABLE_API_KEY');
if (airtableApiKey) {
  const airtableConfig: Pick<
    Airtable.AirtableOptions,
    | 'apiKey'
    | 'endpointUrl'
    | 'apiVersion'
    | 'noRetryIfRateLimited'
    | 'requestTimeout'
  > = {};
  airtableConfig.apiKey = airtableApiKey;
  Airtable.configure(airtableConfig);
}

let fastifyInstance: FastifyInstance;

  getPinoLogger(logLevel)
  .then(async (pinoLogger) => {
    fastifyInstance = Fastify({
      logger: pinoLogger,
      pluginTimeout: 20000,
      trustProxy: true,
    })
      .register(fastifyCookie)
      .addSchema(schema)
      .route({
        method: 'GET',
        url: '/resume.txt',
        handler: async function (_request, reply) {
          try {
            reply.header('Content-Type', 'text/plain');
            reply.send(resumeToText());
          } catch (ex) {
            console.error(ex);
            reply.code(500);
          }
        },
      })
      // .route({
      //   method: 'GET',
      //   url: '/metrics',
      //   handler: function (request, reply) {
      //     try {
      //       promExporter.getMetricsRequestHandler(request.raw, reply.raw);
      //       reply.hijack();
      //     } catch (ex) {
      //       console.error(ex);
      //       reply.code(500);
      //     }
      //   },
      // })
      .register(fastifyNext, {
        dev: isDev,
      })
      .after(function (error: Error) {
        if (error) {
          console.error(error.message);
          process.exit(1);
        }

        fastifyInstance.next('/*');
      });

    fastifyInstance
      .listen({ port, host: '0.0.0.0' })
      .catch(
        (error) => error && console.error(`Error starting Fastify: ${error}`)
      );

    fastifyInstance.log.info(`Fastify is ready on port ${port}`);

    return fastifyInstance;
  })
  .catch((error) => error && console.error(`Error starting Fastify: ${error}`));  
// })

export { cache, fastifyInstance };
