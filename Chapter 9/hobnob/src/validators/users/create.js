import Ajv from 'ajv';
import profileSchema from '../../schema/users/profile.json';
import createUserSchema from '../../schema/users/create.json';
import generateHumanFriendlyErrorMessage from '../errors/messages';
import ValidationError from '../errors/validation-error';

function validate (req) {
  const ajvValidate = new Ajv()
    .addFormat('email', /^[\w\.+]+@\w+\.\w+$/)
    .addSchema([profileSchema, createUserSchema])
    .compile(createUserSchema);
  
  const valid = ajvValidate(req.body);
  if (!valid) {
    return new ValidationError(generateHumanFriendlyErrorMessage(ajvValidate.errors));
  }
  return true;
}

export default validate;
