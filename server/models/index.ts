import { config } from 'dotenv';
import pg from 'pg';
import { Model, Sequelize } from 'sequelize';
import AuthToken from './AuthToken';
import User from './User';
import Job from './Job';

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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

const models: { [modelName: string]: Model } = {};
models.AuthToken = AuthToken(sequelize, Sequelize);
models.Job = Job(sequelize, Sequelize);
models.User = User(sequelize, Sequelize);

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize.sync({ force: true });

export default { models };
