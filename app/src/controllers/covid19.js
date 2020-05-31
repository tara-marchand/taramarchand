import parse from 'csv-parse/lib/sync';
import debug from 'debug';
import fetch from 'isomorphic-fetch';
import { myCache } from '../main';

const usCasesCacheKey = 'usCases';
const usCasesUrl =
  'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv';

const worldCasesCacheKey = 'worldCases';
const worldCasesUrl =
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';

const cacheTtl = 21600; // 6 hours, in seconds

function getData(req, res, cacheKey, url) {
  let data = myCache.get(cacheKey);

  if (data) {
    console.log('retrieved from cache');
    return res
      .status(200)
      .json(data)
      .end();
  }

  fetch(url)
    .then(function(response) {
      if (response.ok) {
        console.log('fetched');
        response
          .text()
          .then(responseText => {
            data = parse(responseText, {
              columns: true,
              skip_empty_lines: true
            });
            myCache.set(cacheKey, data, cacheTtl);

            return res
              .status(200)
              .json(data)
              .end();
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        return Promise.reject(response.status);
      }
    })
    .catch(error =>
      console.log(`Unable to fetch data from URL ${url}: error code ${error}`)
    );
}

function getWorldCases(req, res) {
  return getData(req, res, worldCasesCacheKey, worldCasesUrl);
}

function getUsCases(req, res) {
  return getData(req, res, usCasesCacheKey, usCasesUrl);
}

export default {
  getUsCases,
  getWorldCases
};
