const Models = require('./models');

// Maps a GraphQL query to a Sequelize query.
module.exports = {
  Query: {
    books: async () => await Models.Book.findAll()
  },

  Mutation: {
    addBook: (root, args) => {
      console.log(args);
      Models.Book.findOrCreate({
        where: {
          authors: args.authors,
          title: args.title
        }
      })
        .spread(function (book, created) {
          console.log(book.get({
            plain: true
          }))
          console.log(created)
        });
    }
  }
}