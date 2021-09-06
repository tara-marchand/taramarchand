import Airtable from 'airtable';
import React, { ReactElement } from 'react';

const airtableHsSearchBase = Airtable.base('appxkLGn7WpgCoCbM');

type HighSchool = {
  name: string;
};

interface ServerSideProps {
  highSchools: HighSchool[];
}

export async function getServerSideProps() {
  const highSchoolRecords = await airtableHsSearchBase('high schools')
    .select({
      maxRecords: 100,
    })
    .all();

  const highSchools = highSchoolRecords.map((record) => ({
    name: record.fields.school,
  }));

  return JSON.parse(JSON.stringify({ props: { highSchools } }));
}

export default function HighSchools(props: ServerSideProps): ReactElement {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {props.highSchools?.map((school) => (
          <div key={school.name}>{school.name}</div>
        ))}
      </div>
    </div>
  );
}
