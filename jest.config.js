module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/data/(.*)$": "<rootDir>/data/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/", "<rootDir>/src/__tests__/e2e/"],
  transform: {
    "^.+\\.(ts|tsx)$": ["@swc/jest", {
      "jsc": {
        "parser": {
          "syntax": "typescript",
          "tsx": true
        },
        "transform": {
          "react": {
            "runtime": "automatic"
          }
        }
      }
    }],
  },
};
