import assert from 'assert';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Given, When, Then } from 'cucumber';
import { By, until } from 'selenium-webdriver';

chai.use(chaiAsPromised);

Then(/^the (?:"|')([\.#\w-]+)(?:"|') element should( not)? have a (?:"|')([\w_-]+)(?:"|') attribute$/, async function (selector, negation, attributeName) {
  const element = await this.driver.findElement(By.css(selector));
  const attributeValue = await element.getAttribute(attributeName);
  const expectedValue = negation ? null : attributeValue;
  assert.equal(attributeValue, expectedValue);
});

Then(/^the (?:"|')([\.#\w-]+)(?:"|') element should appear within (\d+) miliseconds$/, function (selector, timeout) {
  return expect(this.driver.wait(until.elementLocated(By.css(selector)), timeout)).to.be.fulfilled;
});
