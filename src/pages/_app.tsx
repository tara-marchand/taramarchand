import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import store from '../data/store';

import '../styles/globals.css';

export async function getServerSideProps() {
  // You must require agent and put it within this function
  // otherwise it will try to get bundled by webpack and cause errors.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const newrelic = require('newrelic');
  const browserTimingHeader = newrelic.getBrowserTimingHeader();
  return {
    props: {
      browserTimingHeader,
    },
  };
}

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tara Marchand</title>
      </Head>
      {process.env.NODE_ENV === 'production' && (
        <div
          dangerouslySetInnerHTML={{ __html: pageProps.browserTimingHeader }}
        />
      )}
      <Provider store={store}>
        <ErrorBoundary>
          <div className="grid-rows-8 grid grid-cols-1 font-sans leading-5">
            <Header />
            <main className="row-span-6">
              <div className="mx-auto max-w-xl px-6 pt-6 pb-6 md:px-0">
                <Component {...pageProps} />
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
