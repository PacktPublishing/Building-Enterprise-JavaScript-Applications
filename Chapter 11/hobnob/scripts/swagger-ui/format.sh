#!/bin/bash

source <(dotenv-export | sed 's/\\n/\n/g')
sed -i "s!http://petstore.swagger.io/v2/swagger.json!http://$SERVER_HOST:$SERVER_PORT/openapi.yaml!g" docs/dist/index.html
sed -i '/<\/head>/i \
<style>.topbar { display: none; }<\/style>' docs/dist/index.html