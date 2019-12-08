import * as React from 'react';

export interface BookProps {
  authors: string;
  id?: number;
  title: string;
}

export default class Book extends React.PureComponent<BookProps> {
  public render() {
    const { title, authors } = this.props;

    return (
      <div>
        <cite>{title}</cite> by {authors}
      </div>
    );
  }
}
