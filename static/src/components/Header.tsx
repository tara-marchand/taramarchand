import * as React from 'react';
import { withRouter } from 'react-router-dom';
import uuid4 from 'uuid';

import MenuLink from './MenuLink';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="bg-indigo-200 font-display p-4">
      <ul>
        <MenuLink
          activeClassName="is-active"
          className="text-4xl text-white"
          exact={true}
          key={uuid4()}
          strict
          text="Tara Marchand"
          to="/"
        />
      </ul>
    </header>
  );
};

export default withRouter(Header);
