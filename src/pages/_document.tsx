import Document, { Head, Html, Main, NextScript } from 'next/document';

import { Logger } from '../components/Logger';
import { Otel } from '../components/Otel';

export default class MyDocument extends Document {
  render() {
    return (
      <Html className="m-0 h-full">
        <Head />
        <body className="m-0 h-full">
          <Logger />
          <Otel />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
