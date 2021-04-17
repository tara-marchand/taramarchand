module.exports = function admin(fastify, _opts, done) {
  fastify.get(
    '/',
    {
      preValidation: [fastify.authenticate],
    },
    (req, reply) => {
      reply.send(req.user);
    }
  );

  done();
};
