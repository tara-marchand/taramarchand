import fp from 'fastify-plugin';

const fastifyAuthenticate = fp(
  function(fastify, options, next) {
    fastify.decorate('authenticate', function(request, reply) {
      try {
        request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });

    next();
  },
  { name: 'fastify-authenticate' }
);

export { fastifyAuthenticate };
