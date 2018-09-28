import { Given, When, Then } from 'cucumber';

When(/^user navigates to ([\w-_\/?=:#]+)$/, function (location) {
  return this.driver.get(`http://${process.env.WEB_SERVER_HOST_TEST}:${process.env.WEB_SERVER_PORT_TEST}${location}`);
});
