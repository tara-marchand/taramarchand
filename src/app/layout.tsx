import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
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
      <body className="prose m-0 max-w-none prose-h2:mt-6 prose-h3:mb-0.5 prose-a:text-gray-500 prose-a:no-underline hover:prose-a:text-gray-800 prose-ul:mt-0">
        {/* <ErrorBoundary> */}
        <div className="flex h-screen flex-col font-sans leading-relaxed">
          <Header />
          <main className="container mx-auto overflow-y-scroll">{children}</main>
          <Footer />
        </div>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
