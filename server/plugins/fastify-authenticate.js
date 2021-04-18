const fp = require('fastify-plugin');
const models = require('../models');

const fastifyAuthenticate = fp(
  function (fastify, _opts, done) {
    fastify.decorate('authenticate', async function (request, _reply, done2) {
      const token = request.cookies.auth_token || request.headers.authorization;

      if (token) {
        const authToken = await models.AuthToken.find({
          where: { token },
          include: models.User,
        });

        if (authToken) {
          request.user = authToken.User;
        }
      }
      done2();
    });
    done();
  },
  { name: 'fastify-authenticate' }
);

module.exports = { fastifyAuthenticate };
