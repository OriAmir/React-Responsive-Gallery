module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/__mock__/svg-mock.cjs",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!yet-another-react-lightbox/)",
  ],
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mock__/style-mock.cjs",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
