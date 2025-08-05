const base = require('./base')
const common = require('./rules/common')

module.exports = [
  ...base,
  {
    rules: {
      // enforce a maximum function length
      // TODO: Remove this one?
      'max-lines-per-function': [
        'warn',
        {
          max: 50,
          skipBlankLines: false,
          skipComments: false,
          IIFEs: false,
        },
      ],

      // limits the number of parameters that can be used in the function declaration.
      // TODO: Definitely remove this one
      'max-params': ['warn', { max: 4 }],

      // Disallows assigning `any` to variables and properties
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // Disallows calling (function calls) on an `any` type value.
      '@typescript-eslint/no-unsafe-call': 'off',
      // Disallows member access on an `any` type value.
      '@typescript-eslint/no-unsafe-member-access': 'off',
      // Disallows returning an `any` type value from a function.
      '@typescript-eslint/no-unsafe-return': 'off',

      // This rule aims to standardize the use of type assertion style across the codebase.
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
      ],
    },
  },
  {
    files: common.testPaths,
    rules: {
      // describe blocks count as a function in Mocha tests, and can be insanely long
      'max-lines-per-function': 'off',
    },
  },
]
