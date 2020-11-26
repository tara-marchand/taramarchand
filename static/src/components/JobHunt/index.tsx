import React from 'react';
import { Job } from './Job';

interface Props {}

export const JobHunt = (props: Props) => {
  return (
    <div>
      <Job company="Company?" title="Title!" />
    </div>
  );
};
