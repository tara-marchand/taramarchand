import { FastifyError, FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';

const fastifyRealIpAddress = fp(
  function (
    fastifyInstance: FastifyInstance,
    _options: FastifyPluginOptions,
    done: (error?: FastifyError) => void
  ) {
    fastifyInstance.decorateRequest('realIpAddress', null);
    fastifyInstance.addHook('onRequest', (request, _reply, _done) => {
      let realIp = request.headers['x-forwarded-for'];

      if (realIp) {
        const realIpList =
          typeof realIp === 'string' ? realIp.split(',') : realIp;
        realIp = realIpList[realIpList.length - 1];
      } else {
        realIp = request.ip;
      }
      request.realIpAddress = realIp;
      _done();
    });
    done();
  },
  { name: 'fastify-realipaddress' }
);

export { fastifyRealIpAddress };
