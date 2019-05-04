import fetch from 'isomorphic-fetch';
import * as React from 'react';

import Book, { BookData } from './Book';

export interface State {
  books: BookData[];
}

export default class Books extends React.PureComponent<Props> {
  public state: State = {
    books: []
  };

  public componentDidMount() {
    fetch('/api/books')
      .then(response => {
        return response.json();
      })
      .then(books => {
        this.setState({ books });
      })
      .catch(error => console.error(error));
  }

  public render() {
    const { books } = this.state;

    return (
      <div>
        {books.length > 0 &&
          books.map(book => <Book title={book.title} authors={book.authors} />)}
      </div>
    );
  }
}
