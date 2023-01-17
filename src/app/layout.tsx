import '../styles/globals.css';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Head from './head';
import Script from 'next/script';
import { newrelicScript } from '../newrelic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script
          id="nr"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: newrelicScript }}
        />
        <Head />
      </head>
      <body>
        {/* <ErrorBoundary> */}
          <div className="grid-rows-8 grid grid-cols-1 font-sans leading-relaxed">
            <Header />
            <main className="row-span-6">
              <div className="container mx-auto px-6 pt-6 pb-6 md:px-0">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
