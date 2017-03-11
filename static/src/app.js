import './App.css';

import React from 'react';
// using an ES6 transpiler, like babel
import { Router, Route, Link, IndexLink } from 'react-router'

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="ui pointing menu">
          <IndexLink to="/" className="item" activeClassName="active">Home</IndexLink>
          <Link to="/resume" className="item"  activeClassName="active">Resume</Link>
          <Link to="/code" className="item"  activeClassName="active">Code</Link>
          <Link to="/contact" className="item"  activeClassName="active">Contact</Link>
        </div>
        <div className="ui container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
