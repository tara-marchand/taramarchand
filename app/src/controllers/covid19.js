import csv from 'csv';
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
  // let data = myCache.get(cacheKey);

  // if (data) {
  //   console.log('retrieved from cache');
  //   return res
  //     .status(200)
  //     .json(data)
  //     .end();
  // }

  const output = [];
  const parser = csv.parse({
    skip_empty_lines: false,
    to: 100
  });

  // Use the readable stream API
  parser.on('readable', function() {
    let record;
    while ((record = parser.read())) {
      console.log(record);
      output.push(record);
    }
  });

  parser.on('error', function(err) {
    console.error(err.message);
  });

  parser.on('end', function() {
    myCache.set(cacheKey, output, cacheTtl);

    return res
      .status(200)
      .json(output)
      .end();
  });

  fetch(url)
    .then(response => response.body)
    .then(body => {
      // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
      body.on('readable', () => {
        let chunk;
        let chunkString;

        while (null !== (chunk = body.read())) {
          chunkString = chunk.toString();
          console.log(chunkString);
          parser.write(chunkString);
        }
      });

      body.on('end', () => {
        parser.end();
      });
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
