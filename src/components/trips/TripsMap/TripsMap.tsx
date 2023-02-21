import React from 'react'
import Cytoscape from '../../Cytoscape/Cytoscape'
import { getCytoscapeElements } from '../TripsList/elements'
import { Trip } from '../TripsList/types';

type Props = {
  trip: Trip;
}

export default function TripsMap(props: Props) {
  const data = getCytoscapeElements(props.trip);
  
  return (
    <div className="h-[350px]">
      <Cytoscape data={data} />
    </div>
  )
}