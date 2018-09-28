#!/bin/bash

# Set environment variables from .env and set NODE_ENV to test
source <(dotenv-export | sed 's/\\n/\n/g')
export NODE_ENV=test

yarn run api:init > /dev/null 2>&1 &
yarn run api:install > /dev/null 2>&1 &
yarn run api:serve > /dev/null 2>&1 &

# Run our web server as a background process
yarn run serve > /dev/null 2>&1 &

# Polling to see if the server is up and running yet
TRIES=0
RETRY_LIMIT=50
RETRY_INTERVAL=0.5
SERVER_UP=false
while [ $TRIES -lt $RETRY_LIMIT ]; do
  if netstat -tulpn 2>/dev/null | grep -q ":$WEB_SERVER_PORT_TEST.*LISTEN"; then
    SERVER_UP=true
    break
  else
    sleep $RETRY_INTERVAL
    let TRIES=TRIES+1
  fi
done

# Only run this if API server is operational
if $SERVER_UP; then
  for browser in "$@"; do
    export TEST_BROWSER="$browser"
    echo -e "\n---------- $TEST_BROWSER test start ----------"
    npx dotenv cucumberjs spec/cucumber/features -- --compiler js:babel-register --require spec/cucumber/steps
    echo -e "----------- $TEST_BROWSER test end -----------\n"
  done
else
  >&2 echo "Web server failed to start"
fi

# Terminate all processes within the same process group by sending a SIGTERM signal
kill -15 0
