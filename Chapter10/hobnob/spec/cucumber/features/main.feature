Feature: General

  Scenario Outline: Content-Type Header

  All requests using the method POST, PATCH or PUT, and carrying a non-empty payload, must have a 'Content-Type' header.

    When the client creates a <method> request to /users/
    And attaches a generic non-JSON payload
    But without a "Content-Type" header set
    And sends the request
    Then our API should respond with a 400 HTTP status code
    And the payload of the response should be a JSON object
    And contains a message property which says 'The "Content-Type" header must be set for POST, PATCH, and PUT requests with a non-empty payload.'

    Examples:
    | method |
    | POST   |
    | PATCH  |
    | PUT    |