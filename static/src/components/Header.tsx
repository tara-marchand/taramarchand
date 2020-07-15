import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

import MenuLink from './MenuLink';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="font-display p-4" style={{ backgroundColor: '#270F08' }}>
      <ul>
        <MenuLink
          className="text-4xl"
          exact={true}
          key={uuid4()}
          strict
          style={{ color: '#E9EADC' }}
          text="Tara Marchand"
          to="/"
        />
      </ul>
    </header>
  );
};

export default withRouter(Header);
