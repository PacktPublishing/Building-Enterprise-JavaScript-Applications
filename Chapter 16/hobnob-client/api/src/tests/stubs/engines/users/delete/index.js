import { stub } from 'sinon';

const NOT_FOUND_ERROR_MESSAGE = 'Not Found';
const GENERIC_ERROR_MESSAGE = 'Internal Server Error';
const generate = function () {
  return {
    success: stub().resolves(undefined),
    notFoundError: stub().rejects(new Error(NOT_FOUND_ERROR_MESSAGE)),
    genericError: stub().rejects(new Error(GENERIC_ERROR_MESSAGE)),
  }
};

export {
  generate as default,
  GENERIC_ERROR_MESSAGE
}
