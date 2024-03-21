module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: [
    'eslint-config-airbnb-base',
  ],
  rules: {
    'no-console': 'off',
  },
};
