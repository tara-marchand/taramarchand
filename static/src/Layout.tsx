import React, { PureComponent } from 'react';
import { Route, withRouter, RouteComponentProps } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/Home';
import Japanese from './components/Japanese';
import Resume from './components/Resume';

type Props = RouteComponentProps<any>;

class Layout extends PureComponent<Props> {
  views: { [key: string]: React.ComponentType<any> };

  constructor(props: Props) {
    super(props);

    this.views = {
      japanese: Japanese,
      resume: Resume
    };
  }

  render() {
    const containerStyle = { margin: '0 15%' };

    return (
      <React.Fragment>
        <Header />
        <div style={containerStyle}>
          <Route exact path="/" component={Home} />
          <Route path="/:view" render={this.renderView} />
        </div>
        <Footer />
      </React.Fragment>
    );
  }

  renderView = (props: Props) => {
    const View = this.views[props.match.params.view];

    if (View) {
      return <View {...props} />;
    }
    return <Home />;
  };
}

export default withRouter(Layout);
