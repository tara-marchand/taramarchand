import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

import MenuLink from './MenuLink';
import Nav from './Nav';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <nav
      id="header"
      className="w-full z-10 top-0 bg-white border-b border-gray-400"
    >
      <div className="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">
        <MenuLink
          className="text-gray-900 no-underline font-bold text-3xl"
          exact={true}
          key={uuid4()}
          strict
          text="Tara Marchand"
          to="/"
        />
        <Nav />
      </div>
    </nav>
  );
};

export default withRouter(Header);
