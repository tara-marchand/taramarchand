import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import Home from '../components/Home';
import Resume from '../components/Resume';

const Layout = React.createClass({
  render: () => {
    return (
      <div>
        <ul className="menu">
          <li><NavLink exact={true} to="/" className="item" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/resume" className="item" activeClassName="active">Resume</NavLink></li>
        </ul>
        <div className="row">
          <div className="small-2 columns">&nbsp;</div>
          <div className="small-8 columns">
            <Route exact={true} path="/" component={Home} />
            <Route path="/resume" component={Resume} />
          </div>
          <div className="small-2 columns">&nbsp;</div>
        </div>
      </div>
    );
  }
});

export default Layout;