import Airtable from 'airtable';
import { noop } from 'lodash';
import React, { ReactElement } from 'react';

const airtableHsSearchBase = Airtable.base('appxkLGn7WpgCoCbM');

type HighSchool = {
  name: string;
  notes?: string;
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
    notes: record.fields.notes,
  }));

  return JSON.parse(JSON.stringify({ props: { highSchools } }));
}

export default function HighSchools(props: ServerSideProps): ReactElement {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {props.highSchools?.map((school) => (
          <div className="overflow-hidden shadow-lg" key={school.name}>
            <div className="px-6 pt-4">
              <div className="mb-2 font-bold">{school.name}</div>
            </div>
            <div className="px-6 pb-4">
              <EasyEdit
                cancelButtonLabel="Cancel"
                onCancel={() => noop()}
                onSave={() => noop()}
                saveButtonLabel="Save"
                type="textarea"
                value={school.notes}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
