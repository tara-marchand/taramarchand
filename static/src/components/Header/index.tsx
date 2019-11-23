import clsx from 'clsx';
import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import uuid4 from 'uuid/v4';

import MenuLink from '../MenuLink';

interface LinkData {
  label: string;
  to: string;
}

type Props = RouteComponentProps<any>;

class Header extends React.PureComponent<Props> {
  render() {
    return (
      <div className="Header bg-gray-300 h-12 w-full pl-4 pr-4 sm:p-0">
        <ul className="container flex items-center h-full mx-auto">
          {this.allNavLinks}
        </ul>
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

    return links.map((link, index) => this.getOneNavLink(link, index));
  }

  getOneNavLink(link: LinkData, index: number) {
    const classes = clsx(
      'flex',
      'h-full',
      'items-center',
      'mr-2',
      'pl-2',
      'pr-2'
    );

    return (
      <MenuLink
        activeClassName="is-active"
        className={classes}
        exact={true}
        key={uuid4()}
        strict
        to={link.to}
      >
        {link.label}
      </MenuLink>
    );
  }
}

export default withRouter(Header);
