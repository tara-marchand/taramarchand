import 'core-js/stable';
import React from 'react';
import 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route } from 'react-router-dom';
import 'regenerator-runtime';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Resume from './Resume';

const App: React.FunctionComponent<{}> = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Header />
      <main className="container px-3 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="w-full py-3 text-gray-800 text-xl leading-normal">
          <Route exact path="/" component={Home} />
          <Route path="/resume" component={Resume} />
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  </ErrorBoundary>
);

export default hot(App);
