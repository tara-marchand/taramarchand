const Models = require('./models');

// Maps a GraphQL query to a Sequelize query.
module.exports = {
  Query: {
    books: async () => await Models.Book.findAll()
  },

  Mutation: {
    addBook: (root, args) => {
      const newChannel = {id: nextId++, name: args.name};
      channels.push(newChannel);

      return newChannel;
    }
  }
};