const opentelemetry = require('@opentelemetry/api');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { Resource } = require('@opentelemetry/resources');
const {
  InMemorySpanExporter,
  SimpleSpanProcessor,
} = require('@opentelemetry/sdk-trace-base');
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const {
  SemanticResourceAttributes,
} = require('@opentelemetry/semantic-conventions');

opentelemetry.diag.setLogger(
  new opentelemetry.DiagConsoleLogger(),
  opentelemetry.DiagLogLevel.INFO
);

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'taramarchand.com',
});

registerInstrumentations(getNodeAutoInstrumentations());

const tracerProvider = new NodeTracerProvider({
  resource,
});
const traceExporter = new InMemorySpanExporter();
const spanProcessor = new SimpleSpanProcessor(traceExporter);
tracerProvider.addSpanProcessor(spanProcessor);

const promExporter = new PrometheusExporter({ preventServerStart: true });
opentelemetry.metrics.setGlobalMeterProvider(promExporter);
