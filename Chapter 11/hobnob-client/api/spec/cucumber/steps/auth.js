import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import elasticsearch from 'elasticsearch';
import Chance from 'chance';
import objectPath from 'object-path';
import { Given, When, Then } from 'cucumber';
import assert, { AssertionError } from 'assert';

const chance = Chance();
const client = new elasticsearch.Client({
  host: `${process.env.ELASTICSEARCH_HOSTNAME}:${process.env.ELASTICSEARCH_PORT}`,
});

async function createUser () {
  const user = {};
  user.email = chance.email();
  user.password = crypto.randomBytes(32).toString('hex');
  user.salt = bcrypt.genSaltSync(10);
  user.digest = bcrypt.hashSync(user.password, user.salt);
  const result = await client.index({
    index: process.env.ELASTICSEARCH_INDEX_TEST,
    type: 'user',
    body: {
      email: user.email,
      digest: user.digest
    },
    refresh: true
  });
  user.id = result._id;
  return user;
}

function createUsers(count) {
  return Promise.all(Array.from(Array(count), createUser))
}

Given(/^(\w+) new users? (?:is|are) created with random password and email$/, async function (amount) {
  const count = Number.isNaN(parseInt(amount)) ? 1 : parseInt(amount);
  this.users = await createUsers(count);

  // Sets the first user as the default
  this.email = this.users[0].email;
  this.password = this.users[0].password;
  this.salt = this.users[0].salt;
  this.digest = this.users[0].digest;
  this.userId = this.users[0].id;
});

Then(/^the JWT payload should have a claim with name (\w+) equal to context.([\w-]+)$/, function (claimName, contextPath) {
  const decodedTokenPayload = jwt.decode(this.responsePayload);
  if (decodedTokenPayload === null) {
    throw new AssertionError();
  }
  assert.equal(decodedTokenPayload[claimName], objectPath.get(this, contextPath));
});

When(/^sets the Authorization header to a valid token$/, function () {
  this.request.set('Authorization', `Bearer ${this.token}`);
});

When(/^sets the Authorization header to a token with wrong signature$/, function () {
  const tokenWithInvalidSignature = this.token + 'a'; // Appending anything to the end of the signature will invalidate it
  this.request.set('Authorization', `Bearer ${tokenWithInvalidSignature}`);
});
