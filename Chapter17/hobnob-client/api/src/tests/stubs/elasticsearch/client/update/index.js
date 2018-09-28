import { stub } from 'sinon';
import NotFoundError from '../../errors/not-found';

const UPDATE_RESOLVE_OBJ = {};
const UPDATE_REJECT_NOT_FOUND_ERROR = new NotFoundError('Not Found');
const UPDATE_REJECT_ERROR = new Error();

const generate = {
  success: function () {
    return stub().returns(Promise.resolve(UPDATE_RESOLVE_OBJ))
  },
  notFound: function () {
    return stub().returns(Promise.reject(UPDATE_REJECT_NOT_FOUND_ERROR))
  },
  failure: function () {
    return stub().returns(Promise.reject(UPDATE_REJECT_ERROR))
  }
}

export {
  generate as default,
  UPDATE_RESOLVE_OBJ,
}
