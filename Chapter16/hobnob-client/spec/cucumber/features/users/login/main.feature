Feature: Login User

  User visits the Login Page, fills in the form, and submits

  Background: Navigate to the Login Page

    When user navigates to /login

  Scenario Outline: Invalid Input

    Tests that the 'Login' button is disabled when either input elements contain invalid values

    When user types in "<email>" in the "#email" element
    And user types in "<password>" in the "#password" element
    Then the "#login-button" element should have a "disabled" attribute

  Examples:

  | testCase       | email         | password       |
  | Both Invalid   | invalid-email | shortpw        |
  | Invalid Email  | invalid-email | abcd1234qwerty |
  | Short Password | valid@ema.il  | shortpw        |

  Scenario: Valid Input

    Tests that the 'Login' button is enabled when valid values are provided, and that upon successful login, the UI display will display the message "You've been logged in successfully"

    When a random user is registered
    When user types in his/her email in the "#email" element
    And user types in his/her password in the "#password" element
    Then the "#login-button" element should not have a "disabled" attribute

    When user clicks on the "#login-button" element
    Then the "#login-success" element should appear within 2000 miliseconds
