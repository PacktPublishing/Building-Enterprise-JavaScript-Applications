import assert from 'assert';
import deepClone from 'lodash.clonedeep';
import deepEqual from 'lodash.isequal';
import { spy } from 'sinon';
import errorHandler from './index';

function getValidError(constructor = SyntaxError) {
  const error = new constructor();
  error.status = 400;
  error.body = {};
  error.type = 'entity.parse.failed';
  return error;
}

describe('errorHandler', function () {

  describe('When the error is not an instance of SyntaxError', function () {
    const err = getValidError(Error);
    const req = {};
    const res = {};
    const next = spy();
    const clonedRes = deepClone(res);
    errorHandler(err, req, res, next);

    it('should not modify res', function () {
      assert(deepEqual(res, clonedRes));
    })

    it('should call next()', function () {
      assert(next.calledOnce);
    })
  });

  describe('When the error status is not 400', function () {
    const err = getValidError();
    err.status = 401;
    const req = {};
    const res = {};
    const next = spy();
    const clonedRes = deepClone(res);
    errorHandler(err, req, res, next);

    it('should not modify res', function () {
      assert(deepEqual(res, clonedRes));
    })

    it('should call next()', function () {
      assert(next.calledOnce);
    })
  });

  describe('When the error does not contain a `body` property', function () {
    const err = getValidError();
    delete err.body;
    const req = {};
    const res = {};
    const next = spy();
    const clonedRes = deepClone(res);
    errorHandler(err, req, res, next);

    it('should not modify res', function () {
      assert(deepEqual(res, clonedRes));
    })

    it('should call next()', function () {
      assert(next.calledOnce);
    })
  });

  describe('When the error type is not `entity.parse.failed`', function () {
    const err = getValidError();
    err.type = 'foo'
    const req = {};
    const res = {};
    const next = spy();
    const clonedRes = deepClone(res);
    errorHandler(err, req, res, next);

    it('should not modify res', function () {
      assert(deepEqual(res, clonedRes));
    })

    it('should call next()', function () {
      assert(next.calledOnce);
    })
  });

  describe('When the error is a SyntaxError, with a 400 status, has a `body` property set, and has type `entity.parse.failed`', function () {
    const err = getValidError();
    const req = {};
    const res = {
      status: spy(),
      set: spy(),
      json: spy(),
    };
    const next = spy();
    const clonedRes = deepClone(res);
    errorHandler(err, req, res, next);

    it('should set res with a 400 status code', function () {
      assert(res.status.calledOnce);
      assert(res.status.calledWithExactly(400));
    });

    it('should set res with an application/json content-type header', function () {
      assert(res.set.calledOnce);
      assert(res.set.calledWithExactly('Content-Type', 'application/json'));
    });

    it('should set res.json with error code', function () {
      assert(res.json.calledOnce);
      assert(res.json.calledWithExactly({ message: 'Payload should be in JSON format' }));
    });
  });
});
