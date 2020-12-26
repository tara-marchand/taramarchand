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
import { JobHunt } from './JobHunt';

const App: React.FunctionComponent<{}> = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Header />
      <main>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/resume" component={Resume} />
          <Route path="/jobs" component={JobHunt} />
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  </ErrorBoundary>
);

export default hot(App);
