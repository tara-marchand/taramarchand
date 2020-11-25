import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import MenuLink from './MenuLink';
import Nav from './Nav';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <nav className="w-full print:border-b-0 border-b border-gray-400">
      <div className="px-3 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl flex items-center justify-between mx-auto py-3 print:pt-3 print:pb-0">
        <MenuLink
          className="text-black important no-underline font-bold text-3xl"
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
