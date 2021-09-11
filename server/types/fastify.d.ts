import { FastifyInstance, FastifyRequest } from 'fastify';
import { Sequelize } from 'sequelize-typescript';
import { Nodemailer } from './nodemailer';

export type ExtendedFastifyInstance = FastifyInstance & {
  authenticate?: (request: FastifyRequest) => void;
  nodemailer?: Nodemailer;
  sequelize?: Sequelize;
};
