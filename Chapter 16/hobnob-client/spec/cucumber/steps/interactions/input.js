import { Given, When, Then } from 'cucumber';
import { By } from 'selenium-webdriver';
import { generateSampleData } from '../utils';

When(/^user types in (?:"|')(.+)(?:"|') in the (?:"|')([\.#\w-]+)(?:"|') element$/, async function (text, selector) {
  this.element = await this.driver.findElement(By.css(selector));
  return this.element.sendKeys(text);
});

When(/^user types in an? (in)?valid (\w+) in the (?:"|')([\.#\w-]+)(?:"|') element$/, async function (invalid, type, selector) {
  const textToInput = generateSampleData(type, !invalid);
  this.element = await this.driver.findElement(By.css(selector));
  return this.element.sendKeys(textToInput);
});

Then(/^user types in his\/her (\w+) in the (?:"|')([\.#\w-]+)(?:"|') element$/, async function (contextKey, selector) {
  const textToInput = this[contextKey] || "";
  this.element = await this.driver.findElement(By.css(selector));
  return this.element.sendKeys(textToInput);
  // return Promise.all(textToInput.split('').map((c) => this.element.sendKeys(c)));
});