import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import MenuLink from './MenuLink';

interface LinkData {
  label: string;
  to: string;
}

type Props = RouteComponentProps<any>;

const Nav: React.FC<Props> = () => <div>{getAllNavLinks()}</div>;

function getAllNavLinks() {
  const links: LinkData[] = [
    {
      label: 'Resume',
      to: '/resume',
    },
  ];

  return links.map((link, index) => getOneNavLink(link, index));
}

function getOneNavLink(link: LinkData, index: number) {
  const className = 'underline';
  const activeClassName = 'no-underline';

  return (
    <MenuLink
      activeClassName={activeClassName}
      className={className}
      exact={true}
      key={uuid4()}
      strict
      text={link.label}
      to={link.to}
    >
      {link.label}
    </MenuLink>
  );
}

export default withRouter(Nav);
