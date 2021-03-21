import '../styles/globals.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import store from '../data/store';

const nrSnippet = process.env.NEW_RELIC_SNIPPET;
const counterSnippet = process.env.COUNTER_SNIPPET;

// For browser
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', function (event) {
    // the event object has two special properties:
    console.log(event.promise); // [object Promise] - the promise that generated the error
    console.log(event.reason); // Error: Whoops! - the unhandled error object
  });

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
  return <script dangerouslySetInnerHTML={{ __html: nrSnippet }}></script>;
};

const CounterScript = (): JSX.Element | null => {
  if (!counterSnippet || typeof window !== 'undefined') {
    return null;
  }
  return <script dangerouslySetInnerHTML={{ __html: counterSnippet }}></script>;
};

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const comp = <Component {...pageProps} />;

  return (
    <>
      <Head>
        <title>Tara Marchand</title>
        {process.env.NODE_ENV === 'production' && <NrScript />}
        {process.env.NODE_ENV === 'production' && <CounterScript />}
      </Head>
      <Provider store={store}>
        <ErrorBoundary>
          <div className="font-sans leading-5 grid grid-cols-1 grid-rows-8">
            <Header />
            <main className="row-span-6">
              <div className="px-6 md:px-0 pt-6 pb-6 max-w-xl mx-auto">
                {comp}
              </div>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Provider>
    </>
  );
}

export default MyApp;
