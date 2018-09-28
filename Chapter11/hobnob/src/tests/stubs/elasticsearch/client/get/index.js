import { stub } from 'sinon';
import NotFoundError from '../../errors/not-found';

const GET_RESOLVE_OBJ = {
  _source: {
    email: 'e@ma.il'
  }
};
const GET_REJECT_NOT_FOUND_ERROR = new NotFoundError('Not Found');
const GET_REJECT_ERROR = new Error();

const generate = {
  success: function () {
    return stub().returns(Promise.resolve(GET_RESOLVE_OBJ))
  },
  notFound: function () {
    return stub().returns(Promise.reject(GET_REJECT_NOT_FOUND_ERROR))
  },
  failure: function () {
    return stub().returns(Promise.reject(GET_REJECT_ERROR))
  }
}

export {
  generate as default,
  GET_RESOLVE_OBJ,
}
