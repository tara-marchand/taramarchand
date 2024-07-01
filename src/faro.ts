'use client';
import { trace, context } from '@opentelemetry/api';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { FaroSessionSpanProcessor, FaroTraceExporter, TracingInstrumentation } from '@grafana/faro-web-tracing';

const faro = initializeFaro({
  url: 'https://alloy.tmarchand.com/collect',
  apiKey: 'alsdjfo87wr3ksjhdf',
  app: {
    name: 'taramarchand',
    version: '1.0.0',
  },
  instrumentations: [
    ...getWebInstrumentations(),
    new TracingInstrumentation({
      instrumentationOptions: {
        // Requests to these URLs have tracing headers attached.
        propagateTraceHeaderCorsUrls: [new RegExp('https://www.taramarchand.com/*'), new RegExp('http://localhost:3333/*')],
      },
    }),
  ],
});

const provider = new WebTracerProvider({});

provider.addSpanProcessor(
  new FaroSessionSpanProcessor(new BatchSpanProcessor(new FaroTraceExporter({ ...faro })), faro.metas),
);
faro.api.initOTEL(trace, context);

