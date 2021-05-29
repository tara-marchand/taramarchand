import { config } from 'dotenv';
import get from 'lodash.get';
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';

config();

let sequelize;
const dbUrl = get(process.env, 'DATABASE_URL');

if (dbUrl) {
  new Sequelize(dbUrl, {
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    models: [__dirname + '/AuthToken.ts', __dirname + '/User.ts'],
    quoteIdentifiers: false,
  })
    .sync({ force: true })
    .then((_sequelize) => {
      sequelize = _sequelize;
    });
}

export { sequelize };
