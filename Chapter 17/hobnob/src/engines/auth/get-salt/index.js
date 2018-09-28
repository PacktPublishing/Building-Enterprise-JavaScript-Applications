import elasticsearch from 'elasticsearch';
import bcrypt from 'bcryptjs';
import randomseed from 'random-seed';

const NO_RESULTS_ERROR_MESSAGE = 'no-results';

const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

function extractDigest (res) {
  const user = res.hits.hits[0];
  return user ? user._source.digest : Promise.reject(new Error(NO_RESULTS_ERROR_MESSAGE));
}

function generateFakeSalt(seed) {

  // Prepend the bcrypt algorithm version and cost parameters
  return '$2a$10$' + randomseed

    // Seed the psuedo-random number generator with a seed so the output is deterministic
    .create(seed)

    // Instead of a number, generate a string of sufficient length,
    // so that even when invalid characters are stripped out,
    // there will be enough characters to compose the salt
    .string(110)

    // Replace all characters outside the character range of a valid bcrypt salt
    .replace(/[^a-zA-Z0-9\.\/]/g, '')

    // Extract only the first 22 characters for the salt
    .slice(0, 22);
}

function getSalt (req) {
  if (!req.query.email) {
    return Promise.reject(new Error('Email not specified'));
  }
  return client.search({
    index: process.env.ELASTICSEARCH_INDEX,
    type: 'user',
    body: {
      query: {
        match: {
          email: req.query.email
        }
      }
    },
    _sourceInclude: 'digest'
  })
    .then(extractDigest)
    .then(bcrypt.getSalt)
    .catch(err => {
      if (err.message === NO_RESULTS_ERROR_MESSAGE) {
        return generateFakeSalt(req.query.email);
      }
      return Promise.reject(new Error('Internal Server Error'));
    });
}

export default getSalt;
