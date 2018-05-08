import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import './index.scss'
import App from './App'
import { isDev } from './utils'

const _isDev = isDev()

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

const renderHotApp = () => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  )
}

if (_isDev && module.hot) {
  renderHotApp()
  module.hot.accept('./App', () => {
    renderHotApp()
  })
} else {
  renderApp()
}
