import fastifyCookie from '@fastify/cookie';
import fastifyFormbody from '@fastify/formbody';
import fastifyNext from '@fastify/nextjs';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import Airtable from 'airtable';
import { log } from 'console';
import Fastify from 'fastify';
import { get } from 'lodash';
import NodeCache from 'node-cache';
import { Level } from 'pino';

import { getPinoLogger } from './logger';
import { getOtelSdk } from './otel';
import { fastifySequelize } from './plugins/fastify-sequelize';
import { port } from './port';
import { resumeToText } from './resumeToText';
import schema from './schemas/index.json';

const { MeterProvider } = require('@opentelemetry/sdk-metrics');

const { endpoint, port: promPort } = PrometheusExporter.DEFAULT_OPTIONS;
const promExporter = new PrometheusExporter(
  { preventServerStart: false },
  () => {
    console.log(
      `Prometheus scrape endpoint: http://localhost:${promPort}${endpoint}`
    );
  }
);
const meterProvider = new MeterProvider();
meterProvider.addMetricReader(promExporter);

const otelSdk = getOtelSdk();
let fastifyInstance;

// Initialize the SDK and register with the OpenTelemetry API to record telemetry
otelSdk
  .start()
  .then(() => console.log('Tracing initialized'))
  .then(() => {
    fastifyInstance = createFastifyInstance();
  })
  .catch((error) => console.log('Error initializing tracing', error));

// Gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  otelSdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

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

  fastifyInstance
    .register(fastifySequelize)
    .register(fastifyCookie)
    .register(fastifyFormbody)
    .addSchema(schema)
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
    .route({
      method: 'GET',
      url: '/metrics',
      handler: function (request, reply) {
        try {
          promExporter.getMetricsRequestHandler(request.raw, reply.raw);
          reply.hijack();
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
    .listen({ port, host: '0.0.0.0' })
    .then(() => {
      fastifyInstance.log.info(
        { url: `http://localhost:${port}` },
        'Server is ready'
      );
    })
    .catch((error) => error && console.log(`Error starting Fastify: ${error}`));
};

export { cache, fastifyInstance };
