import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import MenuLink from './MenuLink';
import Nav from './Nav';
import tw from 'twin.macro';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <nav>
      <div>
        <MenuLink
          className="text-3xl"
          exact={true}
          key={uuid4()}
          strict
          text="Tara Marchand"
          to="/"
          tw="font-bold"
        />
        <Nav />
      </div>
    </nav>
  );
};

export default withRouter(Header);
