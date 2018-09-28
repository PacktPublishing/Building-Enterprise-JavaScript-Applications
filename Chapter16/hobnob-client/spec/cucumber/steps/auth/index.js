import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Given, When, Then } from 'cucumber';
import { By, until } from 'selenium-webdriver';
import bcrypt from 'bcryptjs';
import fetch, { Request } from 'node-fetch';
import { generateSampleData } from '../utils';

chai.use(chaiAsPromised);

Then(/^a random user is registered$/, function () {

  this.email = generateSampleData('email');
  this.password = generateSampleData('password');
  this.digest = bcrypt.hashSync(this.password, 10);

  const payload = {
    email: this.email,
    digest: this.digest
  };

  const request = new Request(`http://${process.env.API_SERVER_HOST_TEST}:${process.env.API_SERVER_PORT_TEST}/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(payload)
  })
  return fetch(request)
    .then(response => {
      if (response.status === 201) {
        this.userId = response.text();
      } else {
        throw new Error('Error creating new user');
      }
    })
});
