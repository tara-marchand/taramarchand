import { config } from 'dotenv';
import { FastifyInstance, FastifyPluginCallback, RawServerBase } from 'fastify';
import fp from 'fastify-plugin';
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';

import sequelizeModels from '../models';

const fastifySequelize = fp(
  async function (fastify: FastifyInstance, opts, done) {
    config();
    const dbUrl = process.env.DATABASE_URL;

    const sequelize =
      !!dbUrl &&
      new Sequelize(dbUrl, {
        dialect: 'postgres' as const,
        dialectModule: pg,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        models: sequelizeModels,
        quoteIdentifiers: false,
      });
    if (!!sequelize) {
      fastify.sequelize = sequelize;
      fastify.sequelize.sync();
    }
    done();
  } as FastifyPluginCallback<Record<string, unknown>, RawServerBase>,
  { name: 'fastify-sequelize' }
);

export { fastifySequelize };
