import '../styles/globals.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React, { useContext } from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import store from '../data/store';
import { isProd } from '../data/utils';

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

const AmplitudeContext = React.createContext<amplitude.AmplitudeClient | null>(
  null
);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  let amplitudeInstance;

  if (typeof window !== 'undefined' && isProd()) {
    import('amplitude-js').then((amplitude) => {
      const ampApiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

      if (ampApiKey) {
        const amplitudeInstance = amplitude.getInstance(ampApiKey);
        amplitudeInstance.init(ampApiKey, undefined, {
          includeUtm: true,
          includeReferrer: true,
        });

        const identify = new amplitudeInstance.Identify();
        amplitudeInstance.identify(identify);
      }
    });
  }

  const comp = (
    <AmplitudeContext.Provider value={amplitudeInstance}>
      <Component {...pageProps} />
    </AmplitudeContext.Provider>
  );

  return (
    <>
      <Head>
        <title>Tara Marchand</title>
        {isProd() && <NrScript />}
        {isProd() && <CounterScript />}
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

export const useAmplitude = () =>
  useContext<amplitude.AmplitudeClient | null>(AmplitudeContext);
export default MyApp;
