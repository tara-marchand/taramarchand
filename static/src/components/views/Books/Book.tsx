import * as React from 'react';

export interface Props {
  authors: string;
  id?: number;
  title: string;
}

export default function Book(
  props: Props
): React.FunctionComponentElement<Props> {
  const { title, authors } = props;

  return (
    <div>
      <cite>{title}</cite> by {authors}
    </div>
  );
}
