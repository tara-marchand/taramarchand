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
    <div
      id="nav-content"
      className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20"
    >
      <ul className="list-reset lg:flex justify-end flex-1 items-center">
        {getAllNavLinks()}
      </ul>
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
  const className = 'inline-block py-2 px-4 text-gray-900';
  const linkClassName = 'text-gray-600 hover:text-gray-600 hover:underline';

  return (
    <li className="mr-3" key={uuid4()}>
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
