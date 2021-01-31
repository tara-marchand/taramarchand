import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import takeRight from 'lodash.takeright';
import * as React from 'react';
import { getData } from '../../data/utils';
import { getOptionsStatesCaDaily } from './config';
import { transformDataForCaByDay } from './data';

export default function StatesCaDaily() {
  const fetchController: AbortController = new AbortController();
  const [data, setData] = React.useState<PartialPoint[]>([]);

  React.useEffect(() => {
    return () => {
      fetchController.abort();
    };
  }, []);

  React.useEffect(() => {
    const dataPromise = getData(
      'https://api.covidtracking.com/v1/states/ca/daily.json',
      fetchController
    );

    dataPromise &&
      dataPromise
        .then((response: Response) => {
          return response.json();
        })
        .then((data: Daily[]) => {
          // get deaths by day by state
          setData(transformDataForCaByDay(data));
        })
        .catch((error) => console.error(error));
  }, [!data.length]);

  const last30DaysOfData = takeRight(data, 30);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getOptionsStatesCaDaily(last30DaysOfData)}
    />
  );
}
