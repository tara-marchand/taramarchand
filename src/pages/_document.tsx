import Document, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import { InferGetServerSidePropsType } from 'next/types';
import React from 'react';

export async function getServerSideProps() {
  // You must require agent and put it within this function
  // otherwise it will try to get bundled by webpack and cause errors.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const newrelic = await import('newrelic');
  const browserTimingHeader: string = newrelic.getBrowserTimingHeader();
  return { props: { browserTimingHeader } };
}

export default class MyDocument extends Document<InferGetServerSidePropsType<typeof getServerSideProps>> {
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
