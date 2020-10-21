module.exports = {
    "setupFilesAfterEnv": ['<rootDir>/src/setupTests.ts'],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testRegex": "/*.test.tsx$",
    "collectCoverage": true,
    "coverageReporters": ["lcov"],
    "coverageDirectory": "test-coverage",
    "coverageThreshold": {
      "global": {
      "branches": 0,
      "functions": 0,
      "lines": 0,
      "statements": 0
      }
    },
    "moduleDirectories": ["node_modules", "src"],
    "moduleNameMapper": { "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"}
  }
