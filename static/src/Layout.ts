import * as H from 'history';
import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Footer from './components/Footer';
import Header from './components/Header';

import {History} from 'history';
import {match} from 'react-router';
import Home from './components/Home';
import Japanese from './components/Japanese';
import Resume from './components/Resume';

class Layout extends PureComponent<Props> {
  private views: object
  
  constructor(props: Props) {
    super(props);

    this.views = {
      japanese: Japanese,
      resume: Resume
    };
  }

  public render() {
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

  private renderView = props => {
    const View = this.views[props.match.params.view];

    if (View) {
      return <View {...props} />;
    }
    return <Home />;
  };
}

interface Props {
  location: H.Location
  match: match<object>
};

export default withRouter(Layout);
