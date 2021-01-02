import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid4 } from 'uuid';
import store, { RootState } from '../../data/store';
import { JobSection } from './JobSection';
import { fetchJobsAirtable } from './slice';

export const JobHunt = () => {
  useEffect(() => {
    store.dispatch(fetchJobsAirtable());
    return () => {
      // cleanup;
    };
  }, []);

  const jobs = useSelector((state: RootState) => state.jobs.entities);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {jobs &&
        jobs.length > 0 &&
        jobs.map((job: any) => (
          <JobSection
            company={job.company}
            dateApplied={job.dateApplied}
            key={uuid4()}
            title={job.title}
            url={job.url}
          />
        ))}
    </div>
  );
};
