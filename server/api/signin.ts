import { FastifyPluginCallback } from 'fastify';

import { fastifyInstance } from '../';
import User from '../models/User';
import { SignupOrSigninRequestBody } from './';

export const signin: FastifyPluginCallback<Record<never, never>> = (
  fastify,
  _options,
  done
) => {
  fastify.route({
    method: 'POST',
    url: '/signin',
    handler: async function (request, reply) {
      const { email, password } = request.body as SignupOrSigninRequestBody;

      const userAndToken = await User.authenticate(
        email,
        password,
        fastifyInstance
      ).catch((error) => {
        throw new Error('Unable to authenticate user');
      });
      reply.send(userAndToken);
    },
  });
  done();
};

export default signin;
