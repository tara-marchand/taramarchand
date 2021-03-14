import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="m-0">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
