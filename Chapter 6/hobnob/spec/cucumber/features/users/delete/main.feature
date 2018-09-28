Feature: Delete User by ID

  Clients should be able to send a request to our API in order to delete an user.

  Scenario: Delete Non-existing User
    When the client creates a DELETE request to /users/non-existent-user
    And sends the request
    Then our API should respond with a 404 HTTP status code

  Scenario: Delete Existing User
    Given the client creates a POST request to /users/
    And attaches a valid Create User payload
    And sends the request
    And saves the response text in the context under userId

    When the client creates a DELETE request to /users/:userId
    And sends the request
    Then our API should respond with a 200 HTTP status code
    
    When the client creates a GET request to /users/:userId
    And sends the request
    Then our API should respond with a 404 HTTP status code
