import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Resume from './components/Resume'

class Layout extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Container text>
          <Route exact path="/" component={Home} />
          <Route exact path="/resume" component={Resume} />
        </Container>
        <Footer />
      </div>
    )
  }
}

Layout.propTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(Layout)
