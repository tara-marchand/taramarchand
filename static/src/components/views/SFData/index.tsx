import L, { LatLngTuple } from 'leaflet';
import React from 'react';
import {
  LatLng,
  LatLngBounds,
  Map,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';
import uuid4 from 'uuid';

import { getData } from '../../../utils';

interface Props {}

const fetchController: AbortController = new AbortController();

const SFData: React.FC<Props> = (props: Props) => {
  const [businesses, setBusinesses] = React.useState([]);
  React.useEffect(() => {
    getData(
      'https://data.sfgov.org/resource/vw6y-z8j6.json?$select=' +
        encodeURIComponent('address,lat,long,neighborhoods_sffind_boundaries') +
        '&$where=' +
        encodeURIComponent("neighborhoods_sffind_boundaries = 'Sunnyside'") +
        '&$limit=25',
      fetchController
    )
      .then(response => {
        return response.json();
      })
      .then(bizes => {
        setBusinesses(
          bizes.map(biz => {
            // Only save the properties we're going to use
            return {
              address: biz.address,
              id: uuid4(),
              lat: biz.lat,
              long: biz.long
            };
          })
        );
      })
      .catch(error => console.error(error));
  }, []);

  if (!businesses.length) {
    return null;
  }

  const bounds = [] as LatLngTuple[];
  let boundsInstance;

  const markers = businesses.map(biz => {
    const position = [biz.lat as number, biz.long as number] as LatLngTuple;

    bounds.push(position);

    return (
      <Marker position={position}>
        <Popup>{biz.address}</Popup>
      </Marker>
    );
  });
  boundsInstance = bounds as LatLngBounds;

  return (
    <Map bounds={boundsInstance}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </Map>
  );
};

export default SFData;
