import 'newrelic';
import compression from 'compression';
import express from 'express';
import webpack from 'webpack';
import config from '../../config/webpack.prod';
import { main } from './main';

webpack(config);

const app = express();

app.use(compression());

main(app);
