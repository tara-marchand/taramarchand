import { FastifyPluginCallback, RawServerBase } from 'fastify';
import fastifyNextJs from 'fastify-nextjs';
import fp from 'fastify-plugin';

import { ExtendedFastifyInstance } from '../types/fastify';

const fastifyNextWrapper = fp(
  async function (fastify: ExtendedFastifyInstance, _opts, done) {
    fastify
      .register(fastifyNextJs, {
        // conf: nextConfig,
        dev: process.env.NODE_ENV === 'development',
      })
      .after(() => {
        fastify.next('/*');
      });
    done();
  } as FastifyPluginCallback<Record<string, unknown>, RawServerBase>,
  { name: 'fastify-next-wrapper' }
);

export { fastifyNextWrapper };
