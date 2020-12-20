const Sequelize = require('sequelize');

const Book = require('./Book');
const Job = require('./Job');

const sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
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
models.Book = Book(sequelize, Sequelize);
models.Job = Job(sequelize, Sequelize);

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize.sync({ force: true });

module.exports = models;
