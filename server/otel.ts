import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const { endpoint, port: promPort } = PrometheusExporter.DEFAULT_OPTIONS;
const promExporter = new PrometheusExporter({}, () => {
  console.log(
    `Prometheus scrape endpoint: http://localhost:${promPort}${endpoint}`
  );
});

const traceExporter = new OTLPTraceExporter({
  url: 'http://153.92.214.154:4318/v1/traces',
});

export function getOtelSdk() {
  return new NodeSDK({
    metricReader: promExporter,
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'taramarchand.com',
    }),
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });
}
