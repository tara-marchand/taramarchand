import Document, {
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

type Props = DocumentProps & {
  browserTimingHeader?: string;
};

export async function getServerSideProps() {
  // You must require agent and put it within this function
  // otherwise it will try to get bundled by webpack and cause errors.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const newrelic = await import('newrelic');
  const browserTimingHeader: string = newrelic.getBrowserTimingHeader();
  return { props: { browserTimingHeader } };
}

export default class MyDocument extends Document<Props> {
  render() {
    const { browserTimingHeader } = this.props;

    return (
      <Html>
        <Head />
        {process.env.NEXT_PUBLIC_NODE_ENV === 'production' &&
          browserTimingHeader && (
            <div dangerouslySetInnerHTML={{ __html: browserTimingHeader }} />
          )}
        <body className="m-0">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
