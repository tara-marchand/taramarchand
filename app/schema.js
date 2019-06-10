// Sequelize types.
module.exports = `
  type Book {
    authors: String!
    title: String!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(authors: String!, title: String!): Book
  }
`;
