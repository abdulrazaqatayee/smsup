Feature: Gateways
  As an admin
  I can choose different SMS Gateways
  In order to choose the best price
  https://trello.com/c/ez7fSAGS/20-trial-mexcomm

  Scenario: Receive and send with mexcom
    Given that SMSUP is using the 'mexcom' gateway
    And that the 'any' group exists
    And I join the 'any' group'
    When phone number A sends an SMS through Mexcom with content 'APPS10 any hi'
    Then I receive an SMS through 'mexcom'
