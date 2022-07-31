import Airtable from 'airtable';
import React, { ReactElement } from 'react';
import { v4 as uuid4 } from 'uuid';

import AddJob from '../components_archive/jobs/AddJob';
import { JobCard } from '../components_archive/jobs/JobCard';
import { Job } from '../components_archive/jobs/types';

const airtableBase = Airtable.base('app915q92oWW2aV5C');

interface ServerSideProps {
  jobs: Job[];
}

export async function getServerSideProps() {
  const jobRecords = await airtableBase('Job Leads')
    .select({
      maxRecords: 100,
      view: 'All Positions',
    })
    .all();

  const jobs = jobRecords.map(
    (record) =>
      ({
        company: record.fields.Company,
        applied: record.fields['Applied Date'],
        role: record.fields.Role,
        link: record.fields.Link,
      } as Job)
  );

  // Workaround to allow for undefined values in data
  // https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
  return JSON.parse(JSON.stringify({ props: { jobs } }));
}

function jobs(props: ServerSideProps): ReactElement {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {props.jobs &&
          props.jobs.length > 0 &&
          props.jobs.map((job: Job) => (
            <JobCard
              company={job.company}
              created={job.created}
              id={job.id}
              applied={job.applied}
              key={uuid4()}
              role={job.role}
              link={job.link}
            />
          ))}
      </div>
      <AddJob />
    </div>
  );
}

export default jobs;
