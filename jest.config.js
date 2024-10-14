module.exports = {
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
      '\\.svg$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/client/src/setupTests.js'],
  };
  