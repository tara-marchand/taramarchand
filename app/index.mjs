import dirname from './dirname';
import Models from './models';
import schema from './schema';
import resolvers from './resolvers';

// import newrelic from 'newrelic';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import express from 'express';
import Apollo from 'apollo-server-express';
import morgan from 'morgan';
// import mime from 'mime-types';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { default as webpackDevConfig } from '../webpack.dev';
import { default as webpackProdConfig } from '../webpack.prod';

dotenv.config();

let webpackConfig;
if (process.env.NODE_ENV === 'development') {
  webpackConfig = webpackDevConfig;
} else if (process.env.NODE_ENV === 'production') {
  webpackConfig = webpackProdConfig;
}
const compiler = webpack(webpackConfig);

const typeDefs = Apollo.gql(schema);
const executableSchema = Apollo.makeExecutableSchema({
  typeDefs,
  resolvers
});
const apolloServer = new Apollo.ApolloServer({
  schema: executableSchema
});

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      reload: true
    })
  );
} else if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

app.use(bodyParser.raw());

app.use(
  '/static',
  express.static(path.resolve(dirname, '..', 'static', 'dist'), {
    index: false
  })
);

app.use(
  '/node_modules',
  express.static(path.resolve(dirname, '..', 'node_modules'))
);

app.use(
  morgan(
    '[:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length]'
  )
);

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
  })
);

app.set('view engine', '.hbs');

app.all('*', (req, res, next) => {
  if (req.url === '/graphql') {
    return next();
  }

  res.render('index', {
    isProd: process.env.NODE_ENV === 'production'
  });
});

apolloServer.applyMiddleware({ app });

const port = process.env.PORT || 3000;

Models.sequelize.sync().then(() => {
  app.listen(port, function() {
    console.info(`App listening on port ${port}.`);
  });
});
