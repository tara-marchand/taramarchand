export default function BookFactory(sequelize, DataTypes) {
  const book = sequelize.define('Book', {
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

  return book;
}
