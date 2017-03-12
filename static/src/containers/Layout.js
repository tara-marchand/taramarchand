import React from 'react';
import { Link, Route } from 'react-router-dom';

import Home from '../components/Home';
import Resume from '../components/Resume';

const Layout = React.createClass({
  render: () => {
    return (
      <div>
        <div className="ui pointing menu">
          <Link to="/" className="item">Home</Link>
          <Link to="/resume" className="item">Resume</Link>
        </div>
        <div className="ui container">
          <Route exact path="/" component={Home} />
          <Route exact path="/resume" component={Resume} />
        </div>
      </div>
    );
  }
});

export default Layout;