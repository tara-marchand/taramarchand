import pino, { Level } from 'pino';
import createWriteStreamSync from 'pino-loki';

const pinoLokiOptions = {
  applicationTag: 'taramarchand', // The tag every log file should be logged with
  host: 'https://loki.tmarchand.com', // Pino loki instance IP address and port
  labels: {
    application: 'taramarchand.com',
  },
  silenceErrors: false,
  timeout: 3000, // Set timeout to 3 seconds, default is 30 minutes.
};

export const getPinoLogger = async (logLevel: Level) =>
  pino(
    {
      level: 'debug',
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
    // @see https://skaug.dev/node-js-app-with-loki/
    pino.multistream([
      { level: logLevel, stream: await createWriteStreamSync(pinoLokiOptions) },
    ])
  );
