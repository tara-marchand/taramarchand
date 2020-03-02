import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import path from 'path';
import webpack from 'webpack';

import models from './models';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'production') {
  import(
    /* webpackChunkName: "webpackConfig" */ '../../config/webpack.prod'
  ).then(config => {
    webpack(config.default);
  });
  app.use(compression());
} else if (process.env.NODE_ENV === 'development') {
  import(
    /* webpackChunkName: "webpackConfig" */ '../../config/webpack.dev'
  ).then(config => {
    const compiler = webpack(config.default);

    import(/* webpackChunkName: "webpackDev" */ 'webpack-dev-middleware').then(
      webpackDevMiddleware => {
        console.log('dev middleware');
        app.use(
          webpackDevMiddleware.default(compiler, {
            publicPath: config.default.output.publicPath
          })
        );

        import(
          /* webpackChunkName: "webpackDev" */ 'webpack-hot-middleware'
        ).then(webpackHotMiddleware => {
          console.log('hot middleware');
          app.use(
            webpackHotMiddleware.default(compiler, {
              reload: true
            })
          );
        });
      }
    );
  });
}

app.use(bodyParser.raw());

function setHeaders(response, path) {
  console.log(response, path);
}

app.use(
  '/static',
  express.static(path.resolve(process.cwd(), 'static/dist'), {
    index: false
    // setHeaders
  })
);

app.use(
  '/gatsby',
  express.static(path.join(process.cwd(), 'static/gatsby/public'))
);

app.use(
  '/node_modules',
  express.static(path.resolve(process.cwd(), 'node_modules'))
);

app.get('/api/books', (req, res) => {
  models.Book.findAll().then(books => {
    res
      .status(200)
      .json(books)
      .end();
  });
});

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

app.all('*', (req, res) => {
  res.render('index', {
    isProd: process.env.NODE_ENV === 'production'
  });
});

const port = process.env.PORT;

app.listen(port, function() {
  console.info(`App listening on port ${port}.`);
});
