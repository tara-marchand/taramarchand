import { format, parse } from 'date-fns';
import * as React from 'react';
import { useEffect } from 'react';
import uuidv4 from 'uuid';
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory';
import { getData } from '../../../utils';

export default function Covid19() {
  const fetchController: AbortController = new AbortController();
  const [geoAreas, setGeoAreas] = React.useState<{ [key: string]: string }[]>(
    []
  );

  useEffect(() => {
    return () => {
      fetchController.abort();
    };
  }, []);

  useEffect(() => {
    getData('/api/covid19', fetchController)
      .then((response: Response) => {
        return response.json();
      })
      .then(geoAreas => {
        setGeoAreas(geoAreas);
      })
      .catch(error => console.error(error));
  }, [!geoAreas]);

  return (
    <div>
      {geoAreas.length > 0 &&
        geoAreas.map((area, index) => {
          // Only show 10 at a time for now
          if (index < 10) {
            return (
              <div key={uuidv4()}>
                {area['Province/State']}, {area['Country/Region']}
                <VictoryChart>
                  <VictoryAxis dependentAxis={true} orientation="left" />
                  <VictoryLine data={getDays(area)} />
                  <VictoryAxis fixLabelOverlap={true} />
                </VictoryChart>
                {}
              </div>
            );
          }
        })}
      {geoAreas.map(area => {})}
    </div>
  );
}

function getDays(area) {
  const days = [];

  for (const day in area) {
    try {
      // Only include parseable values (that is, dates)
      days.push({
        x: format(parse(day, 'M/d/yy', new Date()), 'M/d'),
        y: parseInt(area[day], 10)
      });
    } catch (e) {}
  }
  return days;
}
