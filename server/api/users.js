const userSchema = require('../../schemas/user');
const models = require('../../models');

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
      delete request.body['id'];
      models.User.create(request.body).then((user) => {
        reply.send(user);
      });
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

  done();
};
