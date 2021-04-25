import Airtable from 'airtable';
import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import fastifyStatic from 'fastify-static';
import fastifyCookie from 'fastify-cookie';
import Next from 'next';
import NodeCache from 'node-cache';
import path from 'path';
import './models';
import fastifyNodemailer from 'fastify-nodemailer';
import { fastifyAuthenticate } from './plugins/fastify-authenticate';
import nodemailerMailgunTransport from 'nodemailer-mailgun-transport';

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';

const myCache = new NodeCache();

function build() {
  const nextApp = Next({ dev: isDev });

  Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  return nextApp.prepare().then(() => {
    const LOG_LEVEL = isProd ? 'error' : 'info';
    const fastify = Fastify({ logger: { level: LOG_LEVEL } });

    fastify.register(fastifyCookie);

    fastify.register(fastifyJwt, {
      secret: process.env.AUTH_JWT_SIGNATURE,
    });

    fastify.register(fastifyAuthenticate);

    fastify.register(
      fastifyNodemailer,
      nodemailerMailgunTransport({
        auth: {
          api_key: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
        },
      })
    );

    fastify.register(fastifyStatic, {
      root: path.join(process.cwd(), 'src/public'),
      prefix: '/public/',
    });

    const nextHandler = nextApp.getRequestHandler();

    // Add schemas for API routes
    fastify.addSchema(require('./schemas/user'));

    fastify.register(require('./api'), { prefix: '/api' });
    fastify.register(require('./api/users'), { prefix: '/api/users' });

    fastify.register(
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

    fastify.setNotFoundHandler((request, reply) => {
      nextApp.render404(request.raw, reply.raw).then(() => {
        reply.sent = true;
        return;
      });
    });

    return fastify;
  });
}

build()
  .then((fastifyApp) => {
    const url = `http://localhost:${port}`;
    fastifyApp.log.info({ url }, 'Server is ready');
    fastifyApp.listen(port, '0.0.0.0');
  })
  .catch((error) => console.error(error));

export default { myCache };
