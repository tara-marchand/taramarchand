import { FastifyInstance, FastifyPluginCallback, RawServerBase } from 'fastify';
import fp from 'fastify-plugin';

const fastifyRealIpAddress = fp(
  function (fastifyInstance: FastifyInstance, _options, done) {
    fastifyInstance.decorateRequest('realIpAddress', null);
    fastifyInstance.addHook('preHandler', (request, _reply, _done) => {
      let realIp = request.headers['x-forwarded-for'];

      if (realIp) {
        const realIpList =
          typeof realIp === 'string' ? realIp.split(',') : realIp;
        realIp = realIpList[realIpList.length - 1];
      } else {
        realIp = request.socket.remoteAddress;
      }
      request.realIpAddress = realIp;
      fastifyInstance.log.info('incoming address real ip %s', request.realIpAddress);
      _done();
    });
    done();
  } as FastifyPluginCallback<Record<string, unknown>, RawServerBase>,
  { name: 'fastify-realipaddress' }
);

export { fastifyRealIpAddress };
