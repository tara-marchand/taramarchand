import { AppProps } from 'next/app';
import Layout from '../components/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  async function getOtel() {
    await import('../otel-browser');
  }
  global.window && getOtel();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
