module.exports = function Book(sequelize, DataTypes) {
  return sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    authors: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  });
};
