import Head from 'next/head';
import { browser } from 'process';
import { Provider } from 'react-redux';

import ErrorBoundary from '../components/ErrorBoundary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import store from '../data/store';

type Props = React.PropsWithChildren<{ browserTimingHeader?: string }>;

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

export default function Layout({ browserTimingHeader, children }: Props) {
  return (
    <>
      <Head>
        <title>Tara Marchand</title>
      </Head>
      <Provider store={store}>
        <ErrorBoundary>
          <div className="grid-rows-8 grid grid-cols-1 font-sans leading-5">
            <Header />
            <main className="row-span-6">
              <div className="mx-auto max-w-xl px-6 pt-6 pb-6 md:px-0">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Provider>
    </>
  );
}
