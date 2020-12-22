const fastify = require('fastify');
const fastifyCompress = require('fastify-compress');
const middie = require('middie');
const newrelic = require('newrelic');

const main = require('./main').main;

(async function init() {
  const app = fastify({ logger: true });

  await app.register(middie);

  app.register(fastifyCompress);

  main(app, newrelic);
})();
