import * as React from 'react';

export interface BookData {
  authors: string;
  id?: number;
  title: string;
}

export default class Book extends React.PureComponent<BookData> {
  public render() {
    const { title, authors } = this.props;

    return (
      <div>
        <cite>{title}</cite> by {authors}
      </div>
    );
  }
}
