import assert from 'assert';
import generateESClientGetStub, { GET_RESOLVE_OBJ } from '../../../tests/stubs/elasticsearch/client/get';
import retrieve from '.';

process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_TEST;

const TEST_USER_ID = 'TEST_USER_ID';
const req = {
  params: {
    userId: TEST_USER_ID
  }
}

describe('Engine - User - Retrieve', function () {
  describe('When invoked', function () {
    before(function() {
      this.ESClientGetStub = generateESClientGetStub.failure();
      this.revert = retrieve.__set__('client', { get: this.ESClientGetStub });
      return retrieve(req)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    after(function () { this.revert() });

    it("should call the client instance's get method with the correct params", function () {
      assert.deepEqual(this.ESClientGetStub.getCall(0).args[0], {
        index: process.env.ELASTICSEARCH_INDEX_TEST,
        type: 'user',
        id: TEST_USER_ID
      })
    });
  });
  describe('When the client.get operation is successful', function () {
    beforeEach(function() {
      this.ESClientGetStub = generateESClientGetStub.success();
      this.revert = retrieve.__set__('client', { get: this.ESClientGetStub });
      return retrieve(req)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    afterEach(function () { this.revert() });
    it('should return with a promise that resolves to an object', function () {
      assert.equal(typeof this.result, 'object');
      assert.equal(this.error, undefined);
    });
  });
  describe('When the client.get operation is unsuccessful', function () {
    describe('Because the user does not exists', function () {
      beforeEach(function() {
        this.ESClientGetStub = generateESClientGetStub.notFound();
        this.revert = retrieve.__set__('client', { get: this.ESClientGetStub });
        return retrieve(req)
          .then(res => { this.result = res; this.error = undefined; })
          .catch(err => { this.error = err; this.result = undefined; })
      });
      afterEach(function () { this.revert() });
      it("should return with a promise that rejects with an Error object", function () {
        assert.equal(this.result, undefined);
        assert.equal(this.error instanceof Error, true);
      });
      it("which has a message property set to 'Not Found'", function () {
        assert.equal(this.error.message, 'Not Found');
      });
    });
    describe('Because of other errors', function () {
      beforeEach(function() {
        this.ESClientGetStub = generateESClientGetStub.failure();
        this.revert = retrieve.__set__('client', { get: this.ESClientGetStub });
        return retrieve(req)
          .then(res => { this.result = res; this.error = undefined; })
          .catch(err => { this.error = err; this.result = undefined; })
      });
      afterEach(function () { this.revert() });
      it("should return with a promise that rejects with an Error object that has the mesage 'Internal Server Error'", function () {
        assert.equal(this.result, undefined);
        assert.equal(this.error instanceof Error, true);
        assert.equal(this.error.message, 'Internal Server Error');
      });
    });
  });
});
