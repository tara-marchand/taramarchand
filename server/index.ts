import fastifyCookie from '@fastify/cookie';
import fastifyFormbody from '@fastify/formbody';
import fastifyNext from '@fastify/nextjs';
import Airtable from 'airtable';
import Fastify from 'fastify';
import get from 'lodash.get';
import NodeCache from 'node-cache';
import pino from 'pino';
import { collectDefaultMetrics, register } from 'prom-client';

import { fastifySequelize } from './plugins/fastify-sequelize';
import schema from './schemas/index.json';

type ContactRequestBody = {
  email: string;
  message: string;
  name: string;
};

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const logLevel = isProd ? 'warn' : 'debug';

const port = process.env.PORT || 3333;
const cache = new NodeCache();

const transport = pino.transport({
  target: 'pino-loki',
  options: {
    labels: { application: 'taramarchand.com' },
    logLevel,
    host: 'https://loki.tmarchand.com',
  },
})
// const logger = pino(
//   transport
// );

collectDefaultMetrics();

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
  const fastifyInstance = Fastify({
    logger: { level: logLevel },
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
          console.log(ex);
          reply.code(500);
        }
      },
    })
    .register(fastifyNext, {
      dev: isDev,
      hostname: 'localhost',
      port: _port,
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
