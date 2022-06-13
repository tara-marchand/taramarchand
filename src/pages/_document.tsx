import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Script } from 'next/script';

import { newRelicBrowserAgent } from '../utils/newRelicBrowserAgent';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && (
            <script
              dangerouslySetInnerHTML={{ __html: newRelicBrowserAgent }}
            />
          )}
        </Head>
        <body className="m-0">
          <Main />
          <NextScript />
          <Script
              async
              defer
              data-website-id="b4ce9aed-5080-4035-b668-fef77e91772e"
              src="https://umami.tmarchand.com/umami.js"
              strategy="beforeInteractive"
            ></Script>
        </body>
      </Html>
    );
  }
}
