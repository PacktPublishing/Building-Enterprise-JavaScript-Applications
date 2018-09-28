import { stub } from 'sinon';
import ValidationError from '../../../../../validators/errors/validation-error';

const VALIDATION_ERROR_MESSAGE = 'VALIDATION_ERROR_MESSAGE';
const NOT_FOUND_ERROR_MESSAGE = 'Not Found';
const GENERIC_ERROR_MESSAGE = 'Internal Server Error';
const generate = function () {
  return {
    success: stub().resolves(undefined),
    validationError: stub().rejects(new ValidationError(VALIDATION_ERROR_MESSAGE)),
    notFoundError: stub().rejects(new Error(NOT_FOUND_ERROR_MESSAGE)),
    genericError: stub().rejects(new Error(GENERIC_ERROR_MESSAGE)),
  }
};

export {
  generate as default,
  VALIDATION_ERROR_MESSAGE,
  GENERIC_ERROR_MESSAGE
}
