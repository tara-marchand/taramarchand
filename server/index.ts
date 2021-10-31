if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}
// Next.js config is a CommonJS module
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextConfig = require('../next.config');

import Airtable from 'airtable';
import Fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyFormbody from 'fastify-formbody';
import fastifyNextJs from 'fastify-nextjs';
import get from 'lodash.get';
import NodeCache from 'node-cache';

import { fastifyMailgun } from './plugins/fastify-mailgun';
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
  });

  return fastifyInstance
    .addSchema(schema)
    .register(import('./api'), { prefix: '/fastify/api' })
    .register(fastifyNextJs, { conf: nextConfig, dev: isDev })
    .after(() => {
      fastifyInstance.next('/*');
    })
    .register(fastifyCookie)
    .register(fastifyFormbody)
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
