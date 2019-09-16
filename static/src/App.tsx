import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GraphQLClient, ClientContext } from 'graphql-hooks'
 
import Layout from './Layout';
import { isDev } from './utils';
import ErrorBoundary from './components/ErrorBoundary';
import resolvers from './resolvers';

interface Props {};

class App extends PureComponent<Props> {
  graphqlClient: GraphQLClient;

  constructor(props) {
    super(props);

    this.graphqlClient = new GraphQLClient({
      // cache: new InMemoryCache(),
      // resolvers,
      url: `${window.location.protocol}//${window.location.host}/gql/graphql`
    });
  }

  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <ClientContext.Provider value={this.graphqlClient}>
            <Layout />
          </ClientContext.Provider>
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

const appExport =
  isDev() && (module as any).hot ? hot(module as any)(App) : App;

export default appExport;
