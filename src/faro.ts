'use client';

import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

initializeFaro({
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

