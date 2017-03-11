import React from 'react';
import { Link, Route } from 'react-router-dom';

import Home from '../components/Home';
import Resume from '../components/Resume';

const Layout = React.createClass({
  render: () => {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/Resume" component={Resume} />
      </div>
    );
  }
});

export default Layout;