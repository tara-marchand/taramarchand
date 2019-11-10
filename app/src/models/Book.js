// Sequelize model for a book.
export default function Book(sequelize, DataTypes) {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    authors: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  });

  return Book;
}