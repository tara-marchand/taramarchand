import { format, fromUnixTime, getUnixTime, parse } from 'date-fns';
import React, { useEffect } from 'react';
import {
  DiscreteColorLegend,
  HorizontalGridLines,
  LineSeries,
  XAxis,
  XYPlot,
  YAxis
} from 'react-vis';
import uuidv4 from 'uuid';
import '../../../../../node_modules/react-vis/dist/style.css';
import { getData } from '../../../utils';

interface UsCountyItem {
  date: string;
  county: string;
  state: string;
  cases: number;
  deaths: number;
}

export default function Covid19UnitedStates() {
  const fetchController: AbortController = new AbortController();
  const [usCountyData, setUsCountyData] = React.useState<UsCountyItem[]>([]);
  let legendItems = [];

  useEffect(() => {
    return () => {
      fetchController.abort();
    };
  }, []);

  useEffect(() => {
    getData('/api/covid19/us', fetchController)
      .then((response: Response) => {
        return response.json();
      })
      .then(rawUsCountyData => {
        setUsCountyData(rawUsCountyData);
      })
      .catch(error => console.log(error));
  }, [!usCountyData]);

  const getLineSeries = usCountyItem => {
    const state = usCountyItem['state'];

    if (shouldShowState(state)) {
      const data = getDailyData(usCountyItem);

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
        {/* combine by state */}
        {/* combine by county */}
        <YAxis title="Cases" width={55} />
        {usCountyData.length > 0 &&
          usCountyData.map((usCountyItem: UsCountyItem) => {
            const state = usCountyItem['state'];

            if (shouldShowState(state)) {
              legendItems.push(`${usCountyItem['county']}, ${state}`);
              return getLineSeries(usCountyItem);
            }
          })}
      </XYPlot>
      {/* <DiscreteColorLegend
        height={50}
        items={legendItems}
        orientation="horizontal"
        style={{ backgroundColor: '#fff' }}
        width={500}
      /> */}
    </div>
  );
}

function formatTimestamp(timestamp: number) {
  return format(fromUnixTime(timestamp), 'M/d');
}

function getDailyData(usCountyItem) {
  const days = [];

  for (const item in usCountyItem) {
    try {
      // Only include parseable values (that is, dates)
      const x = getUnixTime(parse(item, 'yyyy-MM-dd', new Date()));
      const y = parseInt(usCountyItem[item], 10);
      const label = usCountyItem['Province/State'];

      !isNaN(x) && !isNaN(y) && days.push({ x, y });
    } catch (error) {
      console.log(`Unable to add to daily data: ${error}`);
    }
  }
  return days;
}

function selectDailyDataByState(state) {}

function selectDailyDataByStateAndCounty(state, county) {}

function shouldShowState(state): boolean {
  const statesToShow = ['california'];
  return statesToShow.indexOf(state.toLowerCase()) > -1;
}
