import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import get from 'lodash.get';
import * as React from 'react';

import { getOptions } from './statesCaDailyOptions';

interface Props {
  last30DaysOfTransformedData: Partial<Highcharts.Point>[];
}

export default function StatesCaDaily(props: Props): JSX.Element {
  const options = getOptions();
  const seriesOptions: Highcharts.SeriesLineOptions = get(options, 'series[0]');
  seriesOptions.data = props.last30DaysOfTransformedData;

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
