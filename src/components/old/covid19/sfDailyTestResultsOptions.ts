export function getOptions(): Highcharts.Options {
  return {
    legend: {
      enabled: false,
    },
    series: [
      {
        // data,
        type: 'line',
      },
    ],
    title: {
      text: 'Daily Positive COVID-19 Test Results in SF for Past 30 Days',
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
        text: '# Positive Test Results',
      },
    },
  };
}
