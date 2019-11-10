import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
 
import Layout from './Layout';
import { isDev } from './utils';
import ErrorBoundary from './components/ErrorBoundary';

interface Props {};

class App extends PureComponent<Props> {
  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

const appExport =
  isDev() && (module as any).hot ? hot(module as any)(App) : App;

export default appExport;
