'use client';

import { initializeFaro } from '@grafana/faro-web-sdk';

initializeFaro({
  url: 'https://alloy.tmarchand.com/collect',
  apiKey: 'alsdjfo87wr3ksjhdf',
  app: {
    name: 'taramarchand',
    version: '1.0.0',
  },
});

