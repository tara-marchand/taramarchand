import { FastifyPluginCallback } from 'fastify';
import get from 'lodash.get';

import { User } from '../models/User';

export const signin: FastifyPluginCallback<Record<never, never>> = (
  fastify,
  _options,
  done
) => {
  fastify.route({
    method: 'POST',
    url: '/signin',
    schema: {
      body: {
        schema: { $ref: 'https://www.taramarchand.com/#user' },
      },
      response: {
        200: {
          schema: { $ref: 'https://www.taramarchand.com/#user' },
        },
      },
    },
    handler: async function (request, reply) {
      const body = get(request, 'body') as User | undefined;

      // If username or password is missing, send status code 400/bad request
      if (!body || !body.email || !body.password) {
        return reply.status(400).send('Missing email or password');
      }

      try {
        const userAndToken = await User.authenticate(body.email, body.password);
        const user = userAndToken.user;
        const userAndTokenString = user && User.authorize(user);

        if (userAndTokenString) {
          return reply.serialize(userAndToken);
        }
        return reply.status(500).send('Unable to authenticate');
      } catch (err) {
        return reply.status(400).send('Invalid email or password');
      }
    },
  });
  done();
};

export default signin;
