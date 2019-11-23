import React, { PureComponent } from 'react';
import { Route, withRouter, RouteComponentProps } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './components/views/Home';
import Japanese from './components/views/Japanese';
import Resume from './components/views/Resume';
import WomensSoccer from './components/views/WomensSoccer';
import Books from './components/views/Books';

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
        <div className="container mt-4 mb-4 mx-auto pl-4 pr-4 sm:p-0">
          <div className="">
            <div className="">
              <Route exact path="/" component={Home} />
              <Route path="/:view" render={this.renderView} />
            </div>
          </div>
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
