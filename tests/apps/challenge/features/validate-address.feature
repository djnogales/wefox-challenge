Feature: Validate address

    I want to validate if an address is real

    Scenario: A valid address
    Given I send a POST request to "/validate-address" with body:
    """
    {
        "street": "Calle de Preciados",
        "streetNumber": "40",
        "town": "Madrid",
        "postalCode": "28013",
        "country": "Spain"
    }
    """
    Then the response status code should be 200
    And the response should be empty

    Scenario: An invalid address
    Given I send a POST request to "/validate-address" with body:
    """
    {
        "street": "Fake Street",
        "streetNumber": "800",
        "town": "Birds Island",
        "postalCode": "111111",
        "country": "Never Land"
    }
    """
    Then the response status code should be 400
    And the response should be empty
