import { FastifyPluginCallback, RawServerBase } from 'fastify';
import fp from 'fastify-plugin';

import { contact } from './contact';
import { sms } from './sms';

// define plugin using callbacks
const api = fp(async function (fastify, _options, done) {
  fastify.register(contact);
  fastify.register(sms);
  done();
} as FastifyPluginCallback<Record<string, unknown>, RawServerBase>);

export default api;
