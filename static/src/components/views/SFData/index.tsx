import { LatLngTuple } from 'leaflet';
import React from 'react';
import { LatLngBounds, Map, Marker, Popup, TileLayer } from 'react-leaflet';
import uuid4 from 'uuid';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';

import { getData } from '../../../utils';
import { BizLocation, BizViolationBar } from './types';

interface Props {}

const fetchController: AbortController = new AbortController();

const sunnysideBizesUrl =
  'https://data.sfgov.org/resource/vw6y-z8j6.json?$select=' +
  encodeURIComponent('address,lat,long,neighborhoods_sffind_boundaries') +
  '&$where=' +
  encodeURIComponent("neighborhoods_sffind_boundaries = 'Sunnyside'") +
  '&$limit=25';

const zip94112RestHealthUrl =
  'https://data.sfgov.org/resource/pyih-qa8i.json?$select=' +
  encodeURIComponent('business_name,count(violation_id),max(inspection_date)') +
  '&$where=' +
  encodeURIComponent("business_postal_code = '94112'") +
  '&$group=business_name&$order=business_name&$limit=25';

const SFData: React.FC<Props> = (props: Props) => {
  const [businesses, setBusinesses] = React.useState([]);
  React.useEffect(() => {
    getData(sunnysideBizesUrl, fetchController)
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
            } as BizLocation;
          })
        );
      })
      .catch(error => console.error(error));
  }, []);

  let maxNumInspections = 0;
  const [bizHealthScores, setBizHealthScores] = React.useState(
    [] as BizViolationBar[]
  );
  React.useEffect(() => {
    getData(zip94112RestHealthUrl, fetchController)
      .then(response => {
        return response.json();
      })
      .then(scores => {
        setBizHealthScores(
          scores.map((score, index) => {
            const y = parseInt(score.count_violation_id, 10);

            if (y > maxNumInspections) {
              maxNumInspections = y;
            }

            // Only save the properties we're going to use
            return {
              x: index,
              y
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
      <Marker key={position} position={position}>
        <Popup>{biz.address}</Popup>
      </Marker>
    );
  });

  boundsInstance = bounds as LatLngBounds;

  return (
    <div>
      <VictoryChart>
        <VictoryBar data={bizHealthScores} />
        <VictoryAxis
          dependentAxis
          label="Number of Violations"
          minDomain={0}
          maxDomain={maxNumInspections}
        />
      </VictoryChart>
      <Map bounds={boundsInstance}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    </div>
  );
};

export default SFData;
