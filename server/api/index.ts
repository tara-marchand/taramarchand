import { FastifyPluginCallback } from 'fastify';

import { contact } from './contact';
import { signin } from './signin';
import { signout } from './signout';
import { signup } from './signup';
import { sms } from './sms';

export type SignupOrSigninRequestBody = { email: string; password: string };

// define plugin using callbacks
export const api: FastifyPluginCallback<Record<never, never>> = (
  fastify,
  _options,
  done
) => {
  fastify.register(contact);
  fastify.register(signin);
  fastify.register(signout);
  fastify.register(signup);
  fastify.register(sms);
  done();
};

export default api;
