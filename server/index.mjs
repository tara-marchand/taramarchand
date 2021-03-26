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

function build() {
  const LOG_LEVEL = isProd ? 'error' : 'info';

  const fastify = Fastify({ logger: { level: LOG_LEVEL } });
  const nextApp = Next({ dev: isDev });
  const nextRequestHandler = nextApp.getRequestHandler();
  const amplitudeClient = isProd
    ? Amplitude.init(process.env.AMPLITUDE_API_KEY)
    : undefined;
  Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

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

    fastify.post('/api/contact', (req, res) => {
      const { email, message, name } = req.body;
      res.status(200).send(JSON.stringify(req.body));
    });

    fastify.all('/*', (req, reply) => {
      nextRequestHandler(req.raw, reply.raw)
        .then(() => {
          if (isProd) {
            const clientAddress =
              req.headers['x-forwarded-for'] || req.remoteAddress;

            clientAddress &&
              dns.reverse(clientAddress, function (err, domains) {
                if (err) {
                  fastify.log.error(err.toString());
                }
                const hostname = domains && domains.length ? domains[0] : '';

                fastify.log.error({ clientHostname: hostname });

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
              });
          }
          reply.sent = true;
        })
        .catch((error) => {
          fastify.log.error(error);
          reply.sent = true;
        });
    });

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
