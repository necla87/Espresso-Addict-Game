Feature: Getting help via the help button and continuing back to the last position

  Scenario Outline: As a user, I can get help by clicking the "Help" button and continue back to the last position at "<location>"
    Given that I have started the game by navigating to "http://localhost:3000"
    And  I am at the location "<location>"
    When I click the "Help" button
    And I click the "Continue" button
    Then I should be back at the location "<location>"

    Examples:
      | location            |
      | outside the cafe    |
      | inside the cafe     |
      | on an empty street  |
      | in a crowded bar    |
      | in the country-side |
      | at the concert      |