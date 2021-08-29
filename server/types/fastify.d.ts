import { Sequelize } from 'sequelize-typescript';

declare module 'fastify' {
  type ExtendedFastifyInstance = FastifyInstance & {
    nodemailer: unknown;
    sequelize: Sequelize;
  };
}
