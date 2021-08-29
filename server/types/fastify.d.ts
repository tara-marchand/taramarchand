import { FastifyInstance } from 'fastify';
import { Sequelize } from 'sequelize-typescript';
import { Nodemailer } from './nodemailer';

type ExtendedFastifyInstance = FastifyInstance & {
  nodemailer: Nodemailer;
  sequelize: Sequelize;
};
