import ApolloClient from 'apollo-boost';
import React, { PureComponent } from 'react';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Layout from './Layout';
import { isDev } from './utils';
import ErrorBoundary from './components/ErrorBoundary';
import resolvers from './resolvers';

interface Props {};

class App extends PureComponent<Props> {
  apolloClient: ApolloClient<any>;

  constructor(props) {
    super(props);

    this.apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      resolvers,
      uri: `${window.location.protocol}//${window.location.host}/graphql`
    });
  }

  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <ApolloProvider client={this.apolloClient}>
            <Layout />
          </ApolloProvider>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

const appExport =
  isDev() && (module as any).hot ? hot(module as any)(App) : App;

export default appExport;
