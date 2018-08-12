import cx from 'classnames';
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Link, matchPath } from 'react-router-dom';
import uuid4 from 'uuid/v4';

import MenuLink from '../MenuLink';

interface LinkData {
  label: string;
  to: string;
}

type Props = RouteComponentProps<any>;

class Header extends React.PureComponent<Props> {
  render() {
    const offsetStyle = { paddingLeft: '15%' };

    return (
      <div className="top-bar" style={offsetStyle}>
        <div className="top-bar-left">
          <ul className="menu">{this.allNavLinks}</ul>
        </div>
      </div>
    );
  }

  get allNavLinks() {
    const links: LinkData[] = [
      {
        label: 'Tara Marchand',
        to: '/'
      },
      {
        label: 'Resume',
        to: '/resume'
      }
    ];

    return links.map(link => this.getOneNavLink(link));
  }

  getOneNavLink(link: LinkData) {
    return (
      <MenuLink
        activeClassName="is-active"
        exact={true}
        key={uuid4()}
        strict
        to={link.to}
      >
        <span>{link.label}</span>
      </MenuLink>
    );
  }
}

export default withRouter(Header);
