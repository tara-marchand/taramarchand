import React from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <div className="top-bar">
        <div className="top-bar-left">
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li><a href="https://www.linkedin.com/in/trmarch/" target="_blank"><i className="fi-social-linkedin"></i>LinkedIn</a></li>
            <li><a href="https://github.com/tara-marchand" target="_blank"><i className="fi-social-github"></i>GitHub</a></li>
            <li><a href="https://twitter.com/trmarchand" target="_blank"><i className="fi-social-twitter"></i>Twitter</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Footer;
