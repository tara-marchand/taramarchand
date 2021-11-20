import Airtable from 'airtable';
import React, { ReactElement } from 'react';
import { Show, ShowData } from '../components/Show';

type ServerSideProps = {
  shows: ShowData[];
};

type Props = ServerSideProps;

const airtableShowsBase = Airtable.base('app2RpU02hqiShAK0');

export async function getServerSideProps() {
  const showRecords = await airtableShowsBase('shows')
    .select({
      maxRecords: 100,
    })
    .all();

  const shows: ShowData[] = showRecords.map((showRecord) => ({
    id: showRecord.id,
    name: showRecord.get('Name') as string,
    url: showRecord.get('URL to Watch') as string,
  }));
  return JSON.parse(JSON.stringify({ props: { shows } }));
}

export default function Shows(props: Props): ReactElement {
  return (
    <div>
      <h1>Shows</h1>
      {props.shows &&
        props.shows.map((showData) => (
          <Show data={showData} key={showData.id} />
        ))}
    </div>
  );
}
