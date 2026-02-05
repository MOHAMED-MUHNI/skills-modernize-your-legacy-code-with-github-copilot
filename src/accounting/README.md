# School's Accounting System - Node.js Implementation

This directory contains the modernized Node.js implementation of the school's legacy COBOL accounting system.

## Overview

The `AccountingSystem` class provides the core business logic for managing student accounts with the following features:

- **Balance Management**: Track and display account balances
- **Credit Operations**: Add amounts to accounts
- **Debit Operations**: Subtract amounts from accounts with overdraft protection
- **Overdraft Prevention**: Prevents transactions that would result in negative balances
- **Transaction History**: Records all operations with timestamps
- **Decimal Precision**: Maintains accurate 2-decimal place precision

## Files

- **accountingSystem.js** - Core accounting system implementation
- **accountingSystem.test.js** - Comprehensive unit test suite (45 tests)
- **jest.config.js** - Jest test framework configuration
- **package.json** - Project dependencies and scripts

## Installation

Install dependencies:

```bash
npm install
```

## Running Tests

Run all unit tests:

```bash
npm test
```

Run tests with watch mode (re-run on file changes):

```bash
npm run test:watch
```

Generate code coverage report:

```bash
npm run test:coverage
```

## Class: AccountingSystem

### Constructor

```javascript
const system = new AccountingSystem(initialBalance = 1000.00);
```

Creates a new accounting system instance with optional initial balance (defaults to $1,000.00).

### Methods

#### `getBalance()`

Returns the current account balance.

```javascript
const balance = system.getBalance();
// Returns: 1500.00
```

#### `credit(amount)`

Adds an amount to the account. Returns success/failure result object.

```javascript
const result = system.credit(500);
// Returns: { success: true, amount: 500, balance: 1500.00, message: '...' }
```

#### `debit(amount)`

Subtracts an amount from the account with overdraft protection.

```javascript
const result = system.debit(200);
// Returns: { success: true, amount: 200, balance: 800.00, message: '...' }
```

Fails if amount exceeds balance:

```javascript
const result = system.debit(2000);
// Returns: { success: false, error: 'Insufficient funds for this debit', balance: 1000 }
```

#### `getTransactionHistory()`

Returns an array of all transactions with details.

```javascript
const history = system.getTransactionHistory();
// Each entry includes: type, amount, previousBalance, newBalance, timestamp
```

#### `reset(initialBalance = 1000.00)`

Resets the system to a clean state with specified initial balance.

```javascript
system.reset(2000);
// Balance is now 2000.00, transaction history is cleared
```

#### Static: `validateMenuChoice(choice)`

Validates menu input (1-4 are valid choices).

```javascript
const result = AccountingSystem.validateMenuChoice(2);
// Returns: { isValid: true, choice: 2 }

const result = AccountingSystem.validateMenuChoice(5);
// Returns: { isValid: false, error: 'Invalid choice, please select 1-4.' }
```

## Test Coverage

The test suite includes **45 comprehensive tests** covering all business logic scenarios from the [Test Plan](../../docs/TESTPLAN.md):

### Test Categories

1. **System Initialization** (3 tests)
   - TC-001, TC-002, TC-003

2. **Basic Operations** (2 tests)
   - TC-004, TC-005

3. **Overdraft Protection** (5 tests)
   - TC-006, TC-007, TC-008, TC-020, TC-021

4. **Edge Cases** (3 tests)
   - TC-009, TC-010, TC-011

5. **Input Validation** (4 tests)
   - TC-012, TC-013, TC-014, TC-015

6. **Program Flow** (2 tests)
   - TC-016

7. **Sequential Operations** (3 tests)
   - TC-017, TC-018, TC-019

8. **Multiple Operations** (2 tests)
   - TC-022, TC-023

9. **Menu Behavior** (2 tests)
   - TC-024, TC-025

10. **Data Isolation** (2 tests)
    - TC-026

11. **Negative Input Handling** (2 tests)
    - TC-027, TC-028

12. **Decimal Precision** (2 tests)
    - TC-029, TC-030

13. **Advanced Features** (12 tests)
    - Floating point precision
    - Transaction history
    - Error handling
    - Custom balances
    - Menu validation

## Key Business Rules Implemented

1. ✅ **Initial Balance**: System starts with $1,000.00
2. ✅ **Credit Operation**: Adds specified amount to balance
3. ✅ **Debit Operation**: Subtracts specified amount from balance
4. ✅ **Overdraft Protection**: Prevents negative balance transactions
5. ✅ **Decimal Precision**: All amounts maintain 2 decimal places
6. ✅ **State Persistence**: Balance changes persist within session
7. ✅ **Error Handling**: Invalid inputs handled gracefully
8. ✅ **Transaction Logging**: All operations recorded with timestamps
9. ✅ **Menu Validation**: Input validation for user choices

## Example Usage

```javascript
const AccountingSystem = require('./accountingSystem');

// Create system instance
const system = new AccountingSystem();

// View balance
console.log(`Balance: $${system.getBalance().toFixed(2)}`);
// Output: Balance: $1000.00

// Credit account
let result = system.credit(500);
console.log(result.message);
// Output: Amount credited. New balance: 1500.00

// Debit account
result = system.debit(200);
console.log(result.message);
// Output: Amount debited. New balance: 1300.00

// Attempt overdraft
result = system.debit(2000);
console.log(result.error);
// Output: Insufficient funds for this debit

// Get transaction history
const history = system.getTransactionHistory();
console.log(`Total transactions: ${history.length}`);
// Output: Total transactions: 3

// Reset for new session
system.reset();
console.log(`Balance: $${system.getBalance().toFixed(2)}`);
// Output: Balance: $1000.00
```

## Floating Point Precision

The implementation uses proper rounding techniques to avoid JavaScript floating point precision issues:

```javascript
system.credit(0.1);
system.credit(0.2);
system.debit(0.15);
console.log(system.getBalance());
// Correctly outputs: 1000.15 (not 1000.1500000000001)
```

## Traceability to COBOL Test Plan

This Node.js implementation passes all test scenarios defined in [docs/TESTPLAN.md](../../docs/TESTPLAN.md):

- All 30 test cases from the COBOL test plan are implemented as unit tests
- Each test validates the expected behavior from the original system
- Additional tests cover Node.js-specific features like async operations and error handling

## Modernization Improvements

Compared to the legacy COBOL system:

✨ **Enhanced Features**:

- Transaction history with timestamps
- Improved error handling and validation
- Better decimal precision handling
- Extensible class-based architecture
- Comprehensive test coverage

🔒 **Better Reliability**:

- Fixed floating point precision issues
- Input validation on all operations
- Transaction logging for audit trails

🚀 **Ready for Expansion**:

- Easy to add persistence layer (database)
- Can be wrapped in REST API
- Supports multiple concurrent accounts
- Testable and maintainable code

## Next Steps

- Integrate with a web framework (Express.js) to create REST API
- Add database persistence layer
- Implement user authentication
- Create frontend UI for account management
- Add more comprehensive logging and monitoring
