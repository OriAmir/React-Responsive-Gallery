/* eslint-disable no-undef */

module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended", // @typescript-eslint/eslint-plugin(part of react-scripts)
    "plugin:prettier/recommended", // eslint-plugin-prettier
    "prettier", // eslint-config-prettier
  ],
  plugins: [
    "prettier", // eslint-plugin-prettier
    "testing-library", //eslint-plugin-testing-library
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
};
