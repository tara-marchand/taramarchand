if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}
import Airtable from 'airtable';
import Fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifyJwt, { Secret } from 'fastify-jwt';
import fastifyNodemailer from 'fastify-nodemailer';
import fastifyStatic from 'fastify-static';
import get from 'lodash.get';
import Next from 'next';
import NodeCache from 'node-cache';
import nodemailerMailgunTransport from 'nodemailer-mailgun-transport';
import path from 'path';
import { fastifyAuthenticate } from './plugins/fastify-authenticate';
import { fastifySequelize } from './plugins/fastify-sequelize';
import schema from './schemas/index.json';
import { ExtendedFastifyInstance } from './types/fastify';

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';

const LOG_LEVEL = isProd ? 'warn' : 'info';
let fastifyInstance: ExtendedFastifyInstance = Fastify({
  logger: { level: LOG_LEVEL },
});
const nextInstance = Next({ dev: isDev });
const cache = new NodeCache();

function build() {
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

  return nextInstance.prepare().then(() => {
    const authJwtSignature = get(process.env, 'AUTH_JWT_SIGNATURE');
    const mailgunApiKey = get(process.env, 'MAILGUN_API_KEY');
    const mailgunDomain = get(process.env, 'MAILGUN_DOMAIN');

    fastifyInstance.register(fastifyStatic, {
      root: path.join(process.cwd(), 'src/public'),
      prefix: '/public/',
    });

    fastifyInstance.register(fastifyCookie);

    fastifyInstance.register(fastifySequelize);

    authJwtSignature &&
      fastifyInstance.register(fastifyJwt, {
        secret: authJwtSignature as Secret,
      });
    fastifyInstance.register(fastifyAuthenticate);

    mailgunApiKey &&
      mailgunDomain &&
      fastifyInstance.register(
        fastifyNodemailer,
        nodemailerMailgunTransport({
          auth: {
            api_key: mailgunApiKey,
            domain: mailgunDomain,
          },
        })
      );

    const nextHandler = nextInstance.getRequestHandler();

    // Add schemas for API routes
    fastifyInstance.addSchema(schema);

    fastifyInstance.register(import('./api'), { prefix: '/api' });

    fastifyInstance.register(
      (fastify2, opts2, done2) => {
        fastify2.get('/favicon.ico', (_request, reply) => {
          reply.code(404).send();
        });

        fastify2.get('/*', (request, reply) =>
          opts2.nextHandler(request.raw, reply.raw).then(() => {
            reply.sent = true;
          })
        );

        done2();
      },
      { nextHandler }
    );

    fastifyInstance.setNotFoundHandler((request, reply) => {
      nextInstance.render404(request.raw, reply.raw).then(() => {
        reply.sent = true;
        return;
      });
    });

    return fastifyInstance;
  });
}

build()
  .then((fastifyApp: ExtendedFastifyInstance) => {
    const url = `http://localhost:${port}`;
    fastifyApp.log.info({ url }, 'Server is ready');
    fastifyApp.listen(port, '0.0.0.0');
    fastifyInstance = fastifyApp as ExtendedFastifyInstance;
  })
  .catch((error) => console.error(error));

export { cache, fastifyInstance };
