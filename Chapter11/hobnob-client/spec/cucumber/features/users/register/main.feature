Feature: Register User

  User visits the Registration Page, fills in the form, and submits

  Background: Navigate to the Registration Page

    When user navigates to /register

  Scenario Outline: Invalid Input

    Tests that the 'Register' button is disabled when either input elements contain invalid values

    When user types in "<email>" in the "#email" element
    And user types in "<password>" in the "#password" element
    Then the "#register-button" element should have a "disabled" attribute

  Examples:

  | testCase       | email         | password       |
  | Both Invalid   | invalid-email | shortpw        |
  | Invalid Email  | invalid-email | abcd1234qwerty |
  | Short Password | valid@ema.il  | shortpw        |

  Scenario: Valid Input

    Tests that the 'Register' button is enabled when valid values are provided, and that upon successful registration, the UI display will display the message "You've been registered successfully"

    When user types in a valid email in the "#email" element
    And user types in a valid password in the "#password" element
    Then the "#register-button" element should not have a "disabled" attribute

    When user clicks on the "#register-button" element
    Then the "#registration-success" element should appear within 2000 miliseconds
