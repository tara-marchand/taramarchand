const Models = require('./models');

// Maps a GraphQL query to a Sequelize query.
module.exports = {
  Query: {
    books: async () => await Models.Book.findAll()
  },

  Mutation: {
    addBook: (root, variables) => {
      const newBook = { authors: variables.authors, title: variables.title };

      books.push(newBook);

      return newBook;
    }
  }
};
