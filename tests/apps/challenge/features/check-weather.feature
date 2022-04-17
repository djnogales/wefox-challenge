Feature: Check weather

  I want to check the weather given a pair of coordinates

  Scenario: Valid coordinates
    Given I send a GET request to '/weather?latitude=40.41533261037895&longitude=-3.7073995196604157'
    Then the response status code should be 200
    And the response body should have Weather primitives

