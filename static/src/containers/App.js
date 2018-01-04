import React, {PureComponent} from 'react';
import {BrowserRouter, withRouter} from 'react-router-dom'

import Layout from './Layout'

export default class App extends PureComponent {
  render() {
    const LayoutWithRouter = withRouter(Layout)

    return (
      <BrowserRouter>
        <LayoutWithRouter />
      </BrowserRouter>
    )
  }
}
