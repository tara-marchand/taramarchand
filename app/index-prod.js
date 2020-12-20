const compression = require('compression');
const express = require('express');
require('newrelic');
const webpack = require('webpack');
const config = require('../config/webpack.prod');
const main = require('./main').main;

webpack(config);

const app = express();

app.use(compression());

main(app);
