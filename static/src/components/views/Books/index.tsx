import { gql, OperationVariables } from 'apollo-boost';
import * as React from 'react';
import get from 'lodash.get';
import set from 'lodash.set';

import Book, { BookData } from './Book';
import { Query, Mutation, MutationFn } from 'react-apollo';

export default class Books extends React.PureComponent<any> {
  public titleInputRef: React.RefObject<HTMLInputElement>;
  public authorsInputRef: React.RefObject<HTMLInputElement>;

  public GET_BOOKS_GQL: string = gql`
    query Books {
      books {
        authors
        title
      }
    }
  `;

  public ADD_BOOK_GQL: string = gql`
    mutation AddBookMutation($authors: String!, $title: String!) {
      addBook(authors: $authors, title: $title) {
        authors
        title
      }
    }
  `;

  public constructor(props: any) {
    super(props);

    this.titleInputRef = React.createRef();
    this.authorsInputRef = React.createRef();
  }

  public render() {
    return (
      <div>
        {this.addBook()} {this.getBooksQuery()}
      </div>
    );
  }

  public getBooksQuery = () => (
    <Query<{ books: BookData[] }> query={this.GET_BOOKS_GQL}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error :(</p>;
        }

        if (data && get(data, 'books')) {
          return data.books.map((book: BookData) => (
            <Book title={book.title} authors={book.authors} />
          ));
        }

        return null;
      }}
    </Query>
  );

  public addBook = () => {
    return (
      <Mutation mutation={this.ADD_BOOK_GQL}>
        {(addBookMutation: MutationFn, { loading, error }) => {
          return (
            <form onSubmit={e => this.handleFormSubmit(e, addBookMutation)}>
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
    addBookMutation: MutationFn
  ) => {
    e.preventDefault();

    addBookMutation({
      variables: {
        title: get(this, 'titleInputRef.current.value', ''),
        authors: get(this, 'authorsInputRef.current.value', '')
      }
    });

    set(this, 'titleInputRef.current.value', '');
    set(this, 'authorsInputRef.current.value', '');
  };
}
