import '../../node_modules/semantic-ui/dist/semantic.css';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Resume from './Resume';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/resume" component={Resume} />
  </Router>,
  document.getElementById('root')
);