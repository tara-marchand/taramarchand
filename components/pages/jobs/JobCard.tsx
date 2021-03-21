import React from 'react';
import { Job } from './types';

export const JobCard = (props: Job) => {
  return (
    <div className="bg-gray-200 lg:max-w-sm overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <a href={props.link} target="_blank" rel="noreferrer">
          {props.role}
        </a>
        <div className="text-sm">{props.company}</div>
        <p>Applied: {props.applied}</p>
      </div>
    </div>
  );
};
