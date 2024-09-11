'use client';

import { getWebInstrumentations, initializeFaro, InternalLoggerLevel } from '@grafana/faro-web-sdk';
import { FaroSessionSpanProcessor, FaroTraceExporter, TracingInstrumentation } from '@grafana/faro-web-tracing';
import { context, diag, DiagConsoleLogger, DiagLogLevel, trace } from '@opentelemetry/api';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';
import { Resource } from '@opentelemetry/resources';
import { BatchSpanProcessor, WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const VERSION = '1.0.0';
const NAME = 'taramarchand-client';
const COLLECTOR_URL = 'https://alloy.tmarchand.com/collect';

const faro = initializeFaro({
  url: COLLECTOR_URL,
  apiKey: 'alsdjfo87wr3ksjhdf',
  app: {
    name: NAME,
    version: VERSION,
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
  internalLoggerLevel: InternalLoggerLevel.WARN,
});

const resource = Resource.default().merge(
  new Resource({
    [ATTR_SERVICE_NAME]: NAME,
    [ATTR_SERVICE_VERSION]: VERSION,
  })
);

const provider = new WebTracerProvider({ resource });

provider.addSpanProcessor(
  new FaroSessionSpanProcessor(new BatchSpanProcessor(new FaroTraceExporter({ ...faro })), faro.metas),
);

provider.register({
  propagator: new W3CTraceContextPropagator(),
  contextManager: new ZoneContextManager(),
});

const ignoreUrls = [COLLECTOR_URL];

registerInstrumentations({
  instrumentations: [
    new DocumentLoadInstrumentation(),
    new FetchInstrumentation({ ignoreUrls }),
    new XMLHttpRequestInstrumentation({ ignoreUrls }),
  ],
});

faro.api.initOTEL(trace, context);
