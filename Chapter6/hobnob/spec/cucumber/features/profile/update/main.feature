@profile
Feature: Update User Profile

  Background: Create User with no profile
    Given the client creates a POST request to /users/
    And attaches {"email":"e@ma.il","password":"hunter2","profile":{"name":{"first":"Daniel","last":"Li","middle":"Foo"},"bio":"bio","summary":"summary"}} as the payload
    And sends the request
    And saves the response text in the context under userId
  
  Scenario Outline: Bad Client Requests

  If the client sends a PATCH request to /users/:userId/profile with an unsupported payload, it
  should receive a response with a 4xx HTTP status code.

    When the client creates a PATCH request to /users/:userId/profile
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

    When the client creates a PATCH request to /users/:userId/profile
    And attaches a Update User Profile payload which has the additional <additionalField> field
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "<message>"

    Examples:

    | additionalField | message                                                |
    | foo             | The '.profile' object does not support the field 'foo' |
    | foo, bar        | The '.profile' object does not support the field 'foo' |

  Scenario Outline: Request Payload with Properties of Unsupported Type
    When the client creates a PATCH request to /users/:userId/profile
    And attaches a Update User Profile payload where the <field> field is not a <type>
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

  
  Scenario: Non-Existent User
    When the client creates a PATCH request to /users/non-existent-user/profile
    And attaches a valid Update User Profile payload
    And sends the request
    Then our API should respond with a 404 HTTP status code
    And the payload of the response should be a JSON object
    And the message property of the response should be a string with the value "Not Found"
  
  Scenario Outline: Valid Profile
    When the client creates a PATCH request to /users/:userId/profile
    And attaches {"name":{"middle":"d4nyll"}} as the payload
    And sends the request
    Then our API should respond with a 200 HTTP status code

    When the client creates a GET request to /users/:userId
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be a JSON object
    And the root property of the response should be an object with the value {"email":"e@ma.il","profile":{"name":{"first":"Daniel","last":"Li","middle":"d4nyll"},"bio":"bio","summary":"summary"}}
