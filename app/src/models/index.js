import Sequelize from 'sequelize';

const sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { ssl: true }
});

// https://github.com/sequelize/express-example/issues/74#issuecomment-478133128
const models = {};
const context = require.context('.', true, /^\.\/(?!index\.js).*\.js$/, 'sync');

context
  .keys()
  .map(context)
  .forEach(({ default: module }) => {
    const sequelizeModel = module(sequelize, Sequelize);
    models[sequelizeModel.name] = sequelizeModel;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
