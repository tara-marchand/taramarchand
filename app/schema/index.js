// GraphQL types.
module.exports = `
  type Book {
    id: ID!
    authors: String!
    title: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBookToCache(title: String!, authors: String!): Book
  }
`;
