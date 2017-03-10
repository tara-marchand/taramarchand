import './App.css';

import React from 'react';
// using an ES6 transpiler, like babel
import { Router, Route, Link } from 'react-router'

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="ui pointing menu">
          <a className="active item">Home</a>
          <a href="/resume" className="item">Resume</a>
          <a className="item">Contact</a>
          <a className="item">Code</a>
        </div>
        <div className="ui container">Hi</div>
      </div>
    );
  }
}

export default App;
