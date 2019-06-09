import { gql } from 'apollo-boost';
import * as React from 'react';
import get from 'lodash.get';
import set from 'lodash.set';

import Book, { BookData } from './Book';
import { Query, Mutation, MutationFn } from 'react-apollo';

export interface State {
  books: BookData[];
}

export default class Books extends React.PureComponent<any, State> {
  public state: State = {
    books: []
  };

  public titleInputRef: React.RefObject<HTMLInputElement>;
  public authorsInputRef: React.RefObject<HTMLInputElement>;

  public constructor(props: any) {
    super(props);

    this.titleInputRef = React.createRef();
    this.authorsInputRef = React.createRef();
  }

  public render() {
    return (
      <div>
        {this.addBookMutation()} {this.getBooksQuery()}
      </div>
    );
  }

  public getBooksQuery = () => (
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
          return data.books.map((book: BookData) => (
            <Book title={book.title} authors={book.authors} />
          ));
        }

        return null;
      }}
    </Query>
  );

  public addBookMutation = () => {
    const ADD_BOOK = gql`
      mutation AddBook($title: String!, $authors: String!) {
        addBook(title: $title, authors: $authors)
      }
    `;

    return (
      <Mutation mutation={ADD_BOOK}>
        {(addBook, { loading, error }) => {
          return (
            <form onSubmit={e => this.handleFormSubmit(e, addBook)}>
              <label>
                Title <input ref={this.titleInputRef} />
              </label>
              <label>
                Authors <input ref={this.authorsInputRef} />
              </label>
              <button type="submit">Add Book</button>
            </form>
          );
        }}
      </Mutation>
    );
  };

  public handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    addBook: MutationFn
  ) => {
    e.preventDefault();

    addBook({
      variables: {
        title: get(this, 'titleInputRef.current.value', ''),
        authors: get(this, 'authorsInputRef.current.value', '')
      }
    });

    set(this, 'titleInputRef.current.value', '');
    set(this, 'authorsInputRef.current.value', '');
  };
}
