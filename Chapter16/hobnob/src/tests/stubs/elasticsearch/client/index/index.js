import { stub } from 'sinon';

const INDEX_RESOLVE_OBJ = {
  result: 'created',
  _id: 'foobar'
};

const INDEX_REJECT_ERROR = new Error();

const generate = {
  success: function () {
    return stub().returns(Promise.resolve(INDEX_RESOLVE_OBJ))
  },
  failure: function () {
    return stub().returns(Promise.reject(INDEX_REJECT_ERROR))
  }
}

export {
  generate as default,
  INDEX_RESOLVE_OBJ,
}
