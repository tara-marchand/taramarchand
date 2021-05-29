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
        schema: { $ref: 'https://www.taramarchand.com/#usersch' },
      },
      response: {
        200: {
          schema: { $ref: 'https://www.taramarchand.com/#usersch' },
        },
      },
    },
    handler: async function (request, reply) {
      const body = get(request, 'body') as User | undefined;

      // if the username /password is missing, use status code 400
      // indicating a bad request was made and send back a message
      if (!body || !body.email || !body.password) {
        return reply
          .status(400)
          .send('Request missing body or email or password param');
      }

      try {
        const userAndToken = await User.authenticate(body.email, body.password);
        const user = userAndToken.user;
        const userAndTokenString = user && user.authorize && user.authorize();

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
