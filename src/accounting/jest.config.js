module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'accountingSystem.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  coverageReporters: [
    'text',
    'lcov',
    'html',
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js',
  ],
};
