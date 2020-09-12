import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import takeRight from 'lodash.takeright';
import * as React from 'react';
import { getData } from '../../../utils';
import { getOptionsStatesCaDaily, getDataForCaByDay } from './data';

export default function Covid19() {
  const fetchController: AbortController = new AbortController();
  const [statesCaDaily, setStatesCaDaily] = React.useState<object[]>([]);

  React.useEffect(() => {
    return () => {
      fetchController.abort();
    };
  }, []);

  React.useEffect(() => {
    getData(
      'https://api.covidtracking.com/v1/states/ca/daily.json',
      fetchController
    )
      .then((response: Response) => {
        return response.json();
      })
      .then((statesCaDailyAll) => {
        // get deaths by day by state
        const caData = getDataForCaByDay(statesCaDailyAll);

        setStatesCaDaily(caData);
      })
      .catch((error) => console.error(error));
  }, [!statesCaDaily]);

  const last30DaysOfData = takeRight(statesCaDaily, 30);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getOptionsStatesCaDaily(last30DaysOfData)}
    />
  );
}
