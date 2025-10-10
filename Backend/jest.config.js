module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  collectCoverageFrom: ["controller/**/*.js", "routes/**/*.js", "utils/**/*.js"],
};
