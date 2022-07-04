import pino, { Level, LogDescriptor } from 'pino';
import createWriteStreamSync from 'pino-loki';
import pinoPretty from 'pino-pretty';

const pinoLokiOptions = {
  applicationTag: 'taramarchand', // The tag every log file should be logged with
  host: 'http://loki.tmarchand.com', // Pino loki instance IP address and port
  labels: {
    application: 'taramarchand.com',
  },
  silenceErrors: false,
  timeout: 3000, // Set timeout to 3 seconds, default is 30 minutes.
};

export const getPinoLogger = async (logLevel: Level) =>
  pino(
    {
      level: logLevel,
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
      { level: logLevel, stream: getPinoPrettyStream() },
    ])
  );

const getPinoPrettyStream = () =>
  pinoPretty({
    colorize: true,
    // {"level":30,"time":1656818242448,"pid":38346,"msg":"incoming address real ip 127.0.0.1"}
    messageFormat: (log: LogDescriptor, messageKey: string) => {
      const message = log[messageKey] as string;
      return message;
    },
    // '{level}',
    singleLine: true,
  });
