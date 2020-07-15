import clsx from 'clsx';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

import MenuLink from './MenuLink';

interface LinkData {
  label: string;
  to: string;
}

type Props = RouteComponentProps<any>;

const Nav: React.FC<Props> = () => {
  return (
    <nav className="font-display p-4">
      <ul>{getAllNavLinks()}</ul>
    </nav>
  );
};

function getAllNavLinks() {
  const links: LinkData[] = [
    {
      label: 'Resume',
      to: '/resume'
    }
  ];

  return links.map((link, index) => getOneNavLink(link, index));
}

function getOneNavLink(link: LinkData, index: number) {
  const classes = clsx('hover:underline', 'text-xl');

  return (
    <MenuLink
      className={classes}
      exact={true}
      key={uuid4()}
      strict
      style={{ color: '#270F08' }}
      text={link.label}
      to={link.to}
    >
      {link.label}
    </MenuLink>
  );
}

export default withRouter(Nav);
