import pino from 'pino';

const pinoOptions = {
  browser: {
    asObject: true,
    serialize: true,
  },
  level: 'debug',
  base: {
    env: process.env.NODE_ENV,
  },
};

export const PinoLogger = () => {
  pino(pinoOptions);
  
  return null;
};
