import * as React from 'react';

export interface BookProps {
  authors: string;
  id?: number;
  title: string;
}

export default function Book(props: BookProps) {
  const { title, authors } = props;

  return (
    <div>
      <cite>{title}</cite> by {authors}
    </div>
  );
}
