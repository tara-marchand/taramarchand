const fs = require('fs');
const Path = require('path');
const Sequelize = require('Sequelize');

const dirname = require('../dirname');

const sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {ssl: true}
});

const models = {};

// Read all the files in this directory and import them as models.
fs.readdirSync(Path.join(dirname, 'models'))
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(Path.join(dirname, 'models', file));

    models[model.name] = model;
  });

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
