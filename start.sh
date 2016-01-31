#!/bin/bash

if [ "$NODE_ENV" == "development" ]
then
  nodemon -x "node --use_strict" -e .js -w src src/server.js
else
  node --use_strict src/server.js
fi
