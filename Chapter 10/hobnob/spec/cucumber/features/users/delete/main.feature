Feature: Delete User by ID

  Clients should be able to send a request to our API in order to delete an user.

  Background: Create two Users and logs in with the first user's account

    Given 2 new users are created with random password and email
    And the client creates a POST request to /login/
    And attaches a valid Login payload
    And sends the request
    And saves the response text in the context under token

  Scenario Outline: Wrong Authorization Header Scheme

    When the client creates a DELETE request to /users/:userId
    And set the HTTP header field "Authorization" to "<header>"
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "The Authorization header should use the Bearer scheme"

    Examples:

    | header                |
    | Basic e@ma.il:hunter2 |

  Scenario Outline: Invalid Token Format

    When the client creates a DELETE request to /users/:userId
    And set the HTTP header field "Authorization" to "Bearer <token>"
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "The credentials used in the Authorization header should be a valid bcrypt digest"

    Examples:

    | token                                                        |
    |                                                              |
    | 6g3$d21"dfG9),Ol;UD6^UG4D£SWerCSfgiJH323£!AzxDCftg7yhjYTEESF |
    | $2a$10$BZze4nPsa1D8AlCue76.sec8Z/Wn5BoG4kXgPqoEfYXxZuD27PQta |

  Scenario: Delete Self with Token with Wrong Signature

    The user is trying to delete its own account, the token contains the correct payload, but the signature is wrong.

    When the client creates a DELETE request to /users/:userId
    And sets the Authorization header to a token with wrong signature
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "Invalid signature in token"

  Scenario: Delete Self

    When the client creates a DELETE request to /users/:userId
    And sets the Authorization header to a valid token
    And sends the request
    Then our API should respond with a 200 HTTP status code
    
    When the client creates a GET request to /users/:userId
    And sends the request
    Then our API should respond with a 404 HTTP status code

  Scenario: Delete Non-existing User

    When the client creates a DELETE request to /users/:userId
    And sets the Authorization header to a valid token
    And sends the request
    Then our API should respond with a 200 HTTP status code

    When the client creates a DELETE request to /users/:userId
    And sets the Authorization header to a valid token
    And sends the request
    Then our API should respond with a 404 HTTP status code

  Scenario: Delete Different User

    A user can only delete him/herself. When trying to delete another user, it should return with 403 Forbidden.

    When the client creates a DELETE request to /users/:users.1.id
    And sets the Authorization header to a valid token
    And sends the request
    Then our API should respond with a 403 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "Permission Denied. Can only delete yourself, not other users."
