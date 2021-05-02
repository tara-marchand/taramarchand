import './models';

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
import { contactSchema } from './schemas/contact';
import { smsSchema } from './schemas/sms';
import { signupRequest, signupResponse } from './schemas/signup';

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';

const myCache = new NodeCache();

function build() {
  const nextApp = Next({ dev: isDev });
  const airtableApiKey = process.env.AIRTABLE_API_KEY;
  const airtableConfig: any = {};

  if (airtableApiKey) {
    airtableConfig.apiKey = airtableApiKey;

    Airtable.configure(airtableConfig);
  }

  return nextApp.prepare().then(() => {
    const LOG_LEVEL = isProd ? 'error' : 'info';
    const fastify = Fastify({ logger: { level: LOG_LEVEL } });

    fastify.register(fastifyCookie);

    fastify.register(fastifyJwt, {
      secret: process.env.AUTH_JWT_SIGNATURE as Secret,
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
    fastify.addSchema(contactSchema);
    fastify.addSchema(smsSchema);
    fastify.addSchema(signupRequest);
    fastify.addSchema(signupResponse);

    fastify.register(import('./api'), { prefix: '/api' });

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
