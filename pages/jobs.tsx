import Airtable from 'airtable';
import React, { ReactElement } from 'react';
import { v4 as uuid4 } from 'uuid';
import AddJob from '../client/src/components/JobHunt/AddJob';
import { JobSection } from '../client/src/components/JobHunt/JobSection';
import { Job } from '../client/src/components/JobHunt/types';

const airtableBase = Airtable.base('app915q92oWW2aV5C');

interface ServerSideProps {
  jobs: Job[];
}

interface Props extends ServerSideProps {}

export async function getServerSideProps(context) {
  const jobRecords = await airtableBase('Job Leads')
    .select({
      maxRecords: 100,
      view: 'All Positions',
    })
    .all();

  const jobs = jobRecords.map((record) => ({
    company: record.fields.Company,
    dateApplied: record.fields['Applied Date'],
    title: record.fields.Link,
    url: record.fields.role,
  } as Job));

  // Workaround to allow for undefined values in data
  // https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
  return JSON.parse(JSON.stringify({ props: { jobs } }))
}

function jobs(props: Props): ReactElement {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {props.jobs &&
          props.jobs.length > 0 &&
          props.jobs.map((job: any) => (
            <JobSection
              company={job.company}
              dateApplied={job.dateApplied}
              key={uuid4()}
              title={job.title}
              url={job.url}
            />
          ))}
      </div>
      <AddJob />
    </div>
  );
}

export default jobs;
