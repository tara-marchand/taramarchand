import { Sequelize } from 'sequelize-typescript';

declare module 'fastify' {
  interface FastifyInstance<RawServer, RawRequest, RawReply> {
    sequelize: Sequelize;
  }
}
