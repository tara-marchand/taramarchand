import Airtable from 'airtable';
import React, { ReactElement } from 'react';

const airtableBase = Airtable.base('appc8KY75tK6JR6uF');

type Trip = {
  name?: string;
  start: number;
  end: number;
};

interface ServerSideProps {
  trips: Trip[];
}

export async function getServerSideProps() {
  const tripRecords = await airtableBase('Trips')
    .select({
      maxRecords: 100,
    })
    .all();

  const trips = tripRecords.map((record) => ({
    name: record.fields.Name,
    start: record.fields.Start,
    end: record.fields.End,
  }));

  // Workaround to allow for undefined values in data
  // https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
  return JSON.parse(JSON.stringify({ props: { trips } }));
}

function trips(props: ServerSideProps): ReactElement {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {props.trips?.map((trip) => (
          <div key={trip.name}>
            {trip.name} ({trip.start} - {trip.end})
          </div>
        ))}
      </div>
    </div>
  );
}

export default trips;
