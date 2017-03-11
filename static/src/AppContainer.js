import './App.css';

import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Home from './Home';
import Resume from './Resume';
import Code from './Code';
import Contact from './Contact';

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <App />
      </AppContainer>
    );
  }
}

export default App;
