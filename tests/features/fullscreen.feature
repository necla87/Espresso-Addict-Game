Feature: Fullscreen mode toggling
  As a player, I want to toggle fullscreen mode and exit it using the ESC key, so I can adjust the gameplay experience.

  Scenario Outline: Toggling fullscreen mode
    Given that I have navigated to "http://localhost:3000"
    And that I navigate to "<location>"
    When I click the "Full screen" option
    Then the game should switch to full screen mode
    When I press the "ESC" key on my computer
    Then the game should exit full screen mode

    Examples:
      | location            |
      | outside the cafe    |
      | inside the cafe     |
      | on an empty street  |
      | in a crowded bar    |
      | in the country-side |
      | at the concert      |
