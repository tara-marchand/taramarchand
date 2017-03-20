import 'foundation-sites/scss/foundation.scss';
import 'foundation-icon-fonts/_foundation-icons.scss';
import '../foundation_components.scss';
import '../foundation_settings.scss';

import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../components/Home';
import Resume from '../components/Resume';
import Footer from '../components/Footer';

const Layout = React.createClass({
  render: () => {
    return (
      <div>
        <Header />
        <div className="row">
          <div className="small-2 columns">&nbsp;</div>
          <div className="small-8 columns">
            <Route exact={true} path="/" component={Home} />
            <Route path="/resume" component={Resume} />
          </div>
          <div className="small-2 columns">&nbsp;</div>
        </div>
        <Footer />
      </div>
    );
  }
});

export default Layout;
