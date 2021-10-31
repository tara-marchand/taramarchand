import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  HTTPMethods,
} from 'fastify';
import { NextServer } from 'next/dist/server/next';
import { Sequelize } from 'sequelize-typescript';
import { Nodemailer } from './nodemailer';

type FastifyNextCallback = (
  app: NextServer,
  req: FastifyRequest,
  reply: FastifyReply
) => Promise<void>;

export type ExtendedFastifyInstance = FastifyInstance & {
  next?(
    path: string,
    opts?:
      | {
          method: HTTPMethods;
          schema: FastifySchema;
        }
      | FastifyNextCallback,
    handle?: FastifyNextCallback
  ): void;
  nodemailer?: Nodemailer;
  sequelize?: Sequelize;
};
