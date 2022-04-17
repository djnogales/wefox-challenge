Feature: Register

  I want to register


  Scenario: Register user successfully
    Given I send a POST request to "/user" with body:
    """
    {
        "email": "example@example.com",
        "password": "example"
    }
    """
    Then the response status code should be 201
    And the response should be empty
