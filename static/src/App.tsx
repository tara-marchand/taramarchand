import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Layout from './Layout';
import { isDev } from './utils';
import ErrorBoundary from './components/ErrorBoundary';
import store from './store';

interface Props {}

class App extends PureComponent<Props> {
  render() {
    return (
      <Provider store={store}>
        <ErrorBoundary>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </ErrorBoundary>
      </Provider>
    );
  }
}

const appExport =
  isDev() && (module as any).hot ? hot(module as any)(App) : App;

export default appExport;
