import { parse } from 'date-fns';
import { sortBy, takeRight } from 'lodash';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

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

export async function getStaticProps() {
  const response = await fetch(
    'https://api.covidtracking.com/v1/states/ca/daily.json'
  );
  const data: Daily[] = await response.json();
  const transformedData = transformDataForCaByDay(data);
  const last30DaysOfTransformedData = takeRight(transformedData, 30);

  return {
    props: {
      last30DaysOfTransformedData,
    },
  };
}

export default function covid19({
  last30DaysOfTransformedData,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
  return (
    <div>
      <StatesCaDaily
        last30DaysOfTransformedData={last30DaysOfTransformedData}
      />
    </div>
  );
}
