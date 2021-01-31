import 'core-js/stable';
import React from 'react';
import 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route } from 'react-router-dom';
import 'regenerator-runtime';
import Covid19 from './Covid19';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import { JobHunt } from './JobHunt';
import Resume from './Resume';

const App: React.FunctionComponent<{}> = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Header />
      <main>
        <div className="mx-auto prose pt-6 pb-6">
          <Route exact path="/" component={Home} />
          <Route path="/resume" component={Resume} />
          <Route path="/jobs" component={JobHunt} />
          <Route path="/covid19" component={Covid19} />
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  </ErrorBoundary>
);

export default hot(App);
