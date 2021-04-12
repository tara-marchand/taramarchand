import { config } from 'dotenv';
import pg from 'pg';
import Sequelize, { Sequelize as _Sequelize } from 'sequelize';

import user from './User.mjs';
import job from './Job.mjs';
const { User } = user;
const { Job } = job;

config();

const sequelize = new _Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  quoteIdentifiers: false
});

const models = {};
models.Job = Job(sequelize, Sequelize);
models.User = User(sequelize, Sequelize);

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize.sync({ force: true });

export default { models };
