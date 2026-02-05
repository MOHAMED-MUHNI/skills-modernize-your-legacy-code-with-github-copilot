# Test Plan - School's Legacy COBOL Accounting System

## Overview

This test plan documents comprehensive test cases for the school's legacy COBOL accounting system. These tests validate the core business logic and will serve as requirements for the modernized Node.js implementation.

---

## Test Cases

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-001 | Verify system startup and menu display | System installed and compiled | Execute accountsystem; System displays main menu | Menu displays with options 1-4 (View Balance, Credit Account, Debit Account, Exit) | | | |
| TC-002 | Verify initial account balance | System started; Menu is displayed | Select option 1 (View Balance) | Current balance displays as $1000.00 | | | Initial balance requirement |
| TC-003 | View balance - option 1 selection | System started; Menu is displayed | Select option 1; System prompts for choice | Balance is displayed: "Current balance: 1000.00" | | | |
| TC-004 | Credit account - basic operation | System started; Balance is $1000.00 | Select option 2; Enter credit amount 500.00 | New balance displays as 1500.00 | | | Credit successfully increases balance |
| TC-005 | Debit account - basic operation | System started; Balance is $1000.00 | Select option 3; Enter debit amount 200.00 | New balance displays as 800.00 | | | Debit successfully decreases balance |
| TC-006 | Debit account - overdraft prevention | System started; Balance is $1000.00 | Select option 3; Enter debit amount 1500.00 | Error message: "Insufficient funds for this debit." Balance remains 1000.00 | | | Overdraft protection active |
| TC-007 | Debit account - exact balance | System started; Balance is $1000.00 | Select option 3; Enter debit amount 1000.00 | New balance displays as 0.00 | | | Boundary: Exact balance debit |
| TC-008 | Debit account - insufficient funds (close) | System started; Balance is $100.00 | Select option 3; Enter debit amount 150.00 | Error message: "Insufficient funds for this debit." Balance remains 100.00 | | | Overdraft protection prevents operation |
| TC-009 | Credit account - zero amount | System started; Balance is $1000.00 | Select option 2; Enter credit amount 0.00 | New balance displays as 1000.00 | | | Zero credit does not change balance |
| TC-010 | Credit account - large amount | System started; Balance is $1000.00 | Select option 2; Enter credit amount 999999.99 | New balance displays as 1000999.99 | | | System handles large credit amounts |
| TC-011 | Debit account - minimum amount | System started; Balance is $1000.00 | Select option 3; Enter debit amount 0.01 | New balance displays as 999.99 | | | Minimum debit operation |
| TC-012 | Invalid menu selection - negative | System started; Menu is displayed | Select option -1 | Error message: "Invalid choice, please select 1-4." Menu redisplays | | | Input validation |
| TC-013 | Invalid menu selection - zero | System started; Menu is displayed | Select option 0 | Error message: "Invalid choice, please select 1-4." Menu redisplays | | | Input validation |
| TC-014 | Invalid menu selection - out of range | System started; Menu is displayed | Select option 5 | Error message: "Invalid choice, please select 1-4." Menu redisplays | | | Input validation |
| TC-015 | Invalid menu selection - non-numeric | System started; Menu is displayed | Select option "ABC" | Error message: "Invalid choice, please select 1-4." Menu redisplays | | | Input validation |
| TC-016 | Exit program - option 4 | System started; Menu is displayed | Select option 4 | Message displays: "Exiting the program. Goodbye!" Program terminates | | | Normal program exit |
| TC-017 | Sequential operations - credit then debit | System started; Balance is $1000.00 | Select option 2; Credit 500; Select option 1; View balance; Select option 3; Debit 300 | After credit: 1500.00; After debit: 1200.00 | | | Multiple operations execute sequentially |
| TC-018 | Sequential operations - debit then credit | System started; Balance is $1000.00 | Select option 3; Debit 200; Select option 2; Credit 500; Select option 1; View balance | After debit: 800.00; After credit: 1300.00 | | | Operations preserve state |
| TC-019 | Balance persistence across operations | System started; Balance is $1000.00 | Perform: Credit 100 (→1100), View balance, Debit 50 (→1050), View balance | All operations work correctly with accumulated balance changes | | | State persists within session |
| TC-020 | Boundary - maximum debit amount | System started; Balance is $500.00 | Select option 3; Enter debit amount 500.00 | New balance displays as 0.00 | | | Debit exactly to zero is allowed |
| TC-021 | Boundary - one cent above balance | System started; Balance is $500.00 | Select option 3; Enter debit amount 500.01 | Error message: "Insufficient funds for this debit." Balance remains 500.00 | | | Overdraft protection at precision level |
| TC-022 | Credit account - multiple small amounts | System started; Balance is $1000.00 | Select option 2; Credit 1.00 (repeat 5 times) | Final balance displays as 1005.00 | | | Accumulation of small credits |
| TC-023 | Debit account - multiple small amounts | System started; Balance is $1000.00 | Select option 3; Debit 1.00 (repeat 10 times) | Final balance displays as 990.00 | | | Accumulation of small debits |
| TC-024 | Menu loop continues after invalid entry | System started; Menu is displayed | Select invalid option 9; Select valid option 1 | Invalid message displays; Menu reappears; Balance displays correctly | | | System recovers from invalid input |
| TC-025 | Menu loop continues after successful operation | System started; Menu is displayed | Select option 2; Credit 100; System redisplays menu | New balance: 1100.00; Menu displays again ready for next choice | | | Loop continues after operation |
| TC-026 | Data isolation - balance independent per run | Run 1: Start system; Credit 500; Run 2: Start system fresh | Each run shows different balances; Run 2 shows initial $1000.00 | Balance resets to $1000.00 on program restart | | | Data reset on program restart |
| TC-027 | Debit with negative input validation | System started; Menu is displayed | Select option 3; Enter debit amount -100 | System behavior with negative debit (should reject or treat as credit) | | | Edge case: negative amount input |
| TC-028 | Credit with negative input validation | System started; Menu is displayed | Select option 2; Enter credit amount -100 | System behavior with negative credit (should reject or treat as debit) | | | Edge case: negative amount input |
| TC-029 | Decimal precision - credit | System started; Balance is $1000.00 | Select option 2; Credit 123.45 | New balance displays as 1123.45 | | | Decimal precision preserved |
| TC-030 | Decimal precision - debit | System started; Balance is $1000.00 | Select option 3; Debit 234.56 | New balance displays as 765.44 | | | Decimal precision preserved in subtraction |

---

## Test Coverage Summary

### Functionality Covered

- **Menu Navigation**: TC-001, TC-024, TC-025
- **View Balance**: TC-002, TC-003, TC-017, TC-018, TC-019
- **Credit Operations**: TC-004, TC-009, TC-010, TC-022, TC-029
- **Debit Operations**: TC-005, TC-006, TC-007, TC-008, TC-011, TC-020, TC-021, TC-023, TC-030
- **Overdraft Protection**: TC-006, TC-008, TC-020, TC-021
- **Input Validation**: TC-012, TC-013, TC-014, TC-015
- **Program Flow**: TC-016, TC-026
- **Sequential Operations**: TC-017, TC-018, TC-019, TC-025
- **Edge Cases & Boundaries**: TC-007, TC-008, TC-010, TC-011, TC-020, TC-021
- **Edge Cases**: TC-027, TC-028

### Business Rules Validated

1. **Initial Balance**: System starts with $1,000.00 balance
2. **Credit Operation**: Adds specified amount to current balance
3. **Debit Operation**: Subtracts specified amount from current balance
4. **Overdraft Protection**: Prevents debit operation if result would be negative
5. **Menu Loop**: System continues presenting menu until user selects Exit (option 4)
6. **Invalid Input Handling**: Rejects invalid menu selections with error message
7. **Decimal Precision**: All amounts maintain 2 decimal places (cents)
8. **State Persistence**: Balance changes persist within a program session
9. **Program Exit**: Option 4 cleanly exits the application

---

## Notes for Test Execution

- Tests should be executed in order to maintain proper state progression
- TC-026 requires running the application twice, restarting the system between runs
- Input validation tests (TC-012 through TC-015) may behave differently depending on system keyboard input handling
- Edge cases with negative inputs (TC-027, TC-028) should clarify business intent before implementation in Node.js version

---

## Traceability to COBOL Code

- **main.cob**: Menu logic (TC-001, TC-012-TC-016, TC-024, TC-025)
- **data.cob**: Balance storage and retrieval (TC-002, TC-026)
- **operations.cob**: Business logic for TOTAL, CREDIT, DEBIT operations (TC-002-TC-023, TC-029, TC-030)

---

## Modernization Notes for Node.js Implementation

When implementing this test plan in the Node.js version:

1. **Input Validation**: Strengthen decimal input validation and negative number handling
2. **Error Messages**: Consider more specific error codes in addition to user messages
3. **Logging**: Add audit trail/transaction logging not present in legacy system
4. **Float Precision**: Use fixed-point arithmetic (e.g., storing amounts in cents) to avoid floating-point precision issues
5. **Async Considerations**: Plan for async data persistence (database operations)
6. **API Testing**: Convert UI test cases to API/unit test cases for REST endpoints
7. **State Management**: Consider session management for multi-user scenarios
8. **Data Validation**: Add schema validation on all inputs before processing
