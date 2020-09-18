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
