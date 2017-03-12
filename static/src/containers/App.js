import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter'

import Layout from './Layout'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    )
  }
}

export default App;
