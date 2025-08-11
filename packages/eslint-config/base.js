const eslint = require('@eslint/js')
const globals = require('globals')

const typescriptEslint = require('./rules/@typescript-eslint')
const arrayFunc = require('./rules/array-func').default
const comments = require('./rules/eslint-comments')
const bestPractices = require('./rules/eslint-core/best-practices')
const errors = require('./rules/eslint-core/errors')
const es6 = require('./rules/eslint-core/es6')
const strict = require('./rules/eslint-core/strict')
const style = require('./rules/eslint-core/style')
const variables = require('./rules/eslint-core/variables')
const importRules = require('./rules/import')
const jsdoc = require('./rules/jsdoc')
const node = require('./rules/node')
const prettier = require('./rules/prettier')
const tsdoc = require('./rules/tsdoc')

module.exports = [
  eslint.configs.recommended,
  ...errors,
  ...bestPractices,
  ...strict,
  ...variables,
  ...style,
  ...es6,
  ...comments,
  ...typescriptEslint,
  ...jsdoc,
  ...tsdoc,
  ...node,
  ...importRules,
  arrayFunc,
  ...prettier,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.es2020,
      },

      parserOptions: {
        ecmaFeatures: {
          // Enable global strict mode
          impliedStrict: true,
        },
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
      reportUnusedInlineConfigs: 'warn',
    },
  },
]
