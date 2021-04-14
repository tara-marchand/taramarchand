const fp = require('fastify-plugin');

const fastifyAuthenticate = fp(
  function (fastify, _opts, done) {
    fastify.decorate('authenticate', async function (req, reply) {
      try {
        await req.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    });
    done();
  },
  { name: 'fastify-authenticate' }
);

module.exports = { fastifyAuthenticate };
