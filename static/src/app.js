import './App.css';

import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from './Home';
import Resume from './Resume';
import Code from './Code';
import Contact from './Contact';

class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/resume" component={Resume} />
          <Route path="/code" component={Code} />
          <Route path="/contact" component={Contact} />
        </Route>
      </Router>
    )
  }
}

export default App;
