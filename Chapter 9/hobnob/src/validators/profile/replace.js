import Ajv from 'ajv';
import profileSchema from '../../schema/users/profile.json';
import generateHumanFriendlyErrorMessage from '../errors/messages';
import ValidationError from '../errors/validation-error';

function validate (req) {
  const ajvValidate = new Ajv().compile(profileSchema);
  
  const valid = ajvValidate(req.body);
  if (!valid) {
    return new ValidationError(generateHumanFriendlyErrorMessage(ajvValidate.errors, '.profile'));
  }
  return true;
}

export default validate;
