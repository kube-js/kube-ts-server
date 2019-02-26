module.exports = {
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  transform: {
    ".(ts|js)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testEnvironment: "node",
  bail: true,
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["<rootDir>/src/**/*.(test|spec).(ts|js)"]
};
