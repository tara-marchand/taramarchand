import { AppProps } from 'next/app';
import Script from 'next/script';
import Layout from '../components/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Script
        async
        defer
        data-website-id="b4ce9aed-5080-4035-b668-fef77e91772e"
        src="https://umami.tmarchand.com/umami.js"
        strategy="beforeInteractive"
      ></Script>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
