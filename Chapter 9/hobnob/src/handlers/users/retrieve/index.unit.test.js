import assert from 'assert';
import { match } from 'sinon';
import generateResSpy from '../../../tests/spies/res'
import generateRetrieveUserStubs, { RETRIEVE_USER_RESPONSE_OBJECT } from '../../../tests/stubs/engines/users/retrieve';
import retrieve from '.';

describe('Handler - Users - Retrieve', function () {
  describe('When called with valid request object', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const retrieveUserStubs = generateRetrieveUserStubs();
      this.revert = retrieve.__set__('retrieveUser', retrieveUserStubs.success);
      return retrieve(req, this.res)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    after(function () { this.revert() });

    it('should set res with a 200 status code', function () {
      assert(this.res.status.calledOnce);
      assert(this.res.status.calledWithExactly(200));
    });

    it('should set res with a application/json content-type header', function () {
      assert(this.res.set.calledOnce);
      assert(this.res.set.calledWithExactly('Content-Type', 'application/json'));
    });

    it('should set res.send with the object returned from retrieveUser', function () {
      assert(this.res.send.calledOnce);
      assert(this.res.send.calledWithExactly(RETRIEVE_USER_RESPONSE_OBJECT));
    });
  })
  describe('When the user cannot be found', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const retrieveUserStubs = generateRetrieveUserStubs();
      this.revert = retrieve.__set__('retrieveUser', retrieveUserStubs.notFoundError);
      return retrieve(req, this.res)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    after(function () { this.revert() });

    it('should set res with a 404 status code', function () {
      assert(this.res.status.calledOnce);
      assert(this.res.status.calledWithExactly(404));
    });

    it('should set res with an application/json content-type header', function () {
      assert(this.res.set.calledOnce);
      assert(this.res.set.calledWithExactly('Content-Type', 'application/json'));
    });

    it('should set res.send with the message of the validation error', function () {
      assert(this.res.json.calledOnce);
      assert(this.res.json.calledWithExactly(match.has('message', 'Not Found')));
    });
  });
  describe('When retrieveUser throws an unexpected error', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const retrieveUserStubs = generateRetrieveUserStubs();
      this.revert = retrieve.__set__('retrieveUser', retrieveUserStubs.genericError);
      return retrieve(req, this.res)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    after(function () { this.revert() });

    it('should set res with a 500 status code', function () {
      assert(this.res.status.calledOnce);
      assert(this.res.status.calledWithExactly(500));
    });

    it('should set res with an application/json content-type header', function () {
      assert(this.res.set.calledOnce);
      assert(this.res.set.calledWithExactly('Content-Type', 'application/json'));
    });

    it('should set res.json with a generic Internal Server Error message', function () {
      assert(this.res.json.calledOnce);
      assert(this.res.json.calledWithExactly(match.has('message', 'Internal Server Error')));
    });
  })
})
