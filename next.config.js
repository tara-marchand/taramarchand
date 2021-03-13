const fs = require('fs');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  console.log(
    `isDev: ${isDev} -- isProd: ${isProd} -- isStaging: ${isStaging}`
  );

  const env = {
    NEW_RELIC_SNIPPET: (() => {
      if (isDev || isStaging) {
        return;
      }
      if (isProd) {
        return fs.readFileSync('./utils/newRelicSnippet.ts').toString();
      }
    })(),
    COUNTER_SNIPPET: (() => {
      if (isDev || isStaging) {
        return;
      }
      if (isProd) {
        return fs.readFileSync('./utils/counterSnippet.ts').toString();
      }
    })(),
  };

  const typescript = {
    ignoreBuildErrors: true,
  };

  // next.config.js object
  return {
    env,
    typescript,
  };
};
