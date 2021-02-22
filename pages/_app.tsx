import { AmplitudeClient } from 'amplitude-js';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../data/store';
import '../styles/globals.css';

let nrSnippet: string | undefined;

// For browser
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', function (event) {
    // the event object has two special properties:
    console.log(event.promise); // [object Promise] - the promise that generated the error
    console.log(event.reason); // Error: Whoops! - the unhandled error object
  });

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    nrSnippet = process.env.NEW_RELIC_SNIPPET;
  }

  import('highcharts').then((Highcharts) => {
    Highcharts.setOptions({
      lang: {
        decimalPoint: '.',
        thousandsSep: ',',
      },
    });
  });
}

const NrScript = (): JSX.Element | null => {
  if (!nrSnippet || typeof window !== 'undefined') {
    return null;
  }
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: nrSnippet }}
    ></script>
  );
};

interface CompProps {
  amplitude?: AmplitudeClient;
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const compProps: CompProps = {};

  let amplitude: AmplitudeClient | undefined;
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    import('../utils/amplitude').then((importedAmp) => {
      amplitude = importedAmp.amplitudeInstance;
    });
  }
  compProps.amplitude = amplitude;

  const comp = <Component {...pageProps} amplitude={amplitude} />;

  if (process.env.NODE_ENV === 'production') {
    return (
      <>
        <Head>
          <NrScript />
        </Head>
        <Provider store={store}>{comp}</Provider>
      </>
    );
  }
  return <Provider store={store}>{comp}</Provider>;
}

export default MyApp;
