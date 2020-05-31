import { format, fromUnixTime, getUnixTime, parse } from 'date-fns';
import React, { useEffect } from 'react';
import {
  HorizontalGridLines,
  LineSeries,
  XAxis,
  XYPlot,
  YAxis,
  DiscreteColorLegend
} from 'react-vis';
import uuidv4 from 'uuid';
import '../../../../../node_modules/react-vis/dist/style.css';
import { getData } from '../../../utils';

export default function Covid19World() {
  const fetchController: AbortController = new AbortController();
  const [geoAreas, setGeoAreas] = React.useState<{ [key: string]: string }[]>(
    []
  );
  let legendItems = [];

  useEffect(() => {
    return () => {
      fetchController.abort();
    };
  }, []);

  useEffect(() => {
    getData('/api/covid19/world', fetchController)
      .then((response: Response) => {
        return response.json();
      })
      .then(geoAreas => {
        setGeoAreas(geoAreas);
      })
      .catch(error => console.log(error));
  }, [!geoAreas]);

  const getLineSeries = areaData => {
    const countryRegion = areaData['Country/Region'];

    if (shouldShowCountry(countryRegion)) {
      const data = getDailyData(areaData);

      return (
        <LineSeries
          curve={null}
          data={data}
          key={uuidv4()}
          opacity={1}
          strokeStyle="solid"
          style={{}}
        />
      );
    }
  };

  return (
    <div>
      <XYPlot height={500} style={{ backgroundColor: '#fff' }} width={500}>
        <HorizontalGridLines />
        <XAxis
          title="Date"
          tickFormat={(timestamp: number) => formatTimestamp(timestamp)}
        />
        <YAxis title="Cases" width={55} />
        {geoAreas.length > 0 &&
          geoAreas.map(areaData => {
            const countryRegion = areaData['Country/Region'];

            if (shouldShowCountry(countryRegion)) {
              legendItems.push(countryRegion);
              return getLineSeries(areaData);
            }
          })}
      </XYPlot>
      <DiscreteColorLegend
        height={50}
        items={legendItems}
        orientation="horizontal"
        style={{ backgroundColor: '#fff' }}
        width={500}
      />
    </div>
  );
}

function formatTimestamp(timestamp: number) {
  return format(fromUnixTime(timestamp), 'M/d');
}

function getDailyData(area) {
  const days = [];

  for (const day in area) {
    try {
      // Only include parseable values (that is, dates)
      const x = getUnixTime(parse(day, 'M/d/yy', new Date()));
      const y = parseInt(area[day], 10);
      const label = area['Province/State'];

      !isNaN(x) && !isNaN(y) && days.push({ x, y });
    } catch (error) {
      console.log(`Unable to add to daily data: ${error}`);
    }
  }
  return days;
}

function isUs(countryRegion): boolean {
  return countryRegion.toLowerCase().match(/\bus\b/);
}

function shouldShowCountry(countryRegion): boolean {
  const countriesToShow = ['us', 'turkey', 'spain', 'italy'];
  return countriesToShow.indexOf(countryRegion.toLowerCase()) > -1;
}
