'use strict';

import express from 'express';
import exphbs from 'express-handlebars';

const app = express()

app.use('/public', express.static(path.join(__dirname, '../public')));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('App listening on port 3000.')
})
