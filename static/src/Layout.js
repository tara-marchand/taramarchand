import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Resume from './components/Resume';
import Photos from './components/Photos';

class Layout extends PureComponent {
  constructor(props) {
    super(props);

    this.views = {
      photos: Photos,
      resume: Resume
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Container text>
          <Route exact path="/" component={Home} />
          <Route path="/:view" render={this.renderView} />
        </Container>
        <Footer />
      </div>
    );
  }

  renderView = props => {
    const View = this.views[props.match.params.view];

    if (View) {
      return <View {...props} />;
    }
    return <Home />;
  };
}

Layout.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(Layout);
