import Ajv from 'ajv';
import searchUserSchema from '../../schema/users/search.json';
import generateHumanFriendlyErrorMessage from '../errors/messages';
import ValidationError from '../errors/validation-error';

function validate (req) {
  const ajvValidate = new Ajv().compile(searchUserSchema);
  
  const valid = ajvValidate(req.body);
  if (!valid) {
    return new ValidationError(generateHumanFriendlyErrorMessage(ajvValidate.errors));
  }
  return true;
}

export default validate;
