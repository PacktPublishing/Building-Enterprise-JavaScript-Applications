import assert from 'assert';
import { match } from 'sinon';
import generateResSpy from '../../../tests/spies/res'
import generateSearchUserStubs, { SEARCH_USER_RESPONSE_OBJECT } from '../../../tests/stubs/engines/users/search';
import search from '.';

describe('Handler - Users - Search', function () {
  describe('When called with valid request object', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const searchUserStubs = generateSearchUserStubs();
      this.revert = search.__set__('searchUser', searchUserStubs.success);
      return search(req, this.res)
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

    it('should set res.send with the object returned from searchUser', function () {
      assert(this.res.send.calledOnce);
      assert(this.res.send.calledWithExactly(SEARCH_USER_RESPONSE_OBJECT));
    });
  })
  describe('When searchUser throws an unexpected error', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const searchUserStubs = generateSearchUserStubs();
      this.revert = search.__set__('searchUser', searchUserStubs.genericError);
      return search(req, this.res)
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
