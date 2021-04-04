import { csrfToken } from 'next-auth/client';
import React from 'react';

interface Props {
  csrfToken: string;
}

function SignIn({ csrfToken }: Props) {
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

SignIn.getInitialProps = (context) => {
  return {
    csrfToken: csrfToken(context),
  };
};

export { SignIn };
