import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import MenuLink from './MenuLink';
import Nav from './Nav';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <nav className="bg-gray-300">
      <div
        className="flex items-center mx-auto pt-6 pb-6"
        /* Max width from prose default */
        style={{ maxWidth: '65ch' }}
      >
        <MenuLink
          className="mr-6 text-3xl underline"
          activeClassName="no-underline"
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
