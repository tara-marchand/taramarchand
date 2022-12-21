require('newrelic');
import Document, {
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

type CustomDocumentInitialProps = DocumentInitialProps & {
  browserTimingHeader: string;
};

export default class MyDocument extends Document<CustomDocumentInitialProps> {
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
