import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarGroup
} from '@blueprintjs/core';
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

type Props = RouteComponentProps<any>;

class Footer extends React.PureComponent<Props> {
  render() {
    return (
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <Button className={Classes.MINIMAL}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/trmarch/"
            >
              LinkedIn
            </a>
          </Button>
          <Button className={Classes.MINIMAL}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/tara-marchand"
            >
              GitHub
            </a>
          </Button>
          <Button className={Classes.MINIMAL}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/trmarchand"
            >
              Twitter
            </a>
          </Button>
        </NavbarGroup>
      </Navbar>
    );
  }
}

export default withRouter(Footer);
