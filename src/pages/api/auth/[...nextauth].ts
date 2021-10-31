import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';

const expires = 60 * 60;

export default (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, {
    // https://github.com/nextauthjs/next-auth/discussions/871
    callbacks: {
      async jwt(token, user, account) {
        // Signing in
        if (account) {
          return {
            id: account.id,
            accessToken: account.accessToken,
          };
        }

        // Subsequent use of JWT, the user has been logged in before
        if (
          new Date().toISOString() <
          (token.accessTokenExpires as Date).toISOString()
        ) {
          return token;
        }

        // Access token has expired, try to update it
        return await refreshAccessToken(token);
      },

      async session(session: Session, user: JWT | User) {
        session.user = user;
        return session;
      },

      async redirect(url) {
        if (url === '/api/auth/signin') {
          return Promise.resolve('/');
        }
        return Promise.resolve('/api/auth/signin');
      },
    },
    debug: true,
    providers: [
      Providers.Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
  });

async function refreshAccessToken(token: JWT | User) {
  console.log('Refreshing access token');

  try {
    const url = `https://accounts.spotify.com/api/token`;
    const data = {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    };

    // https://github.com/github/fetch/issues/263
    const searchParams = Object.keys(data)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');

    const response = await fetch(url, {
      body: searchParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const refreshToken = await response.json();

    if (!response.ok) {
      throw refreshToken;
    }

    // Give a 10 sec buffer
    const accessTokenExpires = addSeconds(
      new Date(),
      refreshToken.expires_in - 10
    ).toISOString();
    console.log(
      'accessTokenExpires: ',
      new Date(accessTokenExpires).toLocaleTimeString('en-US')
    );

    return {
      ...token,
      accessToken: refreshToken.access_token,
      accessTokenExpires: accessTokenExpires,
      refreshToken: token.refreshToken,
    };
  } catch (error) {
    console.log('Error refreshing access token: ', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const addSeconds = (date: Date, seconds: number) => {
  date.setSeconds(date.getSeconds() + seconds);
  return date;
};
