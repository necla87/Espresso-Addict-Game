import { Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { driver } from '../support/world.js';
import {startLocation, getTextFromDescription, clickButton} from './common_steps/getTextFromDescription.js';

Given('that I have started the game by navigating to {string}', async function(url){
  await driver.get( url );
});

Then( 'I am at the location {string}', async function ( location ) {
  await startLocation( location )
} );

When( 'I click the {string} button', async function ( buttonText ) {
  await clickButton( buttonText );
} );

Then( 'I should be back at the location {string}', async function ( location ) {
  const actualDescriptionText = await getTextFromDescription();

  // Check that the text contains the expected part of location
  expect( actualDescriptionText ).to.include(
    location,
    `Expected text to contain "${ location }", but received "${ actualDescriptionText }"`
  );
});
