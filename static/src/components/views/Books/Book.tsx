import * as React from 'react';

import { Book as BookData } from './reducer';

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
