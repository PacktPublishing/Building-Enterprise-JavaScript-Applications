@profile
Feature: Replace User Profile by ID

  Background: Create two Users and logs in with the first user's account

    Given 2 new users are created with random password and email
    And the client creates a POST request to /login/
    And attaches a valid Login payload
    And sends the request
    And saves the response text in the context under token

  Scenario Outline: Bad Client Requests

  If the client sends a PUT request to /users/:userId/profile with an unsupported payload, it
  should receive a response with a 4xx HTTP status code.

    When the client creates a PUT request to /users/user-id/profile
    And sets the Authorization header to a valid token
    And attaches a generic <payloadType> payload
    And sends the request
    Then our API should respond with a <statusCode> HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says <message>
 
    Examples:

    | payloadType | statusCode | message                                                       |
    | empty       | 400        | "Payload should not be empty"                                 |
    | non-JSON    | 415        | "The "Content-Type" header must always be "application/json"" |
    | malformed   | 400        | "Payload should be in JSON format"                            |

  Scenario Outline: Payload with Additional Properties

    When the client creates a PUT request to /users/user-id/profile
    And sets the Authorization header to a valid token
    And attaches a Replace User Profile payload which has the additional <additionalField> field
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "<message>"

    Examples:

    | additionalField | message                                                |
    | foo             | The '.profile' object does not support the field 'foo' |
    | foo, bar        | The '.profile' object does not support the field 'foo' |

  Scenario Outline: Request Payload with Properties of Unsupported Type
    When the client creates a PUT request to /users/user-id/profile
    And attaches a Replace User Profile payload where the <field> field is not a <type>
    And sets the Authorization header to a valid token
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "The '.profile.<field>' field must be of type <type>"

    Examples:
    | field       | type   |
    | bio         | string |
    | summary     | string |
    | name        | object |
    | name.first  | string |
    | name.middle | string |
    | name.last   | string |
  
  Scenario Outline: Wrong Authorization Header Scheme

    When the client creates a PUT request to /users/:userId/profile
    And attaches a valid Replace User Profile payload
    And set the HTTP header field "Authorization" to "<header>"
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "The Authorization header should use the Bearer scheme"

    Examples:

    | header                |
    | Basic e@ma.il:hunter2 |

  Scenario Outline: Invalid Token Format

    When the client creates a PUT request to /users/:userId/profile
    And attaches a valid Replace User Profile payload
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

  Scenario: Replace Profile using Token with Wrong Signature

    The user is trying to replace its own profile, the token contains the correct payload, but the signature is wrong.

    When the client creates a PUT request to /users/:userId/profile
    And attaches a valid Replace User Profile payload
    And sets the Authorization header to a token with wrong signature
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "Invalid signature in token"

  Scenario: Non-Existent User
    When the client creates a PUT request to /users/non-existent-user/profile
    And attaches a valid Replace User Profile payload
    And sets the Authorization header to a valid token
    And sends the request
    Then our API should respond with a 404 HTTP status code
    And the payload of the response should be a JSON object
    And the message property of the response should be a string with the value "Not Found"

  Scenario: Minimal Valid Profile
    When the client creates a PUT request to /users/:userId/profile
    And attaches a valid Replace User Profile payload
    And sets the Authorization header to a valid token
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be a string
  
  Scenario Outline: Valid Profile
    When the client creates a PUT request to /users/:userId/profile
    And attaches <payload> as the payload
    And sets the Authorization header to a valid token
    And sends the request
    Then our API should respond with a 200 HTTP status code

    When the client creates a GET request to /users/:userId
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be a JSON object
    And the profile property of the response should be an object with the value <payload>

    Examples:

    | payload                                                                                |
    | {"name":{}}                                                                            |
    | {"name":{"first":"Daniel"}}                                                            |
    | {"bio":"bio"}                                                                          |
    | {"summary":"summary"}                                                                  |
    | {"name":{"first":"Daniel","last":"Li","middle":"Foo"},"bio":"bio","summary":"summary"} |
