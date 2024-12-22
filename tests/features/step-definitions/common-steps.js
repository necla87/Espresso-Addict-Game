import { By, until } from 'selenium-webdriver';
import { driver } from '../../support/world.js';

export default async function getTextFromDescription () {
  // Wait for the menu with choices to be located and visible
  await driver.wait( until.elementLocated( By.css( 'menu.choices' ) ), 10000 );
  const menuElement = await driver.wait(
    until.elementIsVisible( driver.findElement( By.css( 'menu.choices' ) ) ),
    10000
  );

  // Find all <li> elements within <menu class="choices">
  const buttonElements = await menuElement.findElements( By.css( 'ul li' ) );

  // Get text for each <li> element
  const actionButtons = await Promise.all( buttonElements.map( async ( element ) => {
    return await element.getText();
  } ) );

  return actionButtons;
}

export default async function clickButton ( buttonText ) {
  const button = await driver.wait(
    until.elementLocated( By.xpath(
      `//menu[@class='choices']//li[text()='${ buttonText }']` ) ),
    10000
  );
  await driver.wait(
    until.elementIsVisible( button ),
    10000
  );
  await button.click();
}
export default async function startLocation ( location ) {
  console.log( `Starting location: ${ location }` );
  try {
    await driver.get( 'http://localhost:3000' );
    console.log( `Loading game at: http://localhost:3000` );

    switch ( location ) {
      case 'outside the Cloud Forest Cafe':
        break;

      case 'in the Cloud Forest Cafe':
        await clickButton( 'Enter the cafe' );
        break;


      case 'on an empty street':
        await clickButton( 'Go north' );
        break;

      case 'in a crowded bar':
        await clickButton( 'Go north' );
        await clickButton( 'Go east' );
        break;


      case 'in the contry-side':
        await clickButton( 'Go south' );

        break;

      case 'A guitarist and sax player':
        await clickButton( 'Go south' );
        await clickButton( 'Go west' );
        break;

      default:
        throw new Error( `Unknown location: ${ location }` );
    }
  } catch ( error ) {
    console.error( `Error while starting location ${ location }: ${ error.message }` );
    throw error;
  }
}