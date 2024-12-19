import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { By, until } from 'selenium-webdriver';  // Import 'until' to use explicit waits

Given('that I have started the game by navigating to {string}', async function (url) {
  await this.driver.get(url);
  // Wait until the relevant DOM element(s) exist
  // - Wait for the health element to be visible with "50" in the text
  await this.driver.wait(until.elementLocated(By.xpath('/descendant::*[@class="health"]//*[contains(text(), "50")]')), 5000);  // wait up to 5 seconds
});

Then('the value of my {string} should be {float}', async function (statusType, expectedNumValue) {
  // Translate statusType (Health, Money, Espressos) to cssSelector
  let cssSelector = '.' + statusType.toLowerCase();
  if (cssSelector === '.espressos') { cssSelector = '.espressocups'; }
  // Convert the selector to grab the child element .progress
  cssSelector += ' .progress';
  // Get the element's text and convert it to a number
  let element = await this.get(cssSelector);
  let numValue = +(await element.getText());
  // Assert the value matches the expected number
  expect(numValue).to.equal(expectedNumValue);
});

Then('my hipster bag should contain {string}', async function (expectedBagContent) {
  // Get the element with the bag content
  let bagElement = await this.get('.bag-content');
  // Trim spaces from the text content and check if it matches the expected bag content
  let bagContent = (await bagElement.getText()).trim();
  expect(bagContent).to.equal(expectedBagContent);
});

Given('that my position is {string}', async function (position) {
  const positionElement = await this.get('.description');
  const currentPosition = (await positionElement.getText()).trim();
  expect(currentPosition).to.include(position); // Check if the position is in the description
});

Given('that I make the choice to {string}', async function (choice) {
  // Find the list item within the choices menu that matches the provided choice text
  const choiceElement = await this.getByXPath(`//menu[@class="choices"]//li[text()="${choice}"]`);
  await choiceElement.click(); // Click the choice element
});

Then('my position should be {string}', async function (expectedPosition) {
  const positionElement = await this.get('.description');
  const currentPosition = (await positionElement.getText()).trim();
  expect(currentPosition).to.include(expectedPosition); // Check the final position after making the choice
});

Given('that I know my current health', async function () {
  const healthElement = await this.get('.health .progress');
  this.previousHealth = +(await healthElement.getText()); // Store current health value
});

When('I wait for the event {string} to take place', async function (expectedText) {
  const descriptionElement = await this.getWait('.description', 5000); // Wait for the description element
  const descriptionText = await descriptionElement.getText();
  expect(descriptionText).to.include(expectedText); // Check if the event text appears
});

Then('my health should be {string}', async function (comparison) {
  const healthElement = await this.get('.health .progress');
  const currentHealth = +(await healthElement.getText());

  if (comparison === "less or same as before") {
    expect(currentHealth).to.be.at.most(this.previousHealth); // Check if health is less or equal
  } else if (comparison === "10 more than before") {
    expect(currentHealth).to.equal(this.previousHealth + 10); // Check if health increased by 10
  } else if (comparison === "20 more than before") {
    expect(currentHealth).to.equal(this.previousHealth + 20); // Check if health increased by 20
  }

  this.previousHealth = currentHealth; // Store the new health value for the next comparison
});

Given('that I know my current menu choices', async function () {
  // Get all visible menu choices from the menu in the footer
  const menuItems = await this.getMany('footer menu.choices ul li:not([style*="display: none"])');
  console.log(menuItems); // Log the menu items or store them as needed
});

Then('I should be given the new choice {string}', async function (newChoice) {
  await this.getWait('footer menu.choices ul li'); // Wait for the menu items to be visible
  const menuItems = await this.getMany('footer menu.choices ul li');

  // Check if the new choice is in the list of menu items
  const choiceExists = menuItems.some(item => item.trim() === newChoice);

  expect(choiceExists).to.be.true; // Assert that the new choice exists in the list
});