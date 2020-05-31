import React from 'react';
import Covid19UnitedStates from './unitedStates';
import Covid19World from './world';

type Scope = 'us' | 'world';

export default function Covid19() {
  const [scope, setScope] = React.useState<Scope>('us');

  switch (scope) {
    case 'us':
      return <Covid19UnitedStates />;
      break;

    case 'world':
      return <Covid19World />;
      break;

    default:
      break;
  }
}
