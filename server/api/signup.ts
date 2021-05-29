import bcrypt from 'bcrypt';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import get from 'lodash.get';

import { User } from '../models/User';

export const signup: FastifyPluginCallback<Record<never, never>> = (
  fastify,
  _options,
  done
) => {
  fastify.route({
    method: 'POST',
    url: '/signup',
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
    handler: async function (
      request: FastifyRequest<{ Body: { password: string } }>,
      reply
    ) {
      const body = get(request, 'body');
      let hashedPassword;

      if (body) {
        hashedPassword = bcrypt.hashSync(body.password, 10);

        // Create new user
        try {
          const userData = Object.assign({}, body, {
            password: hashedPassword,
          });
          const user = (await User.create(userData)) as User;
          const userAndToken =
            (await user) && user.authorize && user.authorize();
          const token = get(userAndToken, 'token');
          const id = get(userAndToken, 'user.id');
          const email = get(userAndToken, 'user.email');

          if (token && id && email) {
            return reply.serialize({
              id,
              email,
              token,
            });
          }
        } catch (err) {
          return reply.status(400).send(err);
        }
      }
    },
  });
  done();
};

export default signup;
