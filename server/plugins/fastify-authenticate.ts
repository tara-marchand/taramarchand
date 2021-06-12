import { FastifyPluginCallback, RouteHandlerMethod } from 'fastify';
import fp from 'fastify-plugin';
import AuthToken from '../models/AuthToken';

import User from '../models/User';
import { sequelize } from '../sequelize';

const fastifyAuthenticate = fp(
  function (fastify, _opts, done) {
    fastify.decorate('authenticate', async function (request) {
      const token = request.cookies.auth_token || request.headers.authorization;

      if (token) {
        const authToken = await sequelize.models.AuthModel.find({
          where: { token },
          include: User,
        });

        if (authToken) {
          request.user = authToken.User;
        }
      }
    } as RouteHandlerMethod);
    done();
  } as FastifyPluginCallback,
  { name: 'fastify-authenticate' }
);

export { fastifyAuthenticate };
