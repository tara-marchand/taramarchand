import * as React from 'react';

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
