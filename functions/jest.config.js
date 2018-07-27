module.exports = {
  "testEnvironment": "node",
  "roots": [
      "<rootDir>"
  ],
  "transform": {
      "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "collectCoverageFrom": ["src/**/*.{ts,js}"],
  "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
  ],
}