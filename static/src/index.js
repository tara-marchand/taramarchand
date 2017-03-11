import '../../node_modules/semantic-ui/dist/semantic.css';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Home from './Home';
import Resume from './Resume';
import Code from './Code';
import Contact from './Contact';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    	<IndexRoute component={Home} />
    	<Route path="/resume" component={Resume} />
    	<Route path="/code" component={Code} />
    	<Route path="/contact" component={Contact} />
    </Route>
  </Router>,
  document.getElementById('root')
);