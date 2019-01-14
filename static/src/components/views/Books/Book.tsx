import * as React from 'react';

export interface Props {
  title: string;
  authorFirst: string;
  authorLast: string;
}

export default class Book extends React.PureComponent<Props> {
  public render() {
    const { title, authorFirst, authorLast } = this.props;
    
    return (
      <div>
        <cite>{title}</cite> by ${authorFirst} ${authorLast}
      </div>
    );
  }
}
