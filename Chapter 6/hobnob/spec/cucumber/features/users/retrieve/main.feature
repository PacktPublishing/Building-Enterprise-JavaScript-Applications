Feature: Retrieve User by ID

  Clients should be able to send a request to our API in order to retrieve an user.

  Scenario: Retrieve Non-existing User
    When the client creates a GET request to /users/non-existent-user
    And sends the request
    Then our API should respond with a 404 HTTP status code

  Scenario: Retrieve Existing User
    Given the client creates a POST request to /users/
    And attaches a valid Create User payload
    And sends the request
    And saves the response text in the context under userId
    When the client creates a GET request to /users/:userId
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be a JSON object
    And the root property of the response should be the same as context.requestPayload but without the password field
    And the entity of type user, with ID stored under userId, should be deleted
