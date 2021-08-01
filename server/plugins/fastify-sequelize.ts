import { config } from 'dotenv';
import { FastifyPluginCallback, RawServerBase } from 'fastify';
import fp from 'fastify-plugin';
import get from 'lodash.get';
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';

const fastifySequelize = fp(
  function (fastify, opts, done) {
    config();

    const dbUrl = get(process.env, 'DATABASE_URL');

    if (dbUrl) {
      new Sequelize(dbUrl, {
        dialect: 'postgres' as const,
        dialectModule: pg,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        models: ['../models'],
        quoteIdentifiers: false,
      })
        .sync({ force: true })
        .then((_sequelize) => {
          fastify.sequelize = _sequelize;
          done();
        })
        .catch((error) => console.log(error));
    }
  } as FastifyPluginCallback<Record<string, unknown>, RawServerBase>,
  { name: 'fastify-sequelize' }
);

export { fastifySequelize };
