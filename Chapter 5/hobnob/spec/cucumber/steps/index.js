import assert from 'assert';
import superagent from 'superagent';
import { Given, When, Then } from 'cucumber';
import elasticsearch from 'elasticsearch';
import { getValidPayload, convertStringToArray } from './utils';

const client = new elasticsearch.Client();

When(/^the client creates a (GET|POST|PATCH|PUT|DELETE|OPTIONS|HEAD) request to ([\/\w-]+)$/, function (method, path) {
  this.request = superagent(method, `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT_TEST}${path}`);
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

Given(/^attaches an? (.+) payload where the ([a-zA-Z0-9, ]+) fields? (?:is|are)(\s+not)? a ([a-zA-Z]+)$/, function (payloadType, fields, invert, type) {
  this.requestPayload = getValidPayload(payloadType);
  const typeKey = type.toLowerCase();
  const invertKey = invert ? 'not' : 'is';
  const sampleValues = {
    string: {
      is: 'string',
      not: 10,
    }
  }
  const fieldsToModify = fields.split(',').map(s=>s.trim()).filter(s=>s!=="");
  fieldsToModify.forEach(field => {
    this.requestPayload[field] = sampleValues[typeKey][invertKey];
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

Then(/^our API should respond with a ([1-5]\d{2}) HTTP status code$/, function (statusCode) {
  assert.equal(this.response.statusCode, statusCode);
});

Then(/^the payload of the response should be an? ([a-zA-Z0-9, ]+)$/, function (payloadType) {
  const contentType = this.response.headers['Content-Type'] || this.response.headers['content-type'];  
  if (payloadType === "JSON object") {
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

Then('the newly-created user should be deleted', function (callback) {
  client.delete({
    index: process.env.ELASTICSEARCH_INDEX_TEST,
    type: this.type,
    id: this.responsePayload
  })
  .then(function (res) {
    assert.equal(res.result, 'deleted');
    callback();
  })
  .catch(callback)
})
