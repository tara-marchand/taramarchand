const userSchema = require('../../schemas/user');
const models = require('../../models');
const bcrypt = require('bcrypt');

module.exports = function users(fastify, _opts, done) {
  // Create new user
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: userSchema,
      response: {
        200: userSchema,
      },
    },
    handler: async function (request, reply) {
      const hashedPassword = bcrypt.hashSync(request.body.password, 10);

      try {
        const user = await models.User.create(
          Object.assign(request.body, { password: hashedPassword })
        );
        // Data will be an object with the user and its `AuthToken`
        const userData = await user.authorize();

        // Send back the new user and auth token to the client
        return reply.json(userData);
      } catch (err) {
        return reply.status(400).send(err);
      }
    },
  });

  // Get user by ID
  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: userSchema,
    handler: async function (request, reply) {
      models.User.findOne(request.params.id).then((user) => {
        reply.send(user);
      });
    },
  });

  // Log in
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: { $ref: 'userSchema#' },
      response: {
        200: { $ref: 'userSchema#' },
      },
    },
    handler: async function (request, reply) {
      const { email, password } = request.body;

      // if the username / password is missing, we use status code 400
      // indicating a bad request was made and send back a message
      if (!email || !password) {
        return reply
          .status(400)
          .send('Request missing email or password param');
      }

      try {
        let user = await models.User.authenticate(email, password);
        user = await user.authorize();

        return reply.json(user);
      } catch (err) {
        return reply.status(400).send('Invalid email or password');
      }
    },
  });

  // Log out
  fastify.route({
    method: 'DELETE',
    url: '/logout',
    schema: {
      body: { $ref: 'userSchema#' },
      response: {
        200: { $ref: 'userSchema#' },
      },
    },
    handler: async function (request, reply) {
      const {
        user,
        cookies: { auth_token: authToken },
      } = request;

      if (user && authToken) {
        await request.user.logout(authToken);
        return reply.status(204).send();
      }

      return reply
        .status(400)
        .send({ errors: [{ message: 'Not authenticated' }] });
    },
  });

  fastify.route;

  done();
};
