import { parse } from 'date-fns';
import { sortBy, takeRight } from 'lodash';
import React from 'react';
import useSWR from 'swr';
import StatesCaDaily from '../components/pages/covid19/StatesCaDaily';

const transformDataForCaByDay = (
  statesCaDailyRaw: Daily[]
): Partial<Highcharts.Point>[] =>
  sortBy(
    statesCaDailyRaw.map((day: Daily) => {
      const parsedDate = parse(day.date + '', 'yyyyMMdd', new Date());
      const parsedDateUtcMilliseconds = Date.UTC(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
        parsedDate.getHours(),
        parsedDate.getMinutes(),
        parsedDate.getSeconds()
      );

      return {
        x: parsedDateUtcMilliseconds,
        y: day.death,
      };
    }),
    (day) => day.x
  );

export default function Covid19(): React.ReactElement | null {
  const { data, error } = useSWR<Daily[]>('/api/user', async () => {
    const response = await fetch(
      'https://api.covidtracking.com/v1/states/ca/daily.json'
    );
    return await response.json();
  });

  if (error) {
    console.error(error);
  }

  if (!data) {
    return null;
  }

  const transformedData = transformDataForCaByDay(data);
  const last30DaysOfTransformedData = takeRight(transformedData, 30);

  return (
    <div>
      <StatesCaDaily
        last30DaysOfTransformedData={last30DaysOfTransformedData}
      />
    </div>
  );
}
