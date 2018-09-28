import { stub } from 'sinon';

const SEARCH_USER_RESPONSE_OBJECT = [{
  email: 'e@ma.il',
  profile: {
      name: {
        first: 'first',
        last: 'last',
        middle: 'middle',
      },
      summary: 'Sample Summary 1',
      bio: 'Sample Bio 1'
    }
}, {
  email: 'foo@bar.baz',
  profile: {
      summary: 'Sample Summary 2',
      bio: 'Sample Bio 2'
    }
}]
const GENERIC_ERROR_MESSAGE = 'Internal Server Error';
const generate = function () {
  return {
    success: stub().resolves(SEARCH_USER_RESPONSE_OBJECT),
    genericError: stub().rejects(new Error(GENERIC_ERROR_MESSAGE)),
  }
};

export {
  generate as default,
  SEARCH_USER_RESPONSE_OBJECT,
  GENERIC_ERROR_MESSAGE,
}
