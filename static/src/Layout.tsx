import React, { PureComponent } from 'react';
import { Route, RouteComponentProps, withRouter } from 'react-router';

import Footer from './components/Footer';
import Header from './components/Header';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Books from './components/views/Books';
import Home from './components/views/Home';
import Japanese from './components/views/Japanese';
import Resume from './components/views/Resume';
import WomensSoccer from './components/views/WomensSoccer';

type Props = RouteComponentProps<any>;

class Layout extends PureComponent<Props> {
  views: { [key: string]: React.ComponentType<any> };

  constructor(props: Props) {
    super(props);

    this.views = {
      books: Books,
      japanese: Japanese,
      resume: Resume,
      'womens-soccer': WomensSoccer
    };
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Nav />
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/:view" render={this.renderView} />
        </main>
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
