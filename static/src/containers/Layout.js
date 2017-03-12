import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import Home from '../components/Home';
import Resume from '../components/Resume';

const Layout = React.createClass({
  render: () => {
    return (
      <div>
        <div className="ui pointing menu">
          <NavLink exact={true} to="/" className="item" activeClassName="active">Home</NavLink>
          <NavLink to="/resume" className="item" activeClassName="active">Resume</NavLink>
        </div>
        <div className="ui container">
          <Route exact={true} path="/" component={Home} />
          <Route path="/resume" component={Resume} />
        </div>
      </div>
    );
  }
});

export default Layout;