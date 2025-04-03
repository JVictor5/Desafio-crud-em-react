import type { Config } from "jest";

const config: Config = {
  rootDir: ".",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss|sass)$": "<rootDir>/src/tests/mocks/styleMock.js",
    "^.+\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/tests/mocks/fileMock.js",
  },
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
