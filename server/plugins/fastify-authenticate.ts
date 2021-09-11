import { FastifyPluginCallback, RouteHandlerMethod } from 'fastify';
import fp from 'fastify-plugin';
import get from 'lodash.get';

import AuthToken from '../models/AuthToken';
import User from '../models/User';

const fastifyAuthenticate = fp(
  function (fastify, _opts, done) {
    fastify.decorate('authenticate', async function (request) {
      const token = request.cookies.auth_token || request.headers.authorization;

      if (token) {
        const authToken = await AuthToken.findOne({
          where: { token },
          include: User,
        });
        const user = authToken?.user;
        if (user) {
          request.user = user;
        }
      }
    } as RouteHandlerMethod);
    done();
  } as FastifyPluginCallback,
  { name: 'fastify-authenticate' }
);

export { fastifyAuthenticate };
