import React from 'react';
import { Trip } from '../trips/TripsList/types';

export default function useCytoscapeElements(
  trip: Trip
): cytoscape.ElementDefinition[] {
  const nodes: cytoscape.NodeDefinition[] = [];
  const edges: cytoscape.EdgeDefinition[] = [];

  trip.tripLegs?.map((tripLeg) => {
    let fromNode = nodes.find((node) => node.data.id === tripLeg.from.name);
    let toNode = nodes.find((node) => node.data.id === tripLeg.to.name);

    !fromNode &&
      nodes.push({
        group: 'nodes',
        data: { id: tripLeg.from.name },
      });
    !toNode &&
      nodes.push({
        group: 'nodes',
        data: { id: tripLeg.to.name },
      });

    edges.push({
      group: 'edges',
      data: { source: tripLeg.from.name, target: tripLeg.to.name },
    });
  });

  return [...nodes, ...edges];
}
