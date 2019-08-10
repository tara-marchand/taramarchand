import { gql, Resolvers } from 'apollo-boost';

function addBook(root: any, variables: {[key: string]: any}, context: any) {
  const id = context.getCacheKey({ __typename: 'Book', id: variables.id });
  const fragment = gql`
    fragment addedBook on Book {}
  `;
  const book = context.cache.readFragment({ fragment, id });
  const data = { ...book };

  context.cache.writeData({ id, data });
  return null;
}

export default {
  Mutation: {
    addBook
  }
} as Resolvers;