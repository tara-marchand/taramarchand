import './index.scss';
import 'core-js/stable';
import 'leaflet/dist/leaflet.css';
import 'regenerator-runtime';

import L from 'leaflet';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import WebFont from 'webfontloader';

import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import Books from './components/views/Books';
import Covid19 from './components/views/Covid19';
import Home from './components/views/Home';
import Japanese from './components/views/Japanese';
import Resume from './components/views/Resume';
import SFData from './components/views/SFData';
import WomensSoccer from './components/views/WomensSoccer';
import store from './store';
import { registerServiceWorker } from './utils';

WebFont.load({
  google: {
    families: ['EB Garamond', 'sans-serif']
  }
});

// Disabling service worker until I actually need it for something
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     registerServiceWorker();
//   });
// }

// Hack so that leaflet's images work after going through webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
});

type Props = RouteComponentProps<any>;

const views = {
  books: Books,
  covid19: Covid19,
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

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  import('react-hot-loader').then(hotLoader => {
    const FinalApp = hotLoader.hot(module as any)(App);
    ReactDOM.render(<FinalApp />, document.getElementsByClassName('root')[0]);
  });
} else {
  ReactDOM.render(<App />, document.getElementsByClassName('root')[0]);
}
