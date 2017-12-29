import 'foundation-sites/scss/foundation.scss'
import 'foundation-icon-fonts/_foundation-icons.scss'
import '../foundation_components.scss'
import '../foundation_settings.scss'

import React, {PureComponent} from 'react'
import {Route} from 'react-router'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Resume from '../components/Resume'

export default class Layout extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div className='row'>
          <div className='small-2 columns'>&nbsp;</div>
          <div className='small-8 columns'>
            <Route exact path='/' component={Home} />
            <Route path='/resume' component={Resume} />
          </div>
          <div className='small-2 columns'>&nbsp;</div>
        </div>
        <Footer />
      </div>
    )
  }
}
