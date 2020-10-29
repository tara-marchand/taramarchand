import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
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
import WebFont from 'webfontloader';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import { Ballot } from './components/views/Ballot';
import Books from './components/views/Books';
import Covid19 from './components/views/Covid19';
import Home from './components/views/Home';
import Japanese from './components/views/Japanese';
import Movies from './components/views/Movies';
import Resume from './components/views/Resume';
import SFData from './components/views/SFData';
import WomensSoccer from './components/views/WomensSoccer';
import './index.scss';
import store from './store';

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
});

WebFont.load({
  google: {
    families: ['EB Garamond', 'sans-serif'],
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

type Props = RouteComponentProps<any>;

const views = {
  ballot: Ballot,
  books: Books,
  covid19: Covid19,
  japanese: Japanese,
  movies: Movies,
  resume: Resume,
  'sf-data': SFData,
  'womens-soccer': WomensSoccer,
};

const renderView = (props: Props) => {
  const View = views[props.match.params.view];

  return View ? <View {...props} /> : <Home />;
};

const App: React.FC<{}> = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <Header />
          <main className="container w-full md:max-w-3xl mx-auto">
            <div className="w-full px-4 md:px-6 text-gray-800 leading-normal">
              <Route exact path="/" component={Home} />
              <Route path="/:view" render={renderView} />
            </div>
          </main>
          <Footer />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  </ApolloProvider>
);

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  import('react-hot-loader').then((hotLoader) => {
    const FinalApp = hotLoader.hot(module as any)(App);
    ReactDOM.render(<FinalApp />, document.getElementsByClassName('root')[0]);
  });
} else {
  ReactDOM.render(<App />, document.getElementsByClassName('root')[0]);
}
