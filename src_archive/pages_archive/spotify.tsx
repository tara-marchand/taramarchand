import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Component() {
  const [loading, session] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('spotify')}>Sign in</button>
    </>
  );
}
