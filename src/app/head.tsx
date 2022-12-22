import React from 'react';

import Script from 'next/script';
import { newrelicScript } from '../newrelic';

export default function Head() {
  return (
    <>
      <title>Tara Marchand</title>
      <Script
        id="nr"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: newrelicScript }}
      />
    </>
  );
}
