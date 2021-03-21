import { config } from 'dotenv';
import Sequelize, { Sequelize as _Sequelize } from 'sequelize';
// import { Book } from './Book.mjs';
import { Job } from './Job.mjs';

config();

const sequelize = new _Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  quoteIdentifiers: false,
});

const models = {};
// models.Book = Book(sequelize, Sequelize);
models.Job = Job(sequelize, Sequelize);

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize.sync({ force: true });

export { models };
