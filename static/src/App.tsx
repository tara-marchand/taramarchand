import ApolloClient from 'apollo-boost';
import React, { PureComponent } from 'react';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import Layout from './Layout';
import { isDev } from './utils';

class App extends PureComponent {
  apolloClient: ApolloClient<any>;

  constructor(props) {
    super(props);

    this.apolloClient = new ApolloClient({
      uri: `${window.location.protocol}//${window.location.host}/graphql`
    });
  }

  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={this.apolloClient}>
          <Layout />
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

const appExport =
  isDev() && (module as any).hot ? hot(module as any)(App) : App;

export default appExport;
