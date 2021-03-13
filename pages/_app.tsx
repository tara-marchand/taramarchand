import '../styles/globals.css';

import { AmplitudeClient } from 'amplitude-js';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import store from '../data/store';

let nrSnippet: string | undefined;
let counterSnippet: string | undefined;

// For browser
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', function (event) {
    // the event object has two special properties:
    console.log(event.promise); // [object Promise] - the promise that generated the error
    console.log(event.reason); // Error: Whoops! - the unhandled error object
  });

  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    nrSnippet = process.env.NEW_RELIC_SNIPPET;
    counterSnippet = process.env.COUNTER_SNIPPET;
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
  if (!nrSnippet || typeof window === 'undefined') {
    return null;
  }
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: nrSnippet }}
    ></script>
  );
};

const CounterScript = (): JSX.Element | null => {
  if (!counterSnippet || typeof window === 'undefined') {
    return null;
  }
  return (
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: counterSnippet }}
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

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Head>
          <NrScript />
          <CounterScript />
        </Head>
      )}
      <Provider store={store}>
        <ErrorBoundary>
          <div className="grid grid-cols-1 grid-rows-8">
            <Header />
            <main className="row-span-6">
              <div className="mx-auto prose prose-m pt-6 pb-6">{comp}</div>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Provider>
    </>
  );
}

export default MyApp;
