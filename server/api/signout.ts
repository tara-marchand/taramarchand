import { FastifyPluginCallback } from 'fastify';

import User from '../models/User';

export const signout: FastifyPluginCallback<Record<never, never>> = (
  fastify,
  _options,
  done
) => {
  fastify.route({
    method: 'DELETE',
    url: '/signout',
    // schema: {
    //   body: { $ref: 'user#' },
    //   response: {
    //     200: { $ref: 'user#' },
    //   },
    // },
    handler: async function (request, reply) {
      const {
        cookies: { auth_token: authToken },
      } = request;

      if (authToken) {
        User.signout && (await User.signout(authToken));
        return reply.status(204).send();
      }

      return reply
        .status(400)
        .send({ errors: [{ message: 'Not authenticated' }] });
    },
  });
  done();
};

export default signout;
