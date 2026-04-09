module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/data/(.*)$": "<rootDir>/data/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
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
