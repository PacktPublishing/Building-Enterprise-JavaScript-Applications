#!/bin/bash

source <(dotenv-export | sed 's/\\n/\n/g')
yarn run docs:update
http-server docs/dist/ -p $SWAGGER_UI_PORT
