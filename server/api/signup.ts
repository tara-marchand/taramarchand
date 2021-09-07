import bcrypt from 'bcrypt';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import createHttpError from 'http-errors';
import get from 'lodash.get';

import User from '../models/User';
import { ExtendedFastifyInstance } from '../types/fastify';
import { SignupOrSigninRequestBody } from './';

export const signup: FastifyPluginCallback<Record<never, never>> = (
  fastifyInstance,
  _options,
  done
) => {
  fastifyInstance.route({
    method: 'POST',
    url: '/signup',
    schema: {
      body: {
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['email', 'password'],
      },
    },
    handler: async function (
      request: FastifyRequest<{ Body: SignupOrSigninRequestBody }>,
      reply
    ) {
      const body = get(request, 'body');
      const hashedPassword = bcrypt.hashSync(body.password, 10);
      const userData = { email: body.email, password: hashedPassword };

      (reply.server as ExtendedFastifyInstance).sequelize?.models.User?.create(
        userData
      )
        .then(async (createdUser) => {
          const { token, user } = await User.authorize(createdUser as User);

          reply.send({
            user: { email: user.get('email'), id: user.get('id') },
            token: { id: token.get('id'), token: token.get('token') },
          });
        })
        .catch((error) => reply.send(createHttpError('503', error)));
    },
  });
  done();
};

export default signup;
