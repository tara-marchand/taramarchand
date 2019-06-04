import ApolloClient, { gql } from 'apollo-boost';
import * as React from 'react';
import get from 'lodash.get';

import Book, { BookData } from './Book';
import { Query } from 'react-apollo';

export interface State {
  books: BookData[];
}

export default class Books extends React.PureComponent {
  public state: State = {
    books: []
  };

  public render() {
    return this.booksQuery();
  }

  public booksQuery = () => (
    <Query
      query={gql`
        {
          books {
            authors
            title
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error :(</p>;
        }

        const books = get(data, 'books');

        if (books) {
          return data.books.map((book: BookData, index: number) => (
            <Book key={index} title={book.title} authors={book.authors} />
          ));
        }

        return null;
      }}
    </Query>
  );
}
