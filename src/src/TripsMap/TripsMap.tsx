'use client';

import React from 'react'
import Cytoscape from '../Cytoscape/Cytoscape';
import useCytoscapeElements from '../Cytoscape/useCytoscapeElements';

import { Trip } from '../TripsList/types';

type Props = {
  trip: Trip;
}

export default function TripsMap(props: Props) {
  const data = useCytoscapeElements(props.trip);
  
  return (
    <div className="h-[350px]">
      <Cytoscape data={data} />
    </div>
  )
}