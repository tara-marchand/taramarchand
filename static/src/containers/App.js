import React, { PureComponent } from 'react'
import { BrowserRouter, withRouter } from 'react-router-dom'

import Layout from './Layout'

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
  }
}
