const globals = require('globals')

module.exports = [
  {
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.es2020,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },

  ...require('./rules/eslint-core/errors'),
  ...require('./rules/eslint-core/best-practices'),
  ...require('./rules/eslint-core/strict'),
  ...require('./rules/eslint-core/variables'),
  ...require('./rules/eslint-core/style'),
  ...require('./rules/eslint-core/es6'),
  ...require('./rules/eslint-comments'),
  ...require('./rules/@typescript-eslint'),
  ...require('./rules/jsdoc'),
  ...require('./rules/tsdoc'),
  ...require('./rules/node'),
  ...require('./rules/import'),
  //...require('./rules/array-func'),
  ...require('./rules/prettier'),
]
