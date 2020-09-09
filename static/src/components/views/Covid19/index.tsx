import { parse } from 'date-fns';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import sortBy from 'lodash.sortby';
import takeRight from 'lodash.takeright';
import * as React from 'react';
import { getData } from '../../../utils';

export default function Covid19() {
  const fetchController: AbortController = new AbortController();
  const [caDataForAllDays, setCaDataForAllDays] = React.useState<object[]>([]);

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
      .then((historicalValuesCaJson) => {
        // get deaths by day by state
        const caData = getDataForCaByDay(historicalValuesCaJson);

        setCaDataForAllDays(caData);
      })
      .catch((error) => console.error(error));
  }, [!caDataForAllDays]);

  const last30DaysOfData = takeRight(caDataForAllDays, 30);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={getChartOptions(last30DaysOfData)}
    />
  );
}

function getChartOptions(data) {
  return {
    legend: {
      enabled: false,
    },
    series: [
      {
        data: data,
        type: 'line',
      },
    ],
    title: {
      text: 'Cum. COVID-19 Deaths in CA for Past 30 Days',
    },
    tooltip: {
      headerFormat: '<span>{point.key}</span><br/>',
      pointFormat: '<b>{point.y}</b><br/>',
    },
    xAxis: {
      labels: {
        format: '{value:%b %e}',
      },
      minorTicks: true,
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Cum. # Deaths',
      },
    },
  };
}

function getDataForCaByDay(historicalValuesCaJson) {
  return sortBy(
    historicalValuesCaJson.map((day) => {
      const parsedDate = parse(day.date, 'yyyyMMdd', new Date());
      const parsedDateUtcMilliseconds = Date.UTC(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
        parsedDate.getHours(),
        parsedDate.getMinutes(),
        parsedDate.getSeconds()
      );

      return [parsedDateUtcMilliseconds, day.death];
    }),
    (day) => day[0]
  );
}
