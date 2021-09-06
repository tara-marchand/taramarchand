import { config } from 'dotenv';
import { FastifyPluginCallback, RawServerBase } from 'fastify';
import fp from 'fastify-plugin';
import get from 'lodash.get';
import pg from 'pg';
import { Model, Sequelize } from 'sequelize-typescript';
import { ExtendedFastifyInstance } from '../types/fastify';
import sequelizeModels from '../models';

const fastifySequelize = fp(
  async function (fastify, opts, done) {
    const dbUrl = get(process.env, 'DATABASE_URL');
    if (!dbUrl) {
      return;
    }

    config();

    const typedFastify = fastify as ExtendedFastifyInstance;
    typedFastify.sequelize = new Sequelize(dbUrl, {
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
    typedFastify.sequelize.sync();

    done();
  } as FastifyPluginCallback<Record<string, unknown>, RawServerBase>,
  { name: 'fastify-sequelize' }
);

export { fastifySequelize };
