import assert from 'assert';
import { match } from 'sinon';
import ValidationError from '../../../validators/errors/validation-error';
import generateResSpy from '../../../tests/spies/res'
import generateUpdateProfileStubs, { VALIDATION_ERROR_MESSAGE as UPDATE_PROFILE_VALIDATION_ERROR_MESSAGE } from '../../../tests/stubs/engines/profile/update'
import update from '.';

describe('Handler - Profile - Update', function () {
  describe('When called with valid request object', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const updateProfileStubs = generateUpdateProfileStubs();
      this.revert = update.__set__('updateProfile', updateProfileStubs.success);
      return update(req, this.res)
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
      const updateProfileStubs = generateUpdateProfileStubs();
      this.revert = update.__set__('updateProfile', updateProfileStubs.validationError);
      return update(req, this.res)
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
      assert(this.res.json.calledWithExactly(match.has('message', UPDATE_PROFILE_VALIDATION_ERROR_MESSAGE)));
    });
  });

  describe('When updateProfile throws a User Not Found error', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const updateProfileStubs = generateUpdateProfileStubs();
      this.revert = update.__set__('updateProfile', updateProfileStubs.notFoundError);
      return update(req, this.res)
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
  describe('When updateProfile throws an unexpected error', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const updateProfileStubs = generateUpdateProfileStubs();
      this.revert = update.__set__('updateProfile', updateProfileStubs.genericError);
      return update(req, this.res)
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
