import React from 'react';

export type Job = {
  baseSalary?: number;
  company: string;
  datePosted: string;
  description: string;
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
  title: string;
};

export const Job = (props: Job) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <h3>{props.company}</h3>
      <p>{props.datePosted}</p>
      <p>{props.description}</p>
    </div>
  );
};
