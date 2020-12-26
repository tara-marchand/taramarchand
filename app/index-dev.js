const fastify = require('fastify');
const HMR = require('fastify-webpack-hmr');
const middie = require('middie');
const path = require('path');

const main = require('./main').main;

(async function init() {
  const app = fastify({ logger: 'debug' });

  await app.register(middie);

  app.register(HMR, {
    config: path.join(process.cwd(), 'webpack.dev'),
    webpackDev: {
      publicPath: '/static/',
    },
    webpackHot: { reload: true },
  });

  main(app);
})();
