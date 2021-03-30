import Airtable from 'airtable';
import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import fastifyStatic from 'fastify-static';
import Next from 'next';
import NodeCache from 'node-cache';
import path from 'path';
import './models/index.mjs';
import fastifyNodemailer from 'fastify-nodemailer';
import { fastifyAuthenticate } from './plugins/fastify-authenticate.mjs';
import { routes } from './routes/index.mjs';
import nodemailerMailgunTransport from 'nodemailer-mailgun-transport';

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';

const myCache = new NodeCache();

function build() {
  const LOG_LEVEL = isProd ? 'error' : 'info';

  const fastify = Fastify({ logger: { level: LOG_LEVEL } });
  const nextApp = Next({ dev: isDev });
  Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  return nextApp.prepare().then(() => {
    fastify.register(fastifyJwt, {
      secret: process.env.AUTH_JWT_SIGNATURE,
    });
    fastify.after();

    fastify.register(fastifyAuthenticate);
    fastify.after((error) => {
      fastify.log.error(error);
    });

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
      root: path.join(process.cwd(), 'public'),
      prefix: '/public/',
    });
    fastify.after();

    fastify.register(routes, {
      nextApp,
    });
    fastify.after();

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

export { myCache };
