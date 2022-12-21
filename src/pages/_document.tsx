// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');
import Document, {
  DocumentContext,
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
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<CustomDocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    const browserTimingHeader = newrelic.getBrowserTimingHeader({
      hasToRemoveScriptWrapper: true,
    });

    return {
      ...initialProps,
      browserTimingHeader,
    };
  }

  render() {
    return (
      <Html className="m-0 h-full">
        <Head>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
          />
        </Head>
        <body className="m-0 h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
