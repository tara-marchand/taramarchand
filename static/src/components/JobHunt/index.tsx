import React from 'react';
import { Job } from './Job';

interface Props {
  jobs: Job[];
}

export const JobHunt = (props: Props) => {
  return (
    <div>
      <form>
        <input type="text" value="" name="title" />
        <input type="text" value="" name="company" />
        <input type="text" value="" name="description" />
        <input type="text" value="" name="datePosted" />
      </form>
      {props.jobs &&
        props.jobs.length &&
        props.jobs.map((job) => (
          <Job
            company={job.company}
            datePosted={job.datePosted}
            description={job.description}
            title={job.title}
          />
        ))}
    </div>
  );
};
