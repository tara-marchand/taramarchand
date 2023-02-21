import Script from 'next/script';

import { newrelicScript } from '../newrelic';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import Head from './head';
import { isProd } from '../data/utils';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {isProd() && <Script
          id="nr"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: newrelicScript }}
        />}
        <Head />
      </head>
      <body className="m-0">
        {/* <ErrorBoundary> */}
        <div className="flex h-screen flex-col font-sans leading-relaxed">
          <Header />
          <main className="container max-w-[80%] mx-auto overflow-y-scroll">{children}</main>
          <Footer />
        </div>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
