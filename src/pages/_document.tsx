import Document, { Head, Html, Main, NextScript } from 'next/document';

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
