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
    <div className="print:hidden inline-flex justify-end items-center">
      <ul className="list-none mt-0 mb-0 pl-0 items-center">{getAllNavLinks()}</ul>
    </div>
  );
};

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
  const className = 'text-gray-900';
  const linkClassName = 'text-gray-600 hover:text-gray-600 hover:underline';

  return (
    <li className="ml-3" key={uuid4()}>
      <MenuLink
        className={className}
        exact={true}
        linkClassName={linkClassName}
        strict
        text={link.label}
        to={link.to}
      >
        {link.label}
      </MenuLink>
    </li>
  );
}

export default withRouter(Nav);
