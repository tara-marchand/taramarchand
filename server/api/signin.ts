import { FastifyPluginCallback } from 'fastify';
import get from 'lodash.get';
import { fastifyInstance } from '..';

import User from '../models/User';

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
      console.log(body);
      // If username or password is missing, send status code 400/bad request
      if (!body || !body.email || !body.password) {
        return reply.status(400).send('Missing email or password');
      }

      try {
        const userAndToken = await User.authenticate(
          body.email,
          body.password,
          fastifyInstance
        );
        const user = userAndToken.user;

        try {
          const userAndTokenString = await User.authorize(user);
          return reply.serialize(userAndTokenString);
        } catch (error) {
          return reply.status(500).send('Unable to authenticate');
        }
      } catch (err) {
        return reply.status(400).send('Invalid email or password');
      }
    },
  });
  done();
};

export default signin;
