import assert from 'assert';
import generateESClientDeleteStub from '../../../tests/stubs/elasticsearch/client/delete';
import del from '.';

process.env.ELASTICSEARCH_INDEX = process.env.ELASTICSEARCH_INDEX_TEST;

const TEST_USER_ID = 'TEST_USER_ID';
const req = {
  params: {
    userId: TEST_USER_ID
  }
}

describe('Engine - User - Delete', function () {
  describe('When invoked', function () {
    before(function() {
      this.ESClientDeleteStub = generateESClientDeleteStub.failure();
      this.revert = del.__set__('client', { delete: this.ESClientDeleteStub });
      return del(req)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    after(function () { this.revert() });

    it("should call the client instance's get method with the correct params", function () {
      assert.deepEqual(this.ESClientDeleteStub.getCall(0).args[0], {
        index: process.env.ELASTICSEARCH_INDEX_TEST,
        type: 'user',
        id: TEST_USER_ID
      })
    });
  });
  describe('When the client.delete operation is successful', function () {
    beforeEach(function() {
      this.ESClientDeleteStub = generateESClientDeleteStub.success();
      this.revert = del.__set__('client', { delete: this.ESClientDeleteStub });
      return del(req)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    afterEach(function () { this.revert() });
    it('should return with a promise that resolves to undefined', function () {
      assert.equal(this.result, undefined);
      assert.equal(this.error, undefined);
    });
  });
  describe('When the client.delete operation is unsuccessful', function () {
    describe('Because the user does not exists', function () {
      beforeEach(function() {
        this.ESClientDeleteStub = generateESClientDeleteStub.notFound();
        this.revert = del.__set__('client', { delete: this.ESClientDeleteStub });
        return del(req)
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
        this.ESClientDeleteStub = generateESClientDeleteStub.failure();
        this.revert = del.__set__('client', { delete: this.ESClientDeleteStub });
        return del(req)
          .then(res => { this.result = res; this.error = undefined; })
          .catch(err => { this.error = err; this.result = undefined; })
      });
      afterEach(function () { this.revert() });
      it("should return with a promise that rejects with an Error object", function () {
        assert.equal(this.result, undefined);
        assert.equal(this.error instanceof Error, true);
      });
      it("which has a message property set to 'Internal Server Error'", function () {
        assert.equal(this.error.message, 'Internal Server Error');
      });
    });
  });
});
