module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {   
     "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
     "comma-dangle": ["error", "never"],
     "react-hooks/rules-of-hooks": "error",
     "react-hooks/exhaustive-deps": "warn",
     "react/require-default-props": 0,
     "react/jsx-uses-react": "error",
     "no-debugger": 0,
     "react/forbid-prop-types":0,
     "import/no-named-as-default": 0,
     "import/prefer-default-export": 0
  },
};

