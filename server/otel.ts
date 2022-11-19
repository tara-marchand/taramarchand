import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const traceExporter = new OTLPTraceExporter({
  url: 'http://153.92.214.154:4318/v1/traces',
});

export function getOtelSdk(port: number) {
  return new NodeSDK({
    metricReader: new PrometheusExporter(
      {
        port,
      },
      () => {
        console.log(
          `Prometheus scrape endpoint: http://localhost:${port}${PrometheusExporter.DEFAULT_OPTIONS.endpoint}`
        );
      }
    ),
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'taramarchand.com',
    }),
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });
}
