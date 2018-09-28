import assert from 'assert';
import jsonfile from 'jsonfile';
import superagent from 'superagent';
import { Given, When, Then } from 'cucumber';
import elasticsearch from 'elasticsearch';
import objectPath from 'object-path';
import { processPath, getValidPayload, convertStringToArray } from './utils';

const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

Given(/^all documents of type (?:"|')([\w-]+)(?:"|') are deleted$/, function (type) {
  return client.deleteByQuery({
    index: process.env.ELASTICSEARCH_INDEX_TEST,
    type: type,
    body: {
      "query": {
        "match_all": {}
      }
    },
    conflicts: "proceed",
    refresh: true,
  });
});

Given(/^(\d+|all) documents in the (?:"|')([\w-]+)(?:"|') sample are added to the index with type (?:"|')([\w-]+)(?:"|')?/, function (count, sourceFile, type) {

  if(count < 1) {
    return;
  }
  if(count === "all") {
    count = Infinity;
  }

  // Get the data
  // Note that we could also have used the `require` syntax
  const source = jsonfile.readFileSync(`${__dirname}/../sample-data/${sourceFile}.json`);

  // Map the data to an array of objects as expected by Elasticsearch's API
  const action = {
    index: {
      _index: process.env.ELASTICSEARCH_INDEX_TEST,
      _type: type,
    }
  };
  const operations = [];
  for (let i = 0, len = source.length; i < len && i < count; i++ ) {
    operations.push(action);
    operations.push(source[i]);
  }

  // Do a bulk index, refreshing the index to make sure it is immediately searchable in subsequent steps
  return client.bulk({
    body: operations,
    refresh: 'true'
  });
})

When(/^the client creates a (GET|POST|PATCH|PUT|DELETE|OPTIONS|HEAD) request to ([\/\w-:]+)$/, function (method, path) {
  const processedPath = processPath(this, path);
  this.request = superagent(method, `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT_TEST}${processedPath}`);
});

When(/^attaches (.+) as the payload$/, function (payload) {
  this.requestPayload = JSON.parse(payload);
  this.request
    .send(payload)
    .set('Content-Type', 'application/json')
  return;
});

When(/^attaches a generic (.+) payload$/, function (payloadType) {
  switch (payloadType) {
    case 'malformed':
      this.request
        .send('{"email": "dan@danyll.com", name: }')
        .set('Content-Type', 'application/json')
      return;
    case 'non-JSON':
      this.request
        .send('<?xml version="1.0" encoding="UTF-8" ?><email>dan@danyll.com</email>')
        .set('Content-Type', 'text/xml')
      return;
    case 'empty':
    default:
      return;
  }
});

When(/^attaches a valid (.+) payload$/, function (payloadType) {
  this.requestPayload = getValidPayload(payloadType);
  this.request
    .send(JSON.stringify(this.requestPayload))
    .set('Content-Type', 'application/json')
  return;
});

When(/^attaches an? (.+) payload which is missing the ([a-zA-Z0-9, ]+) fields?$/, function (payloadType, missingFields) {
  this.requestPayload = getValidPayload(payloadType);
  const fieldsToDelete = convertStringToArray(missingFields);
  fieldsToDelete.forEach(field => delete this.requestPayload[field]);
  this.request
    .send(JSON.stringify(this.requestPayload))
    .set('Content-Type', 'application/json')
  return;
})

When(/^attaches an? (.+) payload which has the additional ([a-zA-Z0-9, ]+) fields?$/, function (payloadType, additionalFields) {
  this.requestPayload = getValidPayload(payloadType);
  const fieldsToAdd = convertStringToArray(additionalFields);
  fieldsToAdd.forEach(field => objectPath.set(this.requestPayload, field, 'foo'));
  this.request
    .send(JSON.stringify(this.requestPayload))
    .set('Content-Type', 'application/json')
  return;
})

Given(/^attaches an? (.+) payload where the ([a-zA-Z0-9\., ]+) fields? (?:is|are)(\s+not)? a ([a-zA-Z]+)$/, function (payloadType, fields, invert, type) {
  this.requestPayload = getValidPayload(payloadType);
  const typeKey = type.toLowerCase();
  const invertKey = invert ? 'not' : 'is';
  const sampleValues = {
    object: {
      is: {},
      not: 'string'
    },
    string: {
      is: 'string',
      not: 10,
    }
  }
  const fieldsToModify = convertStringToArray(fields);
  fieldsToModify.forEach(field => {
    objectPath.set(this.requestPayload, field, sampleValues[typeKey][invertKey]);
  });
  this.request
    .send(JSON.stringify(this.requestPayload))
    .set('Content-Type', 'application/json')
  return;
})

Given(/^attaches an? (.+) payload where the ([a-zA-Z0-9, ]+) fields? (?:is|are) exactly (.+)$/, function (payloadType, fields, value) {
  this.requestPayload = getValidPayload(payloadType);
  const fieldsToModify = convertStringToArray(fields);
  fieldsToModify.forEach(field => {
    this.requestPayload[field] = value;
  });
  this.request
    .send(JSON.stringify(this.requestPayload))
    .set('Content-Type', 'application/json')
  return;
});

When(/^without a (?:"|')([\w-]+)(?:"|') header set$/, function (headerName) {
  this.request.unset(headerName);
})

When('sends the request', function (callback) {
  this.request
    .then(response => {
      this.response = response.res;
      callback();
    })
    .catch(error => {
      this.response = error.response;
      callback();
    })
});

When(/^saves the response text in the context under ([\w.]+)$/, function (contextPath) {
  objectPath.set(this, contextPath, this.response.text);
})

Then(/^our API should respond with a ([1-5]\d{2}) HTTP status code$/, function (statusCode) {
  assert.equal(this.response.statusCode, statusCode);
});

Then(/^the payload of the response should be an? ([a-zA-Z0-9, ]+)$/, function (payloadType) {
  const contentType = this.response.headers['Content-Type'] || this.response.headers['content-type'];
  if (
    payloadType === "JSON object"
    || payloadType === "array"
  ) {
    // Check Content-Type header
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response not of Content-Type application/json');
    }

    // Check it is valid JSON
    try {
      this.responsePayload = JSON.parse(this.response.text);
    } catch (e) {
      throw new Error('Response not a valid JSON object');
    }
  } else if (payloadType === "string") {
    // Check Content-Type header
    if (!contentType || !contentType.includes('text/plain')) {
      throw new Error('Response not of Content-Type text/plain');
    }

    // Check it is a string
    this.responsePayload = this.response.text;
    if (typeof this.responsePayload !== 'string') {
      throw new Error('Response not a string');
    }
  }
});

Then(/^the response should contain (\d+) items$/, function (count) {
  assert.equal(this.responsePayload.length, count);
})

Then(/^the ([\w.]+) property of the response should be an? ([\w.]+) with the value (.+)$/, function (responseProperty, expectedResponseType, expectedResponse) {
  if (responseProperty === 'root') {
    responseProperty = '';
  }
  const parsedExpectedResponse = (function () {
    switch (expectedResponseType) {
      case 'object':
        return JSON.parse(expectedResponse);
      case 'string':
        return expectedResponse.replace(/^(?:["'])(.*)(?:["'])$/, '$1');
      default:
        return expectedResponse;
    }
  })();
  assert.deepEqual(objectPath.get(this.responsePayload, responseProperty), parsedExpectedResponse);
});

Then(/^the ([\w.]+) property of the response should be the same as context\.([\w.]+)$/, function (responseProperty, contextProperty) {
  if (responseProperty === 'root') {
    responseProperty = '';
  }
  assert.deepEqual(objectPath.get(this.responsePayload, responseProperty), objectPath.get(this, contextProperty));
});

Then(/^the ([\w.]+) property of the response should be the same as context\.([\w.]+) but without the ([\w.]+) fields?$/, function (responseProperty, contextProperty, missingFields) {
  if (responseProperty === 'root') {
    responseProperty = '';
  }
  const contextObject = objectPath.get(this, contextProperty);
  const fieldsToDelete = convertStringToArray(missingFields);
  fieldsToDelete.forEach(field => delete contextObject[field]);
  assert.deepEqual(objectPath.get(this.responsePayload, responseProperty), contextObject);
});

Then(/^contains a message property which says (?:"|')(.*)(?:"|')$/, function (message) {
  assert.equal(this.responsePayload.message, message);
});

Then(/^the payload object should be added to the database, grouped under the "([a-zA-Z]+)" type$/, function (type, callback) {
  this.type = type;
  client.get({
    index: process.env.ELASTICSEARCH_INDEX_TEST,
    type: type,
    id: this.responsePayload
  })
    .then((result) => {
      assert.deepEqual(result._source, this.requestPayload);
      callback();
    })
    .catch(callback)
});

Then(/^the entity of type (\w+), with ID stored under ([\w\.]+), should be deleted$/, function (type, idPath, callback) {
  client.delete({
    index: process.env.ELASTICSEARCH_INDEX_TEST,
    type: type,
    id: objectPath.get(this, idPath)
  })
    .then(function (res) {
      assert.equal(res.result, 'deleted');
      callback();
    })
    .catch(callback)
})

Then(/^the first item of the response should have property ([\w\.]+) set to (.+)$/, function (path, value) {
  assert.equal(objectPath.get(this.responsePayload[0], path), value);
})
