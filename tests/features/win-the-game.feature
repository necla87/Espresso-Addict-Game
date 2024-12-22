Feature: Win the game
  As a user I want to win the game by obtaining 5 cups of espresso (based on my empirical knowledge about how to win the game).

  Scenario: At the right place with the right starting values
    Given that I have started the game by navigating to "http://localhost:3000"
    And that my position is "outside the cafe"
    Then the value of my "Health" should be 50
    And the value of my "Money" should be 10
    And the value of my "Espressos" should be 0
    And my hipster bag should contain "nothing cool"

  Scenario: I navigate from outside the cafe to a crowded bar
    Given that my position is "outside the cafe"
    Given that I make the choice to "Go north"
    And that I make the choice to "Go east"
    Then the value of my "Health" should be 50
    And the value of my "Money" should be 10
    And the value of my "Espressos" should be 0
    And my hipster bag should contain "nothing cool"
    And my position should be "in a crowded bar"

  Scenario: I stay at the crowded bar and wait for the bartender to give me a beer
    Given that my position is "in a crowded bar"
    And that I know my current health
    When I wait for the event "The bartender offers you a can of beer for free" to take place
    Then my health should be "less or same as before"
    And the value of my "Money" should be 10
    And the value of my "Espressos" should be 0
    And my hipster bag should contain "a can of beer"

  Scenario: I navigate from outside the crowded friendly bar to the guitarist and the sax player
    Given that my position is "in a crowded bar"
    Given that I know my current health
    And that I make the choice to "Go west"
    And that I make the choice to "Go south"
    And that I make the choice to "Go south"
    And that I make the choice to "Go west"
    Then my health should be "unchanged"
    And the value of my "Money" should be 10
    And the value of my "Espressos" should be 0
    And my hipster bag should contain "a can of beer"
    And my position should be "at the concert"

  Scenario: I stay with guitarist and the sax player
    Given that my position is "at the concert"
    And that I know my current health
    And that I know my current menu choices
    When I wait for the event "why don't come on up and jam with us?" to take place
    Then my health should be "less or same as before"
    And the value of my "Money" should be 10
    And the value of my "Espressos" should be 0
    And my hipster bag should contain "a can of beer"
    And I should be given the new choice "Jam with the band"

  Scenario: I choose to jam with the guitarist and the sax player
    Given that my position is "at the concert"
    And that I know my current health
    And that I make the choice to "Jam with the band"
    Then my health should be "unchanged"
    And the value of my "Money" should be 15
    And the value of my "Espressos" should be 0
    And my hipster bag should contain "a can of beer"

  Scenario: I navigate from the guitarist and the sax player to inside the Cloud Forest Cafe
    Given that my position is "at the concert"
    And that I know my current health
    And that I make the choice to "Go east"
    And that I make the choice to "Go north"
    And that I make the choice to "Enter the cafe"
    Then my health should be "unchanged"
    And the value of my "Money" should be 15
    And the value of my "Espressos" should be 0
    And my hipster bag should contain "a can of beer"
    And my position should be "inside the cafe"

  Scenario: I stay at the Cloud Forest Cafe and wait for the barista to call a friend
    Given that my position is "inside the cafe"
    Given that I know my current health
    And that I know my current menu choices
    When I wait for the event "The barista is in a dark corner phoning a friend" to take place
    Then my health should be "less or same as before"
    And the value of my "Money" should be 15
    And the value of my "Espressos" should be 0
    And my hipster bag should contain "a can of beer"
    And I should be given the new choice "Give beer to barista"

  Scenario: I give the barista my beer
    Given that my position is "inside the cafe"
    And that I know my current health
    And that I make the choice to "Give beer to barista"
    Then my health should be "20 more than before"
    And the value of my "Money" should be 15
    And the value of my "Espressos" should be 2
    And my hipster bag should contain "nothing cool"

  Scenario: I buy the third espresso of the day
    Given that my position is "inside the cafe"
    And that I know my current health
    And that I make the choice to "Buy an espresso"
    Then my health should be "10 more than before"
    And the value of my "Money" should be 10
    And the value of my "Espressos" should be 3
    And my hipster bag should contain "nothing cool"

  Scenario: I buy the fourth espresso of the day
    Given that my position is "inside the cafe"
    And that I know my current health
    And that I make the choice to "Buy an espresso"
    Then my health should be "10 more than before"
    And the value of my "Money" should be 5
    And the value of my "Espressos" should be 4
    And my hipster bag should contain "nothing cool"

  Scenario: I buy the fifth espresso of the day
    Given that my position is "inside the cafe"
    And that I know my current health
    And that I know my current menu choices
    And that I make the choice to "Buy an espresso"
    Then my health should be "10 more than before"
    And the value of my "Money" should be 0
    And the value of my "Espressos" should be 5
    And my hipster bag should contain "nothing cool"
    And I should be given the new choice "Play again"