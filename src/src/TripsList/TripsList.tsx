import React from 'react';

import TripsMap from '../TripsMap/TripsMap';
import { trip } from './elements';

export function TripsList() {
  return (
    <div>
      <TripsMap trip={trip} />
      <div key={trip.name}>
        <h2>{trip.name}</h2>
        {trip.tripLegs?.map((tripLeg) => (
          <div key={`${tripLeg.from.name}-${tripLeg.to.name}`}>
            <p>
              <>From: {tripLeg.from.name}</>
            </p>
            <p>
              <>To: {tripLeg.to.name}</>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
