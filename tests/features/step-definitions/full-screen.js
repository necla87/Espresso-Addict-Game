import { Given, When, Then } from '@cucumber/cucumber';
import { By, until, Key } from 'selenium-webdriver';
import { expect } from 'chai';

When('I click the {string} option', async function (optionName) {
  const fullScreenButton = await this.driver.wait(
    until.elementLocated(By.css('.go-fullscreen')),
    10000
  );
  await this.driver.wait(until.elementIsVisible(fullScreenButton), 10000);
  await fullScreenButton.click();
});

Then('the game should switch to full screen mode', async function () {
  const isFullScreen = await this.driver.executeScript('return !!document.fullscreenElement;');
  expect(isFullScreen).to.be.true;
});

When('I press the {string} key on my computer', async function (keyName) {
  if (keyName === 'ESC') {
    await this.driver.actions().sendKeys(Key.ESCAPE).perform();
  }
});

Then('the game should exit full screen mode', async function () {
  const isFullScreen = await this.driver.executeScript('return !!document.fullscreenElement;');
  expect(isFullScreen).to.be.false;
});