import { LatLngTuple } from 'leaflet';
import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { v4 as uuid4 } from 'uuid';
import { CaseLocation } from './types';

interface Props {
  cases: CaseLocation[];
}

export const sunnyside311CasesUrl =
  'https://data.sfgov.org/resource/vw6y-z8j6.json?$select=' +
  encodeURIComponent('address,lat,long,neighborhoods_sffind_boundaries') +
  '&$where=' +
  encodeURIComponent("neighborhoods_sffind_boundaries = 'Sunnyside'") +
  '&$limit=25';

const Sunnyside311CasesMap: React.FunctionComponent<Props> = (props) => {
  const bounds = [] as LatLngTuple[];

  const markers = props.cases.map((biz) => {
    const position = [biz.lat as number, biz.long as number] as LatLngTuple;

    bounds.push(position);
    return (
      <Marker key={biz.id} position={position}>
        <Popup>{biz.address}</Popup>
      </Marker>
    );
  });

  return (
    bounds.length && (
      <Map bounds={bounds}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    )
  );
};

export function transformCasesData(casesData) {
  return casesData.map((caseItem) => {
    // Only save the properties we're going to use
    return {
      address: caseItem.address,
      id: uuid4(),
      lat: caseItem.lat,
      long: caseItem.long,
    } as CaseLocation;
  });
}

export default Sunnyside311CasesMap;
