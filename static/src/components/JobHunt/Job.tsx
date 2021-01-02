import React from 'react';

export type Job = {
  company: string;
  dateApplied: string;
  title: string;
  // optional
  baseSalary?: number;
  description?: string;
  experienceRequirements?: string;
  incentiveCompensation?: string;
  jobLocation?: {
    address?: {
      addressLocality?: string;
      addressRegion?: string;
    };
  };
  qualifications?: string;
  responsibilities?: string;
  skills?: string;
};

export const Job = (props: Job) => {
  return (
    <p>
      <div>
        {props.title}, {props.company}
      </div>
      <div>Applied: {props.dateApplied}</div>
    </p>
  );
};
