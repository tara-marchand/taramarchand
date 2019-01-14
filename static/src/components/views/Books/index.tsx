import * as React from 'react';

import Book from './Book';

export interface Props {
}

export interface State {
  books: Book[]
}

export default class Books extends React.PureComponent<Props> {
  public state: State = {
    books: []
  }
  
  public render() {
    const { books } = this.state;
    
    return (
      <div>
      {books.map(book => <Book title={book.props.title} authorFirst={book.props.authorFirst} authorLast={book.props.authorLast} />)}        
      </div>
    );
  }
}
