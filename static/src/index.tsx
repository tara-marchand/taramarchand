import './index.scss';
import 'core-js/stable';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import 'regenerator-runtime/runtime';

import L from 'leaflet';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import Books from './components/views/Books';
import Home from './components/views/Home';
import Japanese from './components/views/Japanese';
import Resume from './components/views/Resume';
import SFData from './components/views/SFData';
import WomensSoccer from './components/views/WomensSoccer';
import store from './store';
import { isDev } from './utils';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/static/worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// stupid hack so that leaflet's images work after going through webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
});

type Props = RouteComponentProps<any>;

const views = {
  books: Books,
  japanese: Japanese,
  resume: Resume,
  'sf-data': SFData,
  'womens-soccer': WomensSoccer
};

const renderView = (props: Props) => {
  const View = views[props.match.params.view];

  return View ? <View {...props} /> : <Home />;
};

const App: React.FC<{}> = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <Header />
        <Nav />
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/:view" render={renderView} />
        </main>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

const FinalApp = isDev() && (module as any).hot ? hot(module as any)(App) : App;

ReactDOM.render(<FinalApp />, document.getElementsByClassName('root')[0]);
