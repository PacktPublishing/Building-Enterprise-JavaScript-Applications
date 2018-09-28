import assert from 'assert';
import elasticsearch from 'elasticsearch';
import { VALIDATION_ERROR, VALIDATION_ERROR_MESSAGE } from '../../../tests/stubs/validate';
import ValidationError from '../../../validators/errors/validation-error';
import update from '.';

process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_TEST;

const USER_ID = 'vv78YU6';

describe('Engine - Profile - Update', function () {
  describe('When the request is not valid', function () {
    before(function () {
      const req = {};
      return update(req).catch(err => { this.error = err });
    })
    it('should return with a promise that rejects with the ValidationError', function () {
      assert(this.error instanceof ValidationError, true);
      assert(this.error, VALIDATION_ERROR);
      assert(this.error.message, VALIDATION_ERROR_MESSAGE);
    })
  })
  describe('When the request is valid', function () {
    beforeEach(function () {
      const req = {
        body: {
          summary: 'summary'
        },
        params: {
          userId: USER_ID
        }
      };
      return update(req)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    })
    describe('When the user does not exists', function () {
      it("should return with a promise that rejects with an Error object that has the mesage 'Not Found'", function () {
        assert.equal(this.result, undefined);
        assert.equal(this.error.message, 'Not Found');
      });
    });
    describe('When the user exists', function () {
      const client = new elasticsearch.Client({
        host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
      });
      before(function () {
        // Creates a user with _id set to USER_ID
        return client.index({
          index: process.env.ELASTICSEARCH_INDEX,
          type: 'user',
          id: USER_ID,
          body: {
            profile: {
              summary: 'test',
              bio: 'test'
            }
          }
        })
      })
      after(function () {
        return client.delete({
          index: process.env.ELASTICSEARCH_INDEX,
          type: 'user',
          id: USER_ID
        })
      })
      describe('When the Elasticsearch operation is successful', function () {
        it('should return with a promise that resolves to undefined', function () {
          assert.equal(this.result, undefined);
          assert.equal(this.error, undefined);
        });
        it('should have updated the user profile object', function () {
          return client.get({
            index: process.env.ELASTICSEARCH_INDEX,
            type: 'user',
            id: USER_ID
          })
          .then(user => user._source)
          .then(user => assert.deepEqual(user, {
            profile: {
              summary: 'summary',
              bio: 'test'
            }
          }))
        });
      });
    });
  })
});
