import 'foundation-sites/scss/foundation.scss'
import 'foundation-icon-fonts/_foundation-icons.scss'
import '../foundation_components.scss'
import '../foundation_settings.scss'

import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import {Route, Switch} from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Resume from '../components/Resume'

class Layout extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className='row'>
          <div className='small-2 columns'>&nbsp;</div>
          <div className='small-8 columns'>
            <Switch>
              <Route exact path='/resume' component={Resume} />
              <Route component={Home} />
            </Switch>
          </div>
          <div className='small-2 columns'>&nbsp;</div>
        </div>
        <Footer />
      </div>
    )
  }
}

Layout.propTypes = {
  location: PropTypes.object.isRequired
}

export default Layout