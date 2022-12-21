import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default class MyDocument extends Document<DocumentInitialProps> {
  render() {
    return (
      <Html className="m-0 h-full">
        <Head />
        <body className="m-0 h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
