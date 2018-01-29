import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Resume from '../components/Resume'

class Layout extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className="pure-g">
          <div className="pure-u-1-5">&nbsp;</div>
          <div className="pure-u-3-5">
            <Route exact path="/" component={Home} />
            <Route exact path="/resume" component={Resume} />
          </div>
          <div className="pure-u-1-5">&nbsp;</div>
        </div>
        <Footer />
      </div>
    )
  }
}

Layout.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Layout)
