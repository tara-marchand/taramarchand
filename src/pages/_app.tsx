import '../styles/globals.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { Provider } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import store from '../data/store';
import { isProd } from '../data/utils';
import { AmplitudeClient } from 'amplitude-js';

type AmplitudeContextType = {
  ampInstance?: AmplitudeClient;
  setAmpInstance: React.Dispatch<
    React.SetStateAction<AmplitudeClient | undefined>
  >;
} | null;

const nrSnippet = process.env.NEW_RELIC_SNIPPET;
const counterSnippet = process.env.COUNTER_SNIPPET;
const postHogSnippet = process.env.POSTHOG_SNIPPET;

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

const PostHogScript = (): JSX.Element | null => {
  if (!postHogSnippet || typeof window !== 'undefined') {
    return null;
  }
  return <script dangerouslySetInnerHTML={{ __html: postHogSnippet }}></script>;
};

const AmplitudeContext = React.createContext<AmplitudeContextType>(null);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [ampInstance, setAmpInstance] = useState<AmplitudeClient>();
  const [isAmpInited, setIsAmpInited] = useState<boolean>();
  const amp = { ampInstance, setAmpInstance };

  if (typeof window !== 'undefined' && isProd()) {
    const ampApiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

    if (ampApiKey) {
      if (!ampInstance) {
        import('amplitude-js').then((amplitude) => {
          setAmpInstance(amplitude.getInstance(ampApiKey));
        });
      }

      ampInstance &&
        !isAmpInited &&
        ampInstance.init(
          ampApiKey,
          undefined,
          {
            includeUtm: true,
            includeReferrer: true,
          },
          () => setIsAmpInited(true)
        );
    }
  }

  const comp = (
    <AmplitudeContext.Provider value={amp}>
      <Component {...pageProps} />
    </AmplitudeContext.Provider>
  );

  return (
    <>
      <Head>
        <title>Tara Marchand</title>
        {isProd() && <NrScript />}
        {isProd() && <CounterScript />}
        {isProd() && <PostHogScript />}
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
  useContext<AmplitudeContextType>(AmplitudeContext);
export default MyApp;
