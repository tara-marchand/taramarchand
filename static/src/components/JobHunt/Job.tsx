import React from 'react';

interface Props {
  company: string;
  title: string;
}

export const Job = (props: Props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <h3>{props.company}</h3>
    </div>
  );
};
