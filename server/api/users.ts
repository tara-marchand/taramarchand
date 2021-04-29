import bcrypt from 'bcrypt';
import { userSchema } from '../schemas/user';
import { models } from '../models';
import { User } from '../models/User';

export default function api(fastify, _opts, done) {
  // Create new user
  fastify.route({
    method: 'POST',
    // preValidation: fastify.authenticate,
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
        ) as User;
        // Data will be an object with the user and its `AuthToken`
        // const userData = await user.authorize();

        // Send back the new user and auth token to the client
        return reply.serialize({
          id: user.id,
          email: user.email,
          name: user.name,
        });
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
      fastify.models.User.findOne(request.params.id).then((user) => {
        reply.send(user);
      });
    },
  });

  done();
};
