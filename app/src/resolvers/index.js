import Models from '../models';

// Maps a GraphQL query to a Sequelize query.
export default {
  books: async () => await Models.Book.findAll(),

  addBookToCache: (root, args) => {
    Models.Book.findOrCreate({
      where: {
        authors: args.authors,
        title: args.title
      }
    }).then(results => {
      if (results && results.length) {
        const addedBook = results[0].get({
          plain: true
        });

        console.log(`Added book: ${addedBook}`);
      }
    });
  }
};
