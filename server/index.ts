if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}

import Airtable from 'airtable';
import Fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyFormbody from 'fastify-formbody';
import get from 'lodash.get';
import NodeCache from 'node-cache';

import { fastifyMailgun } from './plugins/fastify-mailgun';
import { fastifyNextWrapper } from './plugins/fastify-next-wrapper';
import { fastifySequelize } from './plugins/fastify-sequelize';
import schema from './schemas/index.json';
import { ExtendedFastifyInstance } from './types/fastify';

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';
const logLevel = isProd ? 'warn' : 'info';

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
  const fastifyInstance: ExtendedFastifyInstance = await Fastify({
    logger: { level: logLevel },
    pluginTimeout: 17500,
  });

  return fastifyInstance
    .register(fastifyNextWrapper)
    .register(fastifyCookie)
    .register(fastifyFormbody)
    .addSchema(schema)
    .register(import('./api'), { prefix: '/fastify/api' })
    .register(fastifySequelize)
    .register(fastifyMailgun)
    .listen(port, '0.0.0.0')
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
