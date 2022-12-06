import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import '@opentelemetry/instrumentation-grpc';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { Resource } from '@opentelemetry/resources';
import * as opentelemetry from '@opentelemetry/sdk-node';
import {
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const promExporter = new PrometheusExporter();
const traceExporter = new InMemorySpanExporter();

const sdk = new opentelemetry.NodeSDK({
  instrumentations: [getNodeAutoInstrumentations()],
  metricReader: promExporter,
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'taramarchand.com',
  }),
  spanProcessor: new SimpleSpanProcessor(traceExporter),
  traceExporter,
});

sdk
  .start()
  .then(() => console.log('OpenTelemetry Node SDK initialized'))
  .catch((error) =>
    console.log('Error initializing OpenTelemetry Node SDK', error)
  );

export { promExporter, sdk };
