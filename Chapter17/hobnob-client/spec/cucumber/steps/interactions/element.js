import { Given, When, Then } from 'cucumber';
import { By } from 'selenium-webdriver';

When(/^user clicks on the (?:"|')([\.#\w-]+)(?:"|') element$/, async function (selector) {
  const element = await this.driver.findElement(By.css(selector));
  return element.click();
});
