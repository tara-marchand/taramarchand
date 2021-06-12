import { config } from 'dotenv';
import get from 'lodash.get';
import pg from 'pg';
import { Sequelize } from 'sequelize-typescript';

config();

let sequelize: Sequelize;
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
    models: [__dirname + '/models/*.ts'],
    quoteIdentifiers: false,
  })
    .sync({ force: true })
    .then((_sequelize) => {
      sequelize = _sequelize;
    });
}

export { sequelize };
