import { config } from 'dotenv';
import get from 'lodash.get';
import pg from 'pg';
import Sequelize, { DataTypes } from 'sequelize';

import { AuthToken, AuthTokenFactory } from './AuthToken';
import { UserFactory, User } from './User';

config();

let sequelize;
let models: {
  [modelName: string]: Sequelize.ModelDefined<any, any>;
} = {};
const dbUrl = get(process.env, 'DATABASE_URL');

if (dbUrl) {
  sequelize = new Sequelize.Sequelize(dbUrl, {
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    quoteIdentifiers: false,
  });

  models.AuthToken = AuthTokenFactory(sequelize, DataTypes);
  models.User = UserFactory(sequelize, DataTypes);

  sequelize.sync({ force: true });
}

export { models, sequelize };
