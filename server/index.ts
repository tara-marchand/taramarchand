import './otel';
import fastifyCookie from '@fastify/cookie';
import fastifyNext from '@fastify/nextjs';
import Airtable from 'airtable';
import { log } from 'console';
import Fastify from 'fastify';
import { get } from 'lodash';
import NodeCache from 'node-cache';

import { Level } from 'pino';
import { getPinoLogger } from './logger';
import { resumeToText } from './resumeToText';
import { CbtDataSource } from './data/cbt/cbt-data-source';

const isDev = process.env.NODE_ENV === 'development';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isProd = process.env.NODE_ENV === 'production';

const port = process.env.PORT || 3333;
const logLevel: Level = 'info';

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

  await CbtDataSource.initialize();

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
    .register(fastifyCookie)
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
      hostname: 'localhost',
      port: _port,
    })
    .after(function (error: Error | null) {
      if (error) {
        fastifyInstance.log.error(error.message);
        process.exit(1);
      }

      fastifyInstance.next('/*');
    });

  return fastifyInstance
    .listen({ port: _port, host: '0.0.0.0' })
    .then(() => {
      console.info(`Server is ready on port ${port}`);
    })
    .catch((error) => error && console.error(`Error starting Fastify: ${error}`));
};

const fastifyInstance = createFastifyInstance();

export { cache, fastifyInstance };
