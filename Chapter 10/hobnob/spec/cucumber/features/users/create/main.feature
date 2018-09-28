Feature: Create User

  Clients should be able to send a request to our API in order to create an
  user. Our API should also validate the structure of the payload and respond
  with an error if it is invalid.

  Scenario Outline: Bad Client Requests

  If the client sends a POST request to /users/ with an unsupported payload, it
  should receive a response with a 4xx status code.

    When the client creates a POST request to /users/
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

  Scenario Outline: Bad Request Payload

    When the client creates a POST request to /users/
    And attaches a Create User payload which is missing the <missingFields> field
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "<message>"

    Examples:

    | missingFields | message                        |
    | email         | The '.email' field is missing  |
    | digest        | The '.digest' field is missing |
  
  Scenario Outline: Request Payload with Properties of Unsupported Type
    When the client creates a POST request to /users/
    And attaches a Create User payload where the <field> field is not a <type>
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "The '.<field>' field must be of type <type>"

    Examples:
    | field  | type   |
    | email  | string |
    | digest | string |

  Scenario Outline: Request Payload with invalid email format
    When the client creates a POST request to /users/
    And attaches a Create User payload where the email field is exactly <email>
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "The '.email' field must be a valid email"

    Examples:

    | email     |
    | a238juqy2 |
    | a@1.2.3.4 |
    | a,b,c@!!  |

  Scenario Outline: Request Payload with invalid digest format
    When the client creates a POST request to /users/
    And attaches a Create User payload where the digest field is exactly <digest>
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "The '.digest' field should be a valid bcrypt digest"

    Examples:

    | digest                                                       |
    | jwnY3Iq1bpT5RTsAXKOLnr3ee423zWFU23efwXF27bVKJ4VrDmWA0hZi6YI0 |
    | $2y$10$a7iPlM2ORVOPr0QNvDf.a.0QKEWwSGRKBaKSqv,40KFGcBuveazjW |
    | #2y$10$a7iPlM2ORVOPr0QNvDf.a.0QKEWwSGRKBaKSqv.40KFGcBuveazjW |

  Scenario: Minimal Valid User

    When the client creates a POST request to /users/
    And attaches a valid Create User payload
    And sends the request
    And saves the response text in the context under userId
    Then our API should respond with a 201 HTTP status code
    And the payload of the response should be a string
    And the payload object should be added to the database, grouped under the "user" type
    And the entity of type user, with ID stored under userId, should be deleted

  Scenario Outline: Invalid Profile

    When the client creates a POST request to /users/
    And attaches <payload> as the payload
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says "<message>"

    Examples:

    | payload                                                                                                                                 | message                                                   |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"foo":"bar"}}                     | The '.profile' object does not support the field 'foo'    |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"name":"Jane Doe"}}               | The '.profile.name' field must be of type object          |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"name":{"first":"Jane","a":"b"}}} | The '.profile.name' object does not support the field 'a' |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"summary":0}}                     | The '.profile.summary' field must be of type string       |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"bio":0}}                         | The '.profile.bio' field must be of type string           |

  Scenario Outline: Valid Profile

    When the client creates a POST request to /users/
    And attaches <payload> as the payload
    And sends the request
    And saves the response text in the context under userId
    Then our API should respond with a 201 HTTP status code
    And the payload of the response should be a string
    And the payload object should be added to the database, grouped under the "user" type
    And the entity of type user, with ID stored under userId, should be deleted

    Examples:

    | payload                                                                                                                           |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{}}                          |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"name":{}}}                 |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"name":{"first":"Daniel"}}} |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"bio":"bio"}}               |
    | {"email":"e@ma.il","digest":"$2y$10$6.5uPfJUCQlcuLO/SNVX3u1yU6LZv.39qOzshHXJVpaq3tJkTwiAy","profile":{"summary":"summary"}}       |