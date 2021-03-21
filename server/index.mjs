import { v4 as uuid4 } from 'uuid';
import Airtable from 'airtable';
import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import Next from 'next';
import NodeCache from 'node-cache';
import path from 'path';
import dns from 'dns';
import * as Amplitude from '@amplitude/node';

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';

const myCache = new NodeCache();
let amplitudeUserId;

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

function build() {
  const LOG_LEVEL = isProd ? 'error' : 'info';

  const fastify = Fastify({ logger: { level: LOG_LEVEL } });
  const nextApp = Next({ dev: isDev });
  const nextRequestHandler = nextApp.getRequestHandler();
  const amplitudeClient =
    isProd || isDev ? Amplitude.init(process.env.AIRTABLE_API_KEY) : undefined;

  return nextApp.prepare().then(() => {
    fastify.register(fastifyStatic, {
      root: path.join(process.cwd(), 'public'),
      prefix: '/public/',
    });
    fastify.after();

    fastify.get('/_next/*', (req, reply) => {
      nextRequestHandler(req.raw, reply.raw).then(() => {
        reply.sent = true;
      });
    });

    fastify.all('/*', (req, reply) => {
      nextRequestHandler(req.raw, reply.raw).then(() => {
        if (isProd || isDev) {
          const clientAddress =
            req.headers['x-forwarded-for'] || req.remoteAddress;
          fastify.log.info({ clientAddress });
          clientAddress &&
            dns.reverse(clientAddress, function (err, domains) {
              if (err) {
                fastify.log.error(err.toString());
                reply.sent = true;
              }
              const hostname = domains && domains.length ? domains[0] : '';

              fastify.log.info({ clientHostname: hostname });

              if (amplitudeClient) {
                amplitudeUserId = amplitudeUserId ? amplitudeUserId : uuid4();
                amplitudeClient.logEvent({
                  event_type: 'CLIENT_REQUEST',
                  user_id: amplitudeUserId,
                  user_properties: {
                    hostname,
                  },
                });
              }

              reply.sent = true;
            });
        }
        reply.sent = true;
      });
    });

    fastify.setNotFoundHandler((request, reply) => {
      nextApp.render404(request.raw, reply.raw).then(() => {
        reply.sent = true;
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
