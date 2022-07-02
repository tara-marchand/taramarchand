import fastifyCookie from '@fastify/cookie';
import fastifyFormbody from '@fastify/formbody';
import fastifyNext from '@fastify/nextjs';
import Airtable from 'airtable';
import { log } from 'console';
import Fastify from 'fastify';
import get from 'lodash.get';
import NodeCache from 'node-cache';
import { collectDefaultMetrics, register } from 'prom-client';
import pino from 'pino';
import createWriteStreamSync from 'pino-loki'; // Pino-loki isn't available as a ES6 module yet

import { fastifySequelize } from './plugins/fastify-sequelize';
import schema from './schemas/index.json';
import { Level } from 'pino';

type ContactRequestBody = {
  email: string;
  message: string;
  name: string;
};

collectDefaultMetrics();

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

const options = {
  applicationTag: 'taramarchand', // The tag every log file should be logged with
  host: 'http://loki.tmarchand.com', // Pino loki instance IP address and port
  labels: {
    application: 'taramarchand.com'
  },
  silenceErrors: false,
  timeout: 3000, // Set timeout to 3 seconds, default is 30 minutes.
};

/**
 * @see https://skaug.dev/node-js-app-with-loki/
 */
const createFastifyInstance = async () => {
  const streams = [
    { level: logLevel, stream: await createWriteStreamSync(options) },
  ];
  let logger = pino({ level: logLevel }, pino.multistream(streams));

  const fastifyInstance = Fastify({
    logger,
    pluginTimeout: 20000,
  });

  let _port = port;
  if (typeof _port === 'string') {
    _port = parseInt(_port, 10);
  }

  fastifyInstance
    .register(fastifyCookie)
    .register(fastifyFormbody)
    .register(fastifySequelize)
    .addSchema(schema)
    .route({
      method: 'POST',
      url: '/contact',
      schema: {
        body: {
          schema: {
            $ref: 'https://www.taramarchand.com/#contact',
          },
        },
      },
      handler: function (request, reply) {
        const typedRequestBody = request.body as ContactRequestBody;
        let subject = '[taramarchand.com] Contact form message';

        if (typedRequestBody.name) {
          subject += ` from ${(request.body as ContactRequestBody).name}`;
        }

        this.nodemailer?.sendMail(
          {
            from: typedRequestBody.email,
            to: 'tara@mac.com',
            subject,
            text: typedRequestBody.message,
          },
          (err: Record<string, unknown>, info: Record<string, unknown>) => {
            console.log(request.body);
            if (err) {
              this.log.error(err.message as string);
            }
            reply.send({
              messageId: info.messageId,
            });
          }
        );
      },
    })
    .route({
      method: 'GET',
      url: '/metrics',
      handler: async function (request, reply) {
        try {
          reply.header('Content-Type', register.contentType);
          reply.send(await register.metrics());
        } catch (ex) {
          log(ex)
          reply.code(500);
        }
      }
    })
    .register(fastifyNext, {
      dev: isDev,
      hostname: 'localhost',
      port: _port,
    })
    .after(function (error: Error) {
      fastifyInstance.log.info('hi')
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
