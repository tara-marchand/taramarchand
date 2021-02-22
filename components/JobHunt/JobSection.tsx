import React from 'react';

export const JobSection = (props: Job) => {
  return (
    <div className="bg-gray-200 lg:max-w-sm overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <h3>
          <a href={props.url} target="_blank">
            {props.title}
          </a>
          , {props.company}
        </h3>
        <p className="text-base">Applied: {props.dateApplied}</p>
      </div>
    </div>
  );
};
