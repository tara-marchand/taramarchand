import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import store from '../../data/store';
import { Job } from './Job';
import { fetchJobsAirtable } from './slice';

export const JobHunt = () => {
  useEffect(() => {
    store.dispatch(fetchJobsAirtable());
    return () => {
      // cleanup;
    };
  }, []);

  const jobs = useSelector((state) => state.jobs.entities);

  return (
    <div>
      {/* <form>
        <input type="text" value="" name="title" />
        <input type="text" value="" name="company" />
        <input type="text" value="" name="description" />
        <input type="text" value="" name="datePosted" />
      </form> */}
      {jobs &&
        jobs.length > 0 &&
        jobs.map((job: any) => (
          <Job
            company={job.company}
            dateApplied={job.dateApplied}
            key={uuid4()}
            title={job.title}
          />
        ))}
    </div>
  );
};
