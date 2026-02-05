/**
 * School's Accounting System - Node.js Implementation
 * Modernized version of the legacy COBOL system
 * 
 * This module provides the core business logic for managing student accounts
 */

class AccountingSystem {
  /**
   * Initialize the accounting system with a default balance
   * @param {number} initialBalance - Starting account balance (default: 1000.00)
   */
  constructor(initialBalance = 1000.00) {
    this.balance = this._validateAndFormatAmount(initialBalance);
    this.transactionHistory = [];
  }

  /**
   * Get the current account balance
   * @returns {number} Current balance with 2 decimal places
   */
  getBalance() {
    return this.balance;
  }

  /**
   * Credit (add) an amount to the account
   * @param {number} amount - Amount to credit
   * @returns {object} Result object with success status and new balance
   * @throws {Error} If amount is invalid
   */
  credit(amount) {
    try {
      const validatedAmount = this._validateAndFormatAmount(amount);

      if (validatedAmount < 0) {
        return {
          success: false,
          error: 'Credit amount cannot be negative',
          balance: this.balance,
        };
      }

      const previousBalance = this.balance;
      this.balance = this._roundToTwoDecimals(this.balance + validatedAmount);

      this.transactionHistory.push({
        type: 'CREDIT',
        amount: validatedAmount,
        previousBalance,
        newBalance: this.balance,
        timestamp: new Date(),
      });

      return {
        success: true,
        amount: validatedAmount,
        balance: this.balance,
        message: `Amount credited. New balance: ${this.balance.toFixed(2)}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        balance: this.balance,
      };
    }
  }

  /**
   * Debit (subtract) an amount from the account
   * Includes overdraft protection - prevents negative balances
   * @param {number} amount - Amount to debit
   * @returns {object} Result object with success status and new balance
   * @throws {Error} If amount is invalid
   */
  debit(amount) {
    try {
      const validatedAmount = this._validateAndFormatAmount(amount);

      if (validatedAmount < 0) {
        return {
          success: false,
          error: 'Debit amount cannot be negative',
          balance: this.balance,
        };
      }

      // Overdraft protection check
      if (validatedAmount > this.balance) {
        return {
          success: false,
          error: 'Insufficient funds for this debit',
          balance: this.balance,
          message: 'Insufficient funds for this debit.',
        };
      }

      const previousBalance = this.balance;
      this.balance = this._roundToTwoDecimals(this.balance - validatedAmount);

      this.transactionHistory.push({
        type: 'DEBIT',
        amount: validatedAmount,
        previousBalance,
        newBalance: this.balance,
        timestamp: new Date(),
      });

      return {
        success: true,
        amount: validatedAmount,
        balance: this.balance,
        message: `Amount debited. New balance: ${this.balance.toFixed(2)}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        balance: this.balance,
      };
    }
  }

  /**
   * Get transaction history
   * @returns {array} Array of all transactions
   */
  getTransactionHistory() {
    return [...this.transactionHistory];
  }

  /**
   * Reset the system to initial state
   * @param {number} initialBalance - Balance to reset to (default: 1000.00)
   */
  reset(initialBalance = 1000.00) {
    this.balance = this._validateAndFormatAmount(initialBalance);
    this.transactionHistory = [];
  }

  /**
   * Validate and format amount to ensure proper decimal precision
   * @private
   * @param {number|string} amount - Amount to validate
   * @returns {number} Validated amount rounded to 2 decimal places
   * @throws {Error} If amount is invalid
   */
  _validateAndFormatAmount(amount) {
    const parsed = parseFloat(amount);

    if (isNaN(parsed)) {
      throw new Error('Invalid amount: must be a number');
    }

    return this._roundToTwoDecimals(parsed);
  }

  /**
   * Round amount to 2 decimal places to avoid floating point precision issues
   * @private
   * @param {number} amount - Amount to round
   * @returns {number} Amount rounded to 2 decimal places
   */
  _roundToTwoDecimals(amount) {
    return Math.round(amount * 100) / 100;
  }

  /**
   * Validate menu input (1-4)
   * @static
   * @param {any} choice - Menu choice from user
   * @returns {object} Validation result with isValid flag and error message
   */
  static validateMenuChoice(choice) {
    const validChoices = [1, 2, 3, 4];
    const choiceNum = parseInt(choice, 10);

    if (isNaN(choiceNum) || !validChoices.includes(choiceNum)) {
      return {
        isValid: false,
        error: 'Invalid choice, please select 1-4.',
      };
    }

    return {
      isValid: true,
      choice: choiceNum,
    };
  }
}

module.exports = AccountingSystem;
