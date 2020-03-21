import { myCache } from '../main';
import parse from 'csv-parse/lib/sync';
import fetch from 'isomorphic-fetch';

const confirmedCacheKey = 'confirmed';
const confirmedUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';
const cacheTtl = 21600; // 6 hours, in seconds

export function getConfirmed(req, res) {
  let covid19Confirmed = myCache.get(confirmedCacheKey);

  if (covid19Confirmed) {
    console.info('retrieved from cache');
    return res
      .status(200)
      .json(covid19Confirmed)
      .end();
  }

  fetch(confirmedUrl)
    .then(function(response) {
      if (response.ok) {
        console.info('fetched');
        response
          .text()
          .then(responseText => {
            covid19Confirmed = parse(responseText, {
              columns: true,
              skip_empty_lines: true
            });
            myCache.set(confirmedCacheKey, covid19Confirmed, cacheTtl);

            return res
              .status(200)
              .json(covid19Confirmed)
              .end();
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        return Promise.reject(response.status);
      }
    })
    .catch(error => console.error(error));
}
