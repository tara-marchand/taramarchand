import 'foundation-sites/scss/foundation.scss';
import 'foundation-icon-fonts/_foundation-icons.scss';
import '../foundation_components.scss';
import '../foundation_settings.scss';

import React from 'react';
import { Route } from 'react-router-dom';

import Nav from '../components/Nav';
import Home from '../components/Home';
import Resume from '../components/Resume';

const Layout = React.createClass({
  render: () => {
    return (
      <div>
        <Nav />
        <div className="row">
          <div className="small-2 columns">&nbsp;</div>
          <div className="small-8 columns">
            <Route exact={true} path="/" component={Home} />
            <Route path="/resume" component={Resume} />
          </div>
          <div className="small-2 columns">&nbsp;</div>
        </div>
        <footer className="footer">
          <div className="row">
            <div className="small-12 columns">
              <p className="links">
                <a href="https://www.linkedin.com/in/trmarch/" target="_blank"><i className="fi-social-linkedin"></i>LinkedIn</a>
                <a href="https://github.com/tara-marchand" target="_blank"><i className="fi-social-github"></i>GitHub</a>
                <a href="https://twitter.com/trmarchand" target="_blank"><i className="fi-social-twitter"></i>Twitter</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
});

export default Layout;
