import * as React from 'react';

import MenuLink from './MenuLink';

const Header: React.FunctionComponent = () => {
  return (
    <header className="bg-gray-300 p-6 max-w-full">
      <div className="px-6 md:px-0 max-w-xl mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <h1 className="flex m-0">
          <MenuLink className="text-3xl" href="/" text="Tara Marchand" />
        </h1>
        <nav className="items-center md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-900 flex flex-wrap justify-center">
          <MenuLink href="/resume" text="Resume" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
