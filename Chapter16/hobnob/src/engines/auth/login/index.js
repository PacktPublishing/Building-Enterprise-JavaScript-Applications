import elasticsearch from 'elasticsearch';
import jwt from 'jsonwebtoken';

import ValidationError from '../../../validators/errors/validation-error';
import validate from '../../../validators/auth/login';

const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

function loginUser(req) {
  const validationResults = validate(req);
  if (validationResults instanceof ValidationError) {
    return Promise.reject(validationResults);
  }
  return client.search({
      index: process.env.ELASTICSEARCH_INDEX,
      type: 'user',
      body: {
        query: {
          bool: {
            must: [
              { match: { email: req.body.email }},
              { match: { digest: req.body.digest }},
            ]
          }
        }
      },
      _source: false
    })
    .then(res => {
      if(res.hits.total > 0) {
        const payload = { sub: res.hits.hits[0]._id };
        const options = { algorithm: 'RS512' };
        const token = jwt.sign(payload, process.env.PRIVATE_KEY, options);
        return token;
      }
      return Promise.reject(new Error('Not Found'));
    }).catch(err => Promise.reject(new Error()));
}

export default loginUser;
