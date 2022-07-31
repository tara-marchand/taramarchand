import React, { ReactElement } from 'react';

interface ServerProps {
  type: 'signup' | 'signin';
}

export default function Success(props: ServerProps): ReactElement {
  let message = 'You have signed in.';

  if (props.type === 'signup') {
    message = 'You have signed up.';
  }

  return (
    <div>
      <h2>Success!</h2>
      <p>{message}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      type: context.query.type
    },
  }
}