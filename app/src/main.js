import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import NodeCache from 'node-cache';
import router from './router';
import debug from 'debug';

export const myCache = new NodeCache();

dotenv.config();

export function main(app) {
  debug('app');

  app.use(bodyParser.raw());

  app.engine(
    '.hbs',
    exphbs({
      defaultLayout: 'main',
      extname: '.hbs'
    })
  );

  app.set('view engine', '.hbs');

  app.use('/', router);

  const port = process.env.PORT || 5000;

  app.listen(port, function() {
    console.info(`App listening on port ${port}.`);
  });
}
