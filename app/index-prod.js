const newrelic = require('newrelic');
const fastifyCompress = require('fastify-compress');
const fastify = require('fastify');
const middie = require('middie');

const main = require('./main').main;

(async function init() {
  const app = fastify({ logger: true });

  await app.register(middie);

  app.register(fastifyCompress);

  main(app, newrelic);
})();
