'use client';

import { initializeFaro } from '@grafana/faro-web-sdk';

console.log('hi')
initializeFaro({
  url: 'http://153.92.214.154:8027/collect',
  apiKey: 'alsdjfo87wr3ksjhdf',
  app: {
    name: 'frontend',
    version: '1.0.0',
  },
});

