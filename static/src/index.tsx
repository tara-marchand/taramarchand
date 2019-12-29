import './index.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

// These 2 imports replace @babel/polyfill https://babeljs.io/docs/en/babel-polyfill
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
