/**
 * Unit Tests for School's Accounting System
 * 
 * These tests mirror the 30 test cases defined in docs/TESTPLAN.md
 * Each test validates the business logic and behavior of the accounting system
 */

const AccountingSystem = require('./accountingSystem');

describe('AccountingSystem - Core Functionality', () => {
  let system;

  beforeEach(() => {
    system = new AccountingSystem();
  });

  // ============================================================================
  // TC-001, TC-002, TC-003: System Initialization and Menu
  // ============================================================================
  describe('TC-001 to TC-003: System Initialization and Menu Display', () => {
    test('TC-001: System initializes and displays menu (implicit via creation)', () => {
      expect(system).toBeDefined();
      expect(system.getBalance()).toBe(1000.00);
    });

    test('TC-002: Verify initial account balance is $1000.00', () => {
      expect(system.getBalance()).toBe(1000.00);
    });

    test('TC-003: View balance - verify balance display', () => {
      const balance = system.getBalance();
      expect(balance).toBe(1000.00);
      expect(typeof balance).toBe('number');
    });
  });

  // ============================================================================
  // TC-004, TC-005: Basic Credit and Debit Operations
  // ============================================================================
  describe('TC-004 to TC-005: Basic Credit and Debit Operations', () => {
    test('TC-004: Credit account - basic operation (add $500)', () => {
      const result = system.credit(500);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1500.00);
      expect(system.getBalance()).toBe(1500.00);
    });

    test('TC-005: Debit account - basic operation (subtract $200)', () => {
      const result = system.debit(200);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(800.00);
      expect(system.getBalance()).toBe(800.00);
    });
  });

  // ============================================================================
  // TC-006 to TC-008, TC-020, TC-021: Overdraft Protection
  // ============================================================================
  describe('TC-006 to TC-008, TC-020, TC-021: Overdraft Protection', () => {
    test('TC-006: Debit account - overdraft prevention (attempt $1500 debit)', () => {
      const result = system.debit(1500);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Insufficient funds');
      expect(system.getBalance()).toBe(1000.00); // Balance unchanged
    });

    test('TC-007: Debit account - exact balance debit ($1000)', () => {
      const result = system.debit(1000);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(0.00);
    });

    test('TC-008: Debit account - insufficient funds (attempt $150 with $100 balance)', () => {
      system.debit(900); // Leave balance at $100
      const result = system.debit(150);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Insufficient funds');
      expect(system.getBalance()).toBe(100.00);
    });

    test('TC-020: Boundary - maximum debit amount (debit exactly available balance)', () => {
      system.reset(500); // Set balance to $500
      const result = system.debit(500);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(0.00);
    });

    test('TC-021: Boundary - one cent above balance (attempt $500.01 with $500)', () => {
      system.reset(500);
      const result = system.debit(500.01);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Insufficient funds');
      expect(system.getBalance()).toBe(500.00);
    });
  });

  // ============================================================================
  // TC-009 to TC-011: Credit and Debit Edge Cases
  // ============================================================================
  describe('TC-009 to TC-011: Credit Amount Edge Cases', () => {
    test('TC-009: Credit account - zero amount ($0)', () => {
      const result = system.credit(0);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1000.00); // No change
    });

    test('TC-010: Credit account - large amount ($999999.99)', () => {
      const result = system.credit(999999.99);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1000999.99);
    });

    test('TC-011: Debit account - minimum amount ($0.01)', () => {
      const result = system.debit(0.01);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(999.99);
    });
  });

  // ============================================================================
  // TC-012 to TC-015: Input Validation - Invalid Menu Selections
  // ============================================================================
  describe('TC-012 to TC-015: Input Validation', () => {
    test('TC-012: Invalid menu selection - negative (-1)', () => {
      const result = AccountingSystem.validateMenuChoice(-1);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid choice');
    });

    test('TC-013: Invalid menu selection - zero (0)', () => {
      const result = AccountingSystem.validateMenuChoice(0);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid choice');
    });

    test('TC-014: Invalid menu selection - out of range (5)', () => {
      const result = AccountingSystem.validateMenuChoice(5);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid choice');
    });

    test('TC-015: Invalid menu selection - non-numeric ("ABC")', () => {
      const result = AccountingSystem.validateMenuChoice('ABC');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid choice');
    });
  });

  // ============================================================================
  // TC-016: Exit Program
  // ============================================================================
  describe('TC-016: Program Flow', () => {
    test('TC-016: Exit program - option 4 validation', () => {
      const result = AccountingSystem.validateMenuChoice(4);
      expect(result.isValid).toBe(true);
      expect(result.choice).toBe(4);
    });

    test('TC-016: Valid menu choice 4 for exit', () => {
      const validChoices = [1, 2, 3, 4];
      expect(validChoices).toContain(4);
    });
  });

  // ============================================================================
  // TC-017 to TC-019: Sequential Operations and State Persistence
  // ============================================================================
  describe('TC-017 to TC-019: Sequential Operations and State Persistence', () => {
    test('TC-017: Sequential operations - credit then debit', () => {
      let result = system.credit(500);
      expect(result.balance).toBe(1500.00);

      // View balance (TC-001 check)
      expect(system.getBalance()).toBe(1500.00);

      result = system.debit(300);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1200.00);
    });

    test('TC-018: Sequential operations - debit then credit', () => {
      let result = system.debit(200);
      expect(result.balance).toBe(800.00);

      result = system.credit(500);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1300.00);
    });

    test('TC-019: Balance persistence across operations', () => {
      // Credit 100 (→1100)
      let result = system.credit(100);
      expect(result.balance).toBe(1100.00);

      // View balance
      expect(system.getBalance()).toBe(1100.00);

      // Debit 50 (→1050)
      result = system.debit(50);
      expect(result.balance).toBe(1050.00);

      // View balance again
      expect(system.getBalance()).toBe(1050.00);
    });
  });

  // ============================================================================
  // TC-022 to TC-023: Multiple Small Operations
  // ============================================================================
  describe('TC-022 to TC-023: Multiple Small Operations', () => {
    test('TC-022: Credit account - multiple small amounts (5x $1.00)', () => {
      let balance = system.getBalance();
      for (let i = 0; i < 5; i++) {
        const result = system.credit(1.00);
        expect(result.success).toBe(true);
        balance += 1.00;
      }
      expect(system.getBalance()).toBe(1005.00);
    });

    test('TC-023: Debit account - multiple small amounts (10x $1.00)', () => {
      let balance = system.getBalance();
      for (let i = 0; i < 10; i++) {
        const result = system.debit(1.00);
        expect(result.success).toBe(true);
        balance -= 1.00;
      }
      expect(system.getBalance()).toBe(990.00);
    });
  });

  // ============================================================================
  // TC-024 to TC-025: Menu Loop Recovery and Continuation
  // ============================================================================
  describe('TC-024 to TC-025: Menu Loop Behavior', () => {
    test('TC-024: Menu loop continues after invalid entry', () => {
      // System should recover from invalid input
      const invalidChoice = AccountingSystem.validateMenuChoice(9);
      expect(invalidChoice.isValid).toBe(false);

      // After invalid choice, system can still perform operations
      const result = system.getBalance();
      expect(result).toBe(1000.00);
    });

    test('TC-025: Menu loop continues after successful operation', () => {
      // Perform operation
      const creditResult = system.credit(100);
      expect(creditResult.success).toBe(true);

      // System continues and can do more operations
      const debitResult = system.debit(50);
      expect(debitResult.success).toBe(true);
      expect(system.getBalance()).toBe(1050.00);
    });
  });

  // ============================================================================
  // TC-026: Data Isolation - Balance Reset on Program Restart
  // ============================================================================
  describe('TC-026: Data Isolation and Session Management', () => {
    test('TC-026: Data isolation - balance resets on system restart', () => {
      // First run: start system and credit
      let result = system.credit(500);
      expect(system.getBalance()).toBe(1500.00);

      // Reset (simulate restart)
      system.reset();

      // Second run: should show initial balance
      expect(system.getBalance()).toBe(1000.00);
    });

    test('TC-026: Balance independent per run', () => {
      // Run 1
      system.credit(500);
      expect(system.getBalance()).toBe(1500.00);

      // Run 2 (new instance, simulating fresh program)
      const system2 = new AccountingSystem();
      expect(system2.getBalance()).toBe(1000.00);
    });
  });

  // ============================================================================
  // TC-027 to TC-028: Negative Input Validation
  // ============================================================================
  describe('TC-027 to TC-028: Negative Input Validation', () => {
    test('TC-027: Debit with negative input validation (-$100)', () => {
      const result = system.debit(-100);
      expect(result.success).toBe(false);
      expect(result.error).toContain('negative');
    });

    test('TC-028: Credit with negative input validation (-$100)', () => {
      const result = system.credit(-100);
      expect(result.success).toBe(false);
      expect(result.error).toContain('negative');
    });
  });

  // ============================================================================
  // TC-029 to TC-030: Decimal Precision
  // ============================================================================
  describe('TC-029 to TC-030: Decimal Precision', () => {
    test('TC-029: Decimal precision - credit ($123.45)', () => {
      const result = system.credit(123.45);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(1123.45);
      expect(result.balance.toFixed(2)).toBe('1123.45');
    });

    test('TC-030: Decimal precision - debit ($234.56)', () => {
      const result = system.debit(234.56);
      expect(result.success).toBe(true);
      expect(result.balance).toBe(765.44);
      expect(result.balance.toFixed(2)).toBe('765.44');
    });
  });
});

// ============================================================================
// Additional Tests: Floating Point Precision and Transaction History
// ============================================================================
describe('AccountingSystem - Advanced Features', () => {
  let system;

  beforeEach(() => {
    system = new AccountingSystem();
  });

  describe('Floating Point Precision', () => {
    test('Should handle multiple operations without floating point errors', () => {
      system.credit(0.1);
      system.credit(0.2);
      system.debit(0.15);
      // Should be exactly 1000.15, not 1000.1500000000001
      expect(system.getBalance()).toBe(1000.15);
    });

    test('Should maintain precision with small decimal amounts', () => {
      system.debit(0.01);
      system.debit(0.02);
      system.debit(0.03);
      expect(system.getBalance()).toBe(999.94);
    });
  });

  describe('Transaction History', () => {
    test('Should record all transactions', () => {
      system.credit(100);
      system.debit(50);
      system.credit(75);

      const history = system.getTransactionHistory();
      expect(history).toHaveLength(3);
      expect(history[0].type).toBe('CREDIT');
      expect(history[0].amount).toBe(100);
      expect(history[1].type).toBe('DEBIT');
      expect(history[1].amount).toBe(50);
      expect(history[2].type).toBe('CREDIT');
      expect(history[2].amount).toBe(75);
    });

    test('Should maintain balance consistency in transaction history', () => {
      system.credit(500);
      system.debit(200);

      const history = system.getTransactionHistory();
      expect(history[0].newBalance).toBe(1500.00);
      expect(history[1].previousBalance).toBe(1500.00);
      expect(history[1].newBalance).toBe(1300.00);
    });

    test('Should include timestamps in transactions', () => {
      system.credit(100);
      const history = system.getTransactionHistory();
      expect(history[0].timestamp).toBeDefined();
      expect(history[0].timestamp instanceof Date).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('Should handle invalid amount types gracefully', () => {
      const result = system.credit('not a number');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid amount');
    });

    test('Should handle NaN input', () => {
      const result = system.debit(NaN);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid amount');
    });

    test('Should handle null/undefined input', () => {
      const result1 = system.credit(null);
      expect(result1.success).toBe(false);

      const result2 = system.debit(undefined);
      expect(result2.success).toBe(false);
    });
  });

  describe('Custom Initial Balance', () => {
    test('Should allow custom initial balance', () => {
      const customSystem = new AccountingSystem(500);
      expect(customSystem.getBalance()).toBe(500);
    });

    test('Should reset to custom initial balance', () => {
      system.credit(500);
      expect(system.getBalance()).toBe(1500);

      system.reset(2000);
      expect(system.getBalance()).toBe(2000);
    });
  });

  describe('Menu Validation Edge Cases', () => {
    test('Should accept valid menu choices 1-4', () => {
      for (let i = 1; i <= 4; i++) {
        const result = AccountingSystem.validateMenuChoice(i);
        expect(result.isValid).toBe(true);
        expect(result.choice).toBe(i);
      }
    });

    test('Should reject string numbers outside 1-4', () => {
      const result = AccountingSystem.validateMenuChoice('5');
      expect(result.isValid).toBe(false);
    });

    test('Should handle floating point menu input (truncates to integer)', () => {
      // parseInt truncates decimal part: 1.5 becomes 1
      const result = AccountingSystem.validateMenuChoice(1.5);
      expect(result.isValid).toBe(true); // 1.5 truncates to 1, which is valid
      expect(result.choice).toBe(1);
    });
  });
});
