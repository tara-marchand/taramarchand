import bcrypt from 'bcrypt';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import createHttpError from 'http-errors';
import get from 'lodash.get';

import User from '../models/User';
import { ExtendedFastifyInstance } from '../types/fastify';
import { SignupOrSigninRequestBody } from './';

type SignupRequest = FastifyRequest<{
  Body: { email: string; password: string };
}>;

export const signup: FastifyPluginCallback<Record<never, never>> = (
  fastifyInstance,
  _options,
  done
) => {
  fastifyInstance.route({
    method: 'POST',
    url: '/signup',
    handler: function (request: SignupRequest, reply) {
      const { email, password } = request.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const userData = { email, password: hashedPassword };

      (reply.server as ExtendedFastifyInstance).sequelize?.models.User?.create(
        userData
      )
        .then(async (createdUser) => {
          const tokenAndUser = await User.authorize(createdUser as User).catch(
            (error) => {
              throw new Error('Unable to authorize user');
            }
          );
          const { email, id: userId } = tokenAndUser.user;
          const { id: tokenId, token } = tokenAndUser.token;

          reply.send({
            user: { email, id: userId },
            token: { id: tokenId, token },
          });
        })
        .catch((error) => {
          throw new Error('Unable to create user');
        });
    },
  });
  done();
};

export default signup;
