import { NextPageContext } from 'next';
import { csrfToken } from 'next-auth/client';
import React from 'react';

interface InitialProps {
  csrfToken: string;
}

export default function SignIn({
  csrfToken,
}: InitialProps): React.ReactElement {
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="text" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}

SignIn.getInitialProps = async (context: NextPageContext) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
