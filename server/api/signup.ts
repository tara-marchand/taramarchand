import bcrypt from 'bcrypt';
import { FastifyPluginCallback, FastifyRequest } from 'fastify';
import get from 'lodash.get';
import createHttpError from 'http-errors';

import User from '../models/User';
import { ExtendedFastifyInstance } from '../types/fastify';

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
        schema: { $ref: 'https://www.taramarchand.com/#user' },
      },
      response: {
        200: {
          schema: { $ref: 'https://www.taramarchand.com/#signup-reply' },
        },
      },
    },
    handler: async function (
      request: FastifyRequest<{ Body: { email: string; password: string } }>,
      reply
    ) {
      const fastifyInstance = reply.server as ExtendedFastifyInstance;
      const sequelizeInstance = fastifyInstance.sequelize;

      const body = get(request, 'body');
      const password = get(body, 'password');

      const createUser = () => {
        const userModelCtor = sequelizeInstance?.models.User;
        fastifyInstance.log.info(userModelCtor);
        if (!userModelCtor) {
          reply.send(
            createHttpError(503, 'Unable to get user model controller')
          );
          return;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const userData = Object.assign({}, body, {
          password: hashedPassword,
        });
        return userModelCtor?.build(userData);
      };

      if (body && password) {
        try {
          const newUserInstance = createUser();
          if (!newUserInstance) {
            reply.send(
              createHttpError(503, 'Unable to create new user instance')
            );
            return;
          }

          await newUserInstance.save();
          const newUserInstanceAndToken = await User.authorize(
            newUserInstance as User
          );

          reply.send(newUserInstanceAndToken);
          return;
        } catch (error) {
          reply.send(error);
          return;
        }
      } else {
        reply.send(createHttpError(400));
        return;
      }
    },
  });
  done();
};

export default signup;
