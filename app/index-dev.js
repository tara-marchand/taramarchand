const fastify = require('fastify');
const HMR = require('fastify-webpack-hmr');
const middie = require('middie');

const config = require('../config/webpack.dev');
const main = require('./main').main;

(async function init() {
  const app = fastify();

  await app.register(middie);

  app.register(HMR, {
    config,
    webpackDev: {
      publicPath: config.output.publicPath,
    },
    webpackHot: { reload: true },
  });

  main(app);
})();
