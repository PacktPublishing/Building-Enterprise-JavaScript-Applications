import assert from 'assert';
import elasticsearch from 'elasticsearch';
import { VALIDATION_ERROR, VALIDATION_ERROR_MESSAGE } from '../../../tests/stubs/validate';
import ValidationError from '../../../validators/errors/validation-error';
import create from '.';

process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_TEST;

describe('Profile Engine - Create', function () {
  describe('When the request is not valid', function () {
    before(function () {
      const req = {};
      return create(req).catch(err => { this.error = err });
    })
    it('should return with a promise that rejects with the ValidationError', function () {
      assert(this.error instanceof ValidationError, true);
      assert(this.error, VALIDATION_ERROR);
      assert(this.error.message, VALIDATION_ERROR_MESSAGE);
    })
  })
  describe('When the request is valid', function () {
    before(function () {
      const req = {
        body: {
          email: 'e@ma.il',
          password: 'hunter2',
        }
      };
      return create(req)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    })
    after(function () {
      const client = new elasticsearch.Client({
        host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
      });
      return client.delete({
        index: process.env.ELASTICSEARCH_INDEX,
        type: 'user',
        id: this.result
      })
    })
    it('should return with a promise that resolves to a string representing the ID of the newly-created user', function () {
      assert.equal(this.error, undefined);
      assert.equal(typeof this.result, 'string');
    });
  });
});
