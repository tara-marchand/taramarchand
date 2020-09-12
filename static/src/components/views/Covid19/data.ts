import { parse } from 'date-fns';
import Highcharts from 'highcharts';
import sortBy from 'lodash.sortby';

export function getOptionsStatesCaDaily(data): Highcharts.Options {
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
      text: 'Cum. COVID-19 Deaths for Past 30 Days',
    },
    tooltip: {
      headerFormat: '<span>{point.key}</span><br/>',
      pointFormat: '<b>{point.y}</b><br/>',
      valueSuffix: ' Deaths',
      xDateFormat: '%b %e',
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

export function getDataForCaByDay(statesCaDailyRaw) {
  return sortBy(
    statesCaDailyRaw.map((day) => {
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
