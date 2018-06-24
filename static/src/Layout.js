import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router';
import { Container } from 'semantic-ui-react';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Japanese from './components/Japanese';
import Resume from './components/Resume';

class Layout extends PureComponent {
  constructor(props) {
    super(props);

    this.views = {
      japanese: Japanese,
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

export default withRouter(Layout);
