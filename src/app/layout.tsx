import Script from 'next/script';

import '../styles/globals.css';
import { newrelicScript } from '../newrelic';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0">
        {/* <ErrorBoundary> */}
        <div className="flex h-screen flex-col font-sans leading-relaxed">
          <Header />
          <main className="container max-w-[80%] mx-auto overflow-y-scroll">
            {children}
          </main>
          <Footer />
        </div>
        {/* </ErrorBoundary> */}
      </body>
      <Script id="nr">{newrelicScript}</Script>
    </html>
  );
}
