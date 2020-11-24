import 'core-js/stable';
import 'leaflet/dist/leaflet.css';
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
      <main className="container w-full px-3 md:max-w-xl mx-auto">
        <div className="w-full py-3 text-gray-800 text-md leading-normal">
          <Route exact path="/" component={Home} />
          <Route path="/resume" component={Resume} />
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  </ErrorBoundary>
);

export default hot(App);
