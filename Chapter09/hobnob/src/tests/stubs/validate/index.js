import { stub } from 'sinon';
import ValidationError from '../../../validators/errors/validation-error';

const VALIDATION_ERROR_MESSAGE = 'VALIDATION_ERROR_MESSAGE';
const VALIDATION_ERROR = new ValidationError(VALIDATION_ERROR_MESSAGE);
function generate () {
  return {
    valid: stub().returns(true),
    invalid: stub().returns(VALIDATION_ERROR),
  }
}

export {
  generate as default,
  VALIDATION_ERROR,
  VALIDATION_ERROR_MESSAGE,
}
