import React from 'react';
import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">Tara Marchand</li>
              <li><NavLink exact={true} to="/">Home</NavLink></li>
              <li><NavLink to="/resume">Resume</NavLink></li>
            </ul>
          </div>
        </div>
    );
  }
}

export default Header;
