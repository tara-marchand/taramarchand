import { Sequelize } from 'sequelize-typescript';
import { Nodemailer } from './nodemailer';

declare module 'fastify' {
  interface FastifyInstance<RawServer, RawRequest, RawReply> {
    sequelize: Sequelize;
    nodemailer: Nodemailer;
  }
  interface FastifyRequest {
    realIpAddress?: string
  }
}
