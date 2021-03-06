import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { get } from 'lodash';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { getStaticProps } from '../../../pages/covid19';
import { getOptions } from './statesCaDailyOptions';

export default function StatesCaDaily({
  last30DaysOfTransformedData,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  const options = getOptions();
  const seriesOptions: Highcharts.SeriesLineOptions = get(options, 'series[0]');

  seriesOptions.data = last30DaysOfTransformedData;

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
