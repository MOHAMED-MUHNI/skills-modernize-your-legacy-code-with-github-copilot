/**
 * School's Accounting System - Main Entry Point
 * Modernized Node.js version of the legacy COBOL system
 */

const AccountingSystem = require('./accountingSystem');

/**
 * Example usage of the AccountingSystem
 * Demonstrates core functionality including credit and debit operations
 */

// Initialize the accounting system
const accountingSystem = new AccountingSystem();

console.log('=== School\'s Accounting System ===\n');

// Example 1: View initial balance
console.log(`Initial Balance: $${accountingSystem.getBalance().toFixed(2)}`);

// Example 2: Credit operation
const creditResult = accountingSystem.credit(500);
console.log(`\nCredit Operation: +$500.00`);
console.log(`Success: ${creditResult.success}`);
console.log(`New Balance: $${creditResult.balance.toFixed(2)}`);

// Example 3: Debit operation
const debitResult = accountingSystem.debit(200);
console.log(`\nDebit Operation: -$200.00`);
console.log(`Success: ${debitResult.success}`);
console.log(`New Balance: $${debitResult.balance.toFixed(2)}`);

// Example 4: Attempt overdraft (debit protection)
const overdraftResult = accountingSystem.debit(2000);
console.log(`\nDebit Operation (Overdraft Test): -$2000.00`);
console.log(`Success: ${overdraftResult.success}`);
console.log(`Error: ${overdraftResult.error || 'None'}`);
console.log(`Current Balance: $${accountingSystem.getBalance().toFixed(2)}`);

// Export for use as a module
module.exports = AccountingSystem;
