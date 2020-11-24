import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import amplitude, { AmplitudeClient } from 'amplitude-js';
import 'core-js/stable';
import Highcharts from 'highcharts';
import L from 'leaflet';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import 'regenerator-runtime';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Resume from './components/Resume';
import store from './data/store';
import './index.scss';

const amp: AmplitudeClient = amplitude.getInstance(
  process.env.AMPLITUDE_API_KEY
);
process.env.AMPLITUDE_API_KEY &&
  amp.init(process.env.AMPLITUDE_API_KEY, undefined, {
    includeUtm: true,
    includeReferrer: true,
  });

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
});

// Hack so that leaflet's images work after going through webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
});

const client = new ApolloClient({
  uri: 'http://localhost:3000/admin/api',
  cache: new InMemoryCache(),
});

const App: React.FC<{}> = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <Header />
          <main className="container w-full px-3 md:max-w-xl mx-auto">
            <div className="w-full py-3 text-gray-800 text-sm leading-normal">
              <Route exact path="/" component={Home} />
              <Route path="/resume" component={Resume} />
            </div>
          </main>
          <Footer />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </ApolloProvider>
);

amp.logEvent('APP_RENDER');

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  import('react-hot-loader').then((hotLoader) => {
    const FinalApp = hotLoader.hot(module as any)(App);
    ReactDOM.render(<FinalApp />, document.getElementsByClassName('root')[0]);
  });
} else {
  ReactDOM.render(<App />, document.getElementsByClassName('root')[0]);
}
