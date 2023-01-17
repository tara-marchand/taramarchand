import pino, { Level } from 'pino';

export const getPinoLogger = async (logLevel: Level) =>
  pino(
    {
      level: 'info',
      // @see https://github.com/fastify/fastify/blob/69df0e39fa5886fcd8d5411c590a429e16a2c3ae/lib/logger.js#L48
      serializers: {
        req: function asReqValue(req) {
          return {
            method: req.method,
            url: req.url,
            version: req.headers && req.headers['accept-version'],
            hostname: req.hostname,
            remoteAddress: req.ip,
            remotePort: req.socket ? req.socket.remotePort : undefined,
          };
        },
      },
    },
  );
