#!/bin/bash

if [[ $NODE_ENV == 'production' ]]; then
  npm run lerna-bootstrap
  npm run build:prod
fi
