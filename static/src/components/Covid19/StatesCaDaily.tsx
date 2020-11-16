import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import takeRight from 'lodash.takeright';
import * as React from 'react';
import { getData } from '../../data/utils';
import { getOptionsStatesCaDaily } from './config';
import { transformDataForCaByDay } from './data';

export default function StatesCaDaily() {
  const fetchController: AbortController = new AbortController();
  const [data, setData] = React.useState<object[]>([]);

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
      .then((data) => {
        // get deaths by day by state
        const transformedData = transformDataForCaByDay(data);

        setData(transformedData);
      })
      .catch((error) => console.error(error));
  }, [!data]);

  const last30DaysOfData = takeRight(data, 30);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getOptionsStatesCaDaily(last30DaysOfData)}
    />
  );
}
