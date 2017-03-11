import React from 'react';
import Route from 'react-router-dom/Route'

import Home from './Home';
import Resume from './Resume';
import Code from './Code';
import Contact from './Contact';

class Routes extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/resume" component={Resume} />
      </div>
    )
  }
}

export default Routes;
