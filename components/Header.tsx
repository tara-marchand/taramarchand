import * as React from 'react';

import MenuLink from './MenuLink';

const Header: React.FunctionComponent = () => {
  return (
    <nav className="bg-gray-300 max-w-prose">
      <div className="py-3">
        <div className="flex">
          <div>
            <MenuLink className="text-3xl" href="/" text="Tara Marchand" />
          </div>
        </div>
        <div className="items-center">
          <div className="flex flex-col">
            <MenuLink href="/resume" text="Resume" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
