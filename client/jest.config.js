module.exports = {
  testEnvironment: "jsdom",

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JS/JSX/TS/TSX files with babel-jest
  },

  transformIgnorePatterns: [
    "/node_modules/(?!axios)/" // Ignore all node_modules except axios or other ES module dependencies
  ],

  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
