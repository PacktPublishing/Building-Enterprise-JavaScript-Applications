Feature: Search Users

  Clients should be able to send a request to our API in order to search users based on parameters.

  Background: Create Users from Sample Data
    Given all documents of type "user" are deleted
    And all documents in the "javascript-experts" sample are added to the index with type "user"

  Scenario Outline: When there 10 or fewer users
    Given all documents of type "user" are deleted
    And <count> documents in the "javascript-experts" sample are added to the index with type "user"
    When the client creates a GET request to /users/
    And attaches {"query": ""} as the payload
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be an array
    And the response should contain <count> items

  Examples:

  | count |
  | 0     |
  | 5     |
  | 10    |

  Scenario Outline: Results come back in the correct order if search term is given

    When the client creates a GET request to /users/
    And attaches {"query": "<searchTerm>"} as the payload
    And sends the request
    Then our API should respond with a 200 HTTP status code
    And the payload of the response should be an array
    And the first item of the response should have property profile.name.first set to <firstName>

  Examples:

  | searchTerm    | firstName |
  | Norway        | Sindre    |
  | Google Chrome | Paul      |
  | Osmani        | Addy      |
