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
    { level: logLevel },
    // @see https://skaug.dev/node-js-app-with-loki/
    pino.multistream([
      { level: logLevel, stream: await createWriteStreamSync(pinoLokiOptions) },
      { level: logLevel, stream: getPinoPrettyStream() },
    ])
  );

const getPinoPrettyStream = () =>
  pinoPretty({
    colorize: true,
    messageFormat: (log: LogDescriptor, messageKey: string) => {
      let message = log[messageKey];
      return message;
    },
    singleLine: true
  });
