Feature: Login

  I want to login


  Scenario: Login with valid credentials
    Given I send a POST request to "/user/auth" with body:
    """
    {
      "email": "test@test.com",
      "password": "1234"
    }
    """
    And an user with email "test@test.com" and password "1234"
    Then the response status code should be 200
    And the response body should have a token

  Scenario: Login with invalid credentials
    Given I send a POST request to "/user/auth" with body:
    """
    {
      "email": "foo@foo.com",
      "password": "0000"
    }
    """
    Then the response status code should be 401
    And the response should be empty
