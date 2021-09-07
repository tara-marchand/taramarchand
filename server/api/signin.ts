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
    schema: {
      body: {
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['email', 'password'],
      },
    },
    handler: async function (request, reply) {
      const { email, password } = request.body as SignupOrSigninRequestBody;

      const userAndToken = await User.authenticate(
        email,
        password,
        fastifyInstance
      );
      console.log(userAndToken);
      return reply.send(userAndToken);
    },
  });
  done();
};

export default signin;
