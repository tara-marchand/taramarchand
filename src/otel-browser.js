const { WebTracerProvider } = require('@opentelemetry/sdk-trace-web');
const {
  getWebAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-web');
const { ZoneContextManager } = require('@opentelemetry/context-zone');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');

const provider = new WebTracerProvider();
provider.register({
  contextManager: new ZoneContextManager(),
});

registerInstrumentations({
  instrumentations: [getWebAutoInstrumentations()],
});

exports = {
  provider
}