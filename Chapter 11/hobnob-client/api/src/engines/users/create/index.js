import elasticsearch from 'elasticsearch';
const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

import ValidationError from '../../../validators/errors/validation-error';
import validate from '../../../validators/users/create';

function create (req) {
  const validationResults = validate(req);
  if (validationResults instanceof ValidationError) {
    return Promise.reject(validationResults);
  }

  // Check whether a user with this email already exists

  return client.count({
    index: process.env.ELASTICSEARCH_INDEX,
    type: 'user',
    body: {
      query: {
        match: {
          email: req.body.email
        }
      }
    }
  })
  .then(res => res.count > 0 ? Promise.reject(new Error('User with this email already exists')) : undefined)
  .then(() => client.index({
    index: process.env.ELASTICSEARCH_INDEX,
    type: 'user',
    body: req.body,
    refresh: "true"
  }))
  .then(res => res._id)
}

export default create;
