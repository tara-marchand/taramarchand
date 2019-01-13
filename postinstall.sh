#!/bin/bash

if [[ $NODE_ENV = 'production' ]]; then
  npm run build:prod;
fi