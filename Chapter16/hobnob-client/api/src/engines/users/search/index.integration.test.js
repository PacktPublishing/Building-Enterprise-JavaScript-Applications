import assert from 'assert';
import elasticsearch from 'elasticsearch';
import search from '.';

process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_TEST;

const SEARCH_TERM = 'apple banana carrot';
const USER_ID = 'TEST_USER_ID';
const USER_OBJ = {
  email: 'e@ma.il',
  digest: '$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy',
  profile: {
    summary: SEARCH_TERM
  }
};
const SEARCH_USER_OBJ = {
  email: 'e@ma.il',
  profile: {
    summary: SEARCH_TERM
  }
};

describe('Engine - User - Search', function () {
  beforeEach(function () {
    const req = {
      body: {
        query: SEARCH_TERM
      }
    };
    return search(req)
      .then(res => { this.result = res; this.error = undefined; })
      .catch(err => { this.error = err; this.result = undefined; })
  })
  describe('When there are no users that matches the search term', function () {
    it("should return with a promise that resolves to an empty array", function () {
      assert.equal(this.error, undefined);
      assert.equal(Array.isArray(this.result), true);
      assert.equal(this.result.length, 0);
    });
  });
  describe('When there are users that matches the search term', function () {
    const client = new elasticsearch.Client({
      host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
    });
    before(function () {
      // Creates a user with _id set to USER_ID
      return client.index({
        index: process.env.ELASTICSEARCH_INDEX,
        type: 'user',
        id: USER_ID,
        body: USER_OBJ,
        refresh: 'true'
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
      it('should return with a promise that resolves to an object that matches USER_OBJ but without the digest field', function () {
        assert.deepEqual(this.result[0], SEARCH_USER_OBJ);
        assert.equal(this.error, undefined);
      });
    });
  });
});
