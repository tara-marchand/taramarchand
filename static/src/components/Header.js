import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import React, { PureComponent } from 'react';

class Header extends PureComponent {
  render() {
    return (
      <Menu borderless color="black" inverted>
        <Menu.Item as={NavLink} isActive={() => false} exact to="/">
          Tara Marchand
        </Menu.Item>
        <Menu.Item as={NavLink} to="/resume">
          Resume
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Header);
