import Script from 'next/script';

import '../styles/globals.css';
import { newrelicScript } from '../newrelic';
import { Footer } from '../src/Footer';
import { Header } from '../src/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0">
        <div className="flex h-screen flex-col font-sans leading-relaxed">
          <Header />
          <main className="container max-w-[80%] mx-auto overflow-y-scroll">
            {children}
          </main>
          <Footer />
        </div>
      </body>
      <Script id="nr">{newrelicScript}</Script>
    </html>
  );
}
