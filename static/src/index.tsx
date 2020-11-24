import amplitude, { AmplitudeClient } from 'amplitude-js';
import 'core-js/stable';
import Highcharts from 'highcharts';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-hot-loader';
import { Provider } from 'react-redux';
import 'regenerator-runtime';
import App from './components/App';
import store from './data/store';
import './index.scss';

const amp: AmplitudeClient = amplitude.getInstance(
  process.env.AMPLITUDE_API_KEY
);
process.env.AMPLITUDE_API_KEY &&
  amp.init(process.env.AMPLITUDE_API_KEY, undefined, {
    includeUtm: true,
    includeReferrer: true,
  });

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    thousandsSep: ',',
  },
});

amp.logEvent('APP_RENDER');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementsByClassName('root')[0]
);
