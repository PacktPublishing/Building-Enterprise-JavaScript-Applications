#!/bin/bash

# Set environment variables from .env and set NODE_ENV to test
source <(dotenv-export | sed 's/\\n/\n/g')
export NODE_ENV=test

# Make sure our local Elasticsearch service is not running
echo -ne '  5% [##                                      ] Stopping local Elasticsearch service      \r'
sudo systemctl stop elasticsearch.service
# Download Elasticsearch Docker image
echo -ne ' 10% [####                                    ] Downloading Elasticsearch image           \r'
docker pull docker.elastic.co/elasticsearch/elasticsearch-oss:${ELASTICSEARCH_VERSION} > /dev/null
# Get the Image ID for the Elasticsearch
echo -ne ' 20% [########                                ] Retrieving Elasticsearch image ID         \r'
ELASTICSEARCH_DOCKER_IMAGE_ID=$(docker images docker.elastic.co/elasticsearch/elasticsearch-oss --format '{{.ID}}')
# Get all running containers using the ELasticsearch Docker image and remove them
echo -ne ' 25% [##########                              ] Removing Existing Elasticsearch Containers\r'
docker ps -a --filter "ancestor=${ELASTICSEARCH_DOCKER_IMAGE_ID}" --format '{{.ID}}' | xargs -I_cid -- bash -c 'docker stop _cid && docker rm _cid' > /dev/null
# Run the Elasticsearch Docker image
echo -ne ' 35% [##############                          ] Initiating Elasticsearch Container        \r'
docker run --name elasticsearch -e "discovery.type=single-node" -d -p ${ELASTICSEARCH_PORT}:9200 -p 9300:9300 docker.elastic.co/elasticsearch/elasticsearch-oss:${ELASTICSEARCH_VERSION} > /dev/null

# Polling to see if the Elasticsearch daemon is ready to receive a response
TRIES=0
RETRY_LIMIT=50
RETRY_INTERVAL=0.4
ELASTICSEARCH_READY=false
while [ $TRIES -lt $RETRY_LIMIT ]; do
  if curl --silent localhost:${ELASTICSEARCH_PORT} -o /dev/null; then
    ELASTICSEARCH_READY=true
    break
  else
    sleep $RETRY_INTERVAL
    let TRIES=TRIES+1
  fi
done

echo -ne ' 50% [####################                    ] Elasticsearch Container Initiated         \r'
TRIES=0

if $ELASTICSEARCH_READY; then
  # Clean the test index (if it exists)
  echo -ne ' 55% [######################                  ] Cleaning Elasticsearch Index              \r'
  curl --silent -o /dev/null -X DELETE "$ELASTICSEARCH_HOSTNAME:$ELASTICSEARCH_PORT/$ELASTICSEARCH_INDEX_TEST"

  # Run our API server as a background process
  echo -ne ' 60% [########################                ] Initiating API                            \r'
  yarn run serve > /dev/null &

  # Polling to see if the server is up and running yet
  SERVER_UP=false
  while [ $TRIES -lt $RETRY_LIMIT ]; do
    if netstat -tulpn 2>/dev/null | grep -q ":$SERVER_PORT_TEST.*LISTEN"; then
      SERVER_UP=true
      break
    else
      sleep $RETRY_INTERVAL
      let TRIES=TRIES+1
    fi
  done

  # Only run this if API server is operational
  if $SERVER_UP; then
    echo -ne ' 75% [##############################          ] API Initiated                             \r'
    # Run the test in the background
    echo -ne ' 80% [################################        ] Running E2E Tests                         \r'
    npx dotenv cucumberjs spec/cucumber/features -- --compiler js:babel-register --require spec/cucumber/steps &

    # Waits for the next job to terminate - this should be the tests
    wait -n
  fi
fi

# Stop all Elasticsearch Docker containers but don't remove them
echo -ne ' 98% [####################################### ] Tests Complete                            \r'
echo -ne ' 99% [####################################### ] Stopping Elasticsearch Containers         \r'
docker ps -a --filter "ancestor=${ELASTICSEARCH_DOCKER_IMAGE_ID}" --format '{{.ID}}' | xargs -I{} docker stop {} > /dev/null
echo '100% [########################################] Complete                                    '

# Terminate all processes within the same process group by sending a SIGTERM signal
kill -15 0

