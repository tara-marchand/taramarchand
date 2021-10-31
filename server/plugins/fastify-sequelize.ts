import { config } from 'dotenv';
import { FastifyPluginCallback, RawServerBase } from 'fastify';
import fp from 'fastify-plugin';
import get from 'lodash.get';
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';

import sequelizeModels from '../models';
import { ExtendedFastifyInstance } from '../types/fastify';

const fastifySequelize = fp(
  async function (fastify: ExtendedFastifyInstance, opts, done) {
    const dbUrl = get(process.env, 'DATABASE_URL');
    if (!dbUrl) {
      return;
    }

    config();

    fastify.sequelize = new Sequelize(dbUrl, {
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
    await fastify.sequelize.sync();

    done();
  } as FastifyPluginCallback<Record<string, unknown>, RawServerBase>,
  { name: 'fastify-sequelize' }
);

export { fastifySequelize };
