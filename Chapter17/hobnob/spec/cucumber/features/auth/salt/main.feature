Feature: Retrieve Salt and Parameters

  Test that we can create a user using a digest and then retrieve information about the digest's salt and parameters successfully

  Scenario: Retrieve Salt without specifying Email

    When the client creates a GET request to /salt/
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "The email field must be specified"

  Scenario: Send Digest and Retrieve Salt

    Given a new user is created with random password and email
    When the client creates a GET request to /salt/
    And set a valid Get Salt query string
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be a string
    And the payload should be equal to context.salt

  Scenario: Retrieve Salt of Non-Existent User

    When the client creates a GET request to /salt/
    And set "email=non@existent.email" as a query parameter
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be a string
    And the response string should satisfy the regular expression /^\$2a\$10\$[a-zA-Z0-9\.\/]{22}$/

  Scenario: Retrieve the same Salt of Non-Existent User over multiple requests

    Given the client creates a GET request to /salt/
    And set "email=non@existent.email" as a query parameter
    And sends the request
    And the payload of the response should be a string
    And saves the response text in the context under salt

    When the client creates a GET request to /salt/
    And set "email=non@existent.email" as a query parameter
    And sends the request
    And the payload of the response should be a string
    And the payload should be equal to context.salt
