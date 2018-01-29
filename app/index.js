'use strict'

import dotenv from 'dotenv'
import exphbs from 'express-handlebars'
import express from 'express'
import path from 'path'
import webpack from 'webpack'
import common from '../webpack.common'

dotenv.config()

let webpackConfig
switch (process.env.NODE_ENV) {
case 'production':
  webpackConfig = require('../webpack.prod')(process.env)
  break

case 'development':
default:
  webpackConfig = require('../webpack.dev')(process.env)
  break
}

const compiler = webpack(webpackConfig)
const app = express()
const port = process.env.PORT

if (process.env.NODE_ENV === 'development') {
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  )
  app.use(require('webpack-hot-middleware')(compiler))
}

app.use(
  '/static/',
  express.static(path.join(__dirname, '..', 'static', 'dist'))
)
app.use(
  '/modules/',
  express.static(path.join(__dirname, '..', 'node_modules', 'dist'))
)

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
  })
)
app.set('view engine', '.hbs')

// routes
app.get('/', (req, res) => res.render('index'))

app.listen(port, function() {
  console.log(`App listening on port ${port}.`)
})
