const tsdocPlugin = require('eslint-plugin-tsdoc');

module.exports = [
  {
    languageOptions: {
      sourceType: "module",
    },

    plugins: {
      tsdoc: tsdocPlugin
    },

    rules: {
      'tsdoc/syntax': 'warn',
    },
  }
];