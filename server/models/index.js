const { config } = require('dotenv');
const pg = require('pg');
const Sequelize = require('sequelize');

const AuthToken = require('./AuthToken');
const User = require('./User');
const Job = require('./Job');

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

module.exports = { models };
