import * as React from 'react';

import MenuLink from './MenuLink';

const Header: React.FunctionComponent = () => {
  return (
    <header className="max-w-full bg-gray-300 p-6">
      <div className="mx-auto flex container flex-col flex-wrap items-center px-6 md:flex-row md:px-0">
        <h1 className="m-0 flex">
          <MenuLink className="text-3xl" href="/" text="Tara Marchand" />
        </h1>
        <nav className="flex flex-wrap items-center justify-center md:mr-auto md:ml-4 md:border-l md:border-gray-900 md:py-1 md:pl-4">
          <MenuLink className="mr-4" href="/resume" text="Resume" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
