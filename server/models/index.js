const { config } = require('dotenv');
const pg = require('pg');
const Sequelize = require('sequelize');

const user = require('./User');
const job = require('./Job');
const { User } = user;
const { Job } = job;

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

const models = {};
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

module.exports = { models };
