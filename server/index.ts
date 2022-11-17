import Airtable from 'airtable';
import { log } from 'console';
import Fastify from 'fastify';
import { get } from 'lodash';
import NodeCache from 'node-cache';
import { Level } from 'pino';

import fastifyCookie from '@fastify/cookie';
import fastifyFormbody from '@fastify/formbody';
import fastifyNext from '@fastify/nextjs';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FastifyInstrumentation } from '@opentelemetry/instrumentation-fastify';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

import { getPinoLogger } from './logger';
import { fastifySequelize } from './plugins/fastify-sequelize';
import { resumeToText } from './resumeToText';
import schema from './schemas/index.json';

registerInstrumentations({
  instrumentations: [
    // Fastify instrumentation expects HTTP layer to be instrumented
    new HttpInstrumentation(),
    new FastifyInstrumentation(),
  ],
});

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const port = process.env.PORT || 3333;
const logLevel: Level = isProd ? 'info' : 'debug';

const cache = new NodeCache();

// Set up Airtable
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

const createFastifyInstance = async () => {
  const pinoLogger = await getPinoLogger(logLevel);

  const fastifyInstance = Fastify({
    logger: pinoLogger,
    pluginTimeout: 20000,
    trustProxy: true,
  });

  let _port = port;
  if (typeof _port === 'string') {
    _port = parseInt(_port, 10);
  }

  fastifyInstance
    .register(fastifySequelize)
    .register(fastifyCookie)
    .register(fastifyFormbody)
    .addSchema(schema)
    // .route({
    //   method: 'GET',
    //   url: '/metrics',
    //   handler: async function (request, reply) {
    //     try {
    //       reply.header('Content-Type', register.contentType);
    //       reply.send(await register.metrics());
    //     } catch (ex) {
    //       log(ex);
    //       reply.code(500);
    //     }
    //   },
    // })
    .route({
      method: 'GET',
      url: '/resume.txt',
      handler: async function (request, reply) {
        try {
          reply.header('Content-Type', 'text/plain');
          reply.send(resumeToText());
        } catch (ex) {
          log(ex);
          reply.code(500);
        }
      },
    })
    .register(fastifyNext, {
      dev: isDev,
    })
    .after(function (error: Error) {
      if (error) {
        fastifyInstance.log.error(error.message);
        process.exit(1);
      }

      fastifyInstance.next('/*');

      // Register mailgun late to work around bug: https://github.com/vercel/next.js/issues/35314#issuecomment-1069661213
      import('./plugins/fastify-mailgun').then(({ default: mailgunPlugin }) => {
        fastifyInstance.register(mailgunPlugin);
      });
    });

  return fastifyInstance
    .listen({ port: _port, host: '0.0.0.0' })
    .then(() => {
      fastifyInstance.log.info(
        { url: `http://localhost:${port}` },
        'Server is ready'
      );
    })
    .catch((error) => error && console.log(`Error starting Fastify: ${error}`));
};

const fastifyInstance = createFastifyInstance();

export { cache, fastifyInstance };
