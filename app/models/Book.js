// Sequelize model for a book.
module.exports = function Book(sequelize, DataTypes) {
  const Book = sequelize.define('Book', {
    authors: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    title: {
      type: DataTypes.TEXT
    }
  });

  return Book;
}
