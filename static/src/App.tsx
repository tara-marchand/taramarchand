import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import { isDev } from './utils';
import Layout from './Layout';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}

const appExport =
  isDev() && (module as any).hot ? hot(module as any)(App) : App;

export default appExport;