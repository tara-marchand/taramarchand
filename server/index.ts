if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}
import Airtable from 'airtable';
import Fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyFormbody from 'fastify-formbody';
import fastifyNextJs from 'fastify-nextjs';
import get from 'lodash.get';
import { NextConfig } from 'next';
import NodeCache from 'node-cache';
import getNextConfig from './next.config';

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

const setup = async () => {
  const fastifyInstance: ExtendedFastifyInstance = await Fastify({
    logger: { level: logLevel },
  });

  // @ts-ignore
  const nextConfig: Partial<NextConfig> = getNextConfig();

  return fastifyInstance
    .register(fastifySequelize)
    .register(fastifyCookie)
    .register(fastifyFormbody)
    .register(fastifyMailgun)
    .addSchema(schema)
    .register(import('./api'), { prefix: '/fastify/api' })
    .register(fastifyNextJs, { conf: nextConfig, dev: isDev })
    .after(() => {
      if (fastifyInstance.next) {
        fastifyInstance.next('/*');
      } else {
        return;
      }
    })
    .listen(port, '0.0.0.0')
    .then((error: string) => {
      error && console.log(error);
      fastifyInstance.log.info(
        { url: `http://localhost:${port}` },
        'Server is ready'
      );
    })
    .catch((error) => console.log(`Error starting Fastify: ${error}`));
};

const fastifyInstance = setup();

export { cache, fastifyInstance };
