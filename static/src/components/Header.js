import React from 'react'
import {Link} from 'react-router-dom'

class Header extends React.Component {
  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Tara Marchand</li>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/resume">Resume</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Header
