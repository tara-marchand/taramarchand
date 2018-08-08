import {
  Button,
  Classes,
  Navbar,
  NavbarGroup,
  Alignment
} from '@blueprintjs/core';
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';

type Props = RouteComponentProps<any>;

class Header extends React.PureComponent<Props> {
  render() {
    return (
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <Button className={Classes.MINIMAL}>
            <NavLink to="/">Tara Marchand</NavLink>
          </Button>
          <Button className={Classes.MINIMAL}>
            <NavLink to="/resume">Resume</NavLink>
          </Button>
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default withRouter(Header);
