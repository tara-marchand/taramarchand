import Document, { Head, Html, Main, NextScript } from 'next/document';

import { newRelicBrowserAgent } from '../utils/newRelicBrowserAgent';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && <script
            dangerouslySetInnerHTML={{ __html: newRelicBrowserAgent }}
          />}
        </Head>
        <body className="m-0">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
