import { stub } from 'sinon';
import NotFoundError from '../../../elasticsearch/errors/not-found';

const RETRIEVE_USER_RESPONSE_OBJECT = {
  email: 'e@ma.il',
  password: 'hunter2',
};
const GENERIC_ERROR_MESSAGE = 'Internal Server Error';
const generate = function () {
  return {
    success: stub().resolves(RETRIEVE_USER_RESPONSE_OBJECT),
    notFoundError: stub().rejects(new NotFoundError()),
    genericError: stub().rejects(new Error(GENERIC_ERROR_MESSAGE)),
  }
};

export {
  generate as default,
  RETRIEVE_USER_RESPONSE_OBJECT,
  GENERIC_ERROR_MESSAGE,
}
