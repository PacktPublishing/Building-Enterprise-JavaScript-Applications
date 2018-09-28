import assert from 'assert';
import { match } from 'sinon';
import ValidationError from '../../../validators/errors/validation-error';
import generateResSpy from '../../../tests/spies/res'
import generateReplaceProfileStubs, { VALIDATION_ERROR_MESSAGE as REPLACE_PROFILE_VALIDATION_ERROR_MESSAGE } from '../../../tests/stubs/engines/profile/replace'
import replace from '.';

describe('Handler - Profile - Replace', function () {
  describe('When called with valid request object', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const replaceProfileStubs = generateReplaceProfileStubs();
      this.revert = replace.__set__('replaceProfile', replaceProfileStubs.success);
      return replace(req, this.res)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    after(function () { this.revert() });

    it('should set res with a 200 status code', function () {
      assert(this.res.status.calledOnce);
      assert(this.res.status.calledWithExactly(200));
    });

    it('should set res with a text/plain content-type header', function () {
      assert(this.res.set.calledOnce);
      assert(this.res.set.calledWithExactly('Content-Type', 'text/plain'));
    });

    it('should set res.send with no arguments', function () {
      assert(this.res.send.calledOnce);
      assert(this.res.send.calledWithExactly());
    });
  })
  describe('When called with an invalid request object', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const replaceProfileStubs = generateReplaceProfileStubs();
      this.revert = replace.__set__('replaceProfile', replaceProfileStubs.validationError);
      return replace(req, this.res)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    after(function () { this.revert() });

    it('should set res with a 400 status code', function () {
      assert(this.res.status.calledOnce);
      assert(this.res.status.calledWithExactly(400));
    });

    it('should set res with an application/json content-type header', function () {
      assert(this.res.set.calledOnce);
      assert(this.res.set.calledWithExactly('Content-Type', 'application/json'));
    });

    it('should set res.send with the message of the validation error', function () {
      assert(this.res.json.calledOnce);
      assert(this.res.json.calledWithExactly(match.has('message', REPLACE_PROFILE_VALIDATION_ERROR_MESSAGE)));
    });
  });

  describe('When replaceProfile throws a User Not Found error', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const replaceProfileStubs = generateReplaceProfileStubs();
      this.revert = replace.__set__('replaceProfile', replaceProfileStubs.notFoundError);
      return replace(req, this.res)
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

    it('should set res.json with a Not Found message', function () {
      assert(this.res.json.calledOnce);
      assert(this.res.json.calledWithExactly(match.has('message', 'Not Found')));
    });
  })
  describe('When replaceProfile throws an unexpected error', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const replaceProfileStubs = generateReplaceProfileStubs();
      this.revert = replace.__set__('replaceProfile', replaceProfileStubs.genericError);
      return replace(req, this.res)
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
