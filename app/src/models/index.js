import fs from 'fs';
import Path from 'path';
import Sequelize from 'Sequelize';

const sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { ssl: true }
});

const models = {};

// Read all the files in this directory and import them as models.
fs.readdirSync(Path.join(__dirname))
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(Path.join(__dirname, file));

    models[model.name] = model;
  });

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
