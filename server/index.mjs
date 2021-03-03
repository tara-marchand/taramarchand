import Airtable from 'airtable';
import Fastify from 'fastify';
import fastifyStatic from 'fastify-static';
import Next from 'next';
import NodeCache from 'node-cache';
import path from 'path';

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';

const myCache = new NodeCache();

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

function build() {
  const LOG_LEVEL = isProd ? 'error' : 'debug';

  const fastify = Fastify({ logger: { level: LOG_LEVEL } });
  const nextApp = Next({ dev: isDev });
  const nextRequestHandler = nextApp.getRequestHandler();

  return nextApp.prepare().then(() => {
    fastify.register(fastifyStatic, {
      root: path.join(process.cwd(), 'public'),
      prefix: '/public/',
    });
    fastify.after();

    if (isDev) {
      fastify.get('/_next/*', (req, reply) => {
        nextRequestHandler(req.raw, reply.raw).then(() => {
          reply.sent = true;
        });
      });
    }

    fastify.all('/*', (req, reply) => {
      nextRequestHandler(req.raw, reply.raw).then(() => {
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
    fastifyApp.listen(port);
  })
  .catch((error) => console.error(error));

export { myCache };
