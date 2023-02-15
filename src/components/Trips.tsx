import React from 'react';

type Props = {
  trips: { name: string }[];
}

export function Trips(props: Props) {
  const { trips } = props;

  return (
    <div>
      {trips?.map((trip) => (
        <div key={trip.name}>{trip.name}</div>
      ))}
    </div>
  );
}
