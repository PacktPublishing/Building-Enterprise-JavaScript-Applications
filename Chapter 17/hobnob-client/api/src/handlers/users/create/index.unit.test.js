import assert from 'assert';
import { match } from 'sinon';
import ValidationError from '../../../validators/errors/validation-error';
import generateResSpy from '../../../tests/spies/res'
import generateCreateUserStubs, { VALIDATION_ERROR_MESSAGE as CREATE_USER_VALIDATION_ERROR_MESSAGE } from '../../../tests/stubs/engines/users/create'
import create from '.';

describe('Create User Request Handler', function () {
  describe('When called with valid request object', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const createUserStubs = generateCreateUserStubs();
      this.revert = create.__set__('createUser', createUserStubs.success);
      return create(req, this.res)
        .then(res => { this.result = res; this.error = undefined; })
        .catch(err => { this.error = err; this.result = undefined; })
    });
    after(function () { this.revert() });

    it('should set res with a 201 status code', function () {
      assert(this.res.status.calledOnce);
      assert(this.res.status.calledWithExactly(201));
    });

    it('should set res with a text/plain content-type header', function () {
      assert(this.res.set.calledOnce);
      assert(this.res.set.calledWithExactly('Content-Type', 'text/plain'));
    });

    it('should set res.send with the string resolved', function () {
      assert(this.res.send.calledOnce);
      assert(this.res.send.calledWithExactly(this.result));
    });
  })
  describe('When called with an invalid request object', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const createUserStubs = generateCreateUserStubs();
      this.revert = create.__set__('createUser', createUserStubs.validationError);
      return create(req, this.res)
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
      assert(this.res.json.calledWithExactly(match.has('message', CREATE_USER_VALIDATION_ERROR_MESSAGE)));
    });
  });
  describe('When createUser throws an unexpected error', function (done) {
    before(function () {
      const req = {};
      this.res = generateResSpy();
      const createUserStubs = generateCreateUserStubs();
      this.revert = create.__set__('createUser', createUserStubs.genericError);
      return create(req, this.res)
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
