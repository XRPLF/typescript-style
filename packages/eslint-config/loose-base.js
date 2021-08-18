const common = require('./rules/common')

module.exports = {
  extends: ['./base'].map(require.resolve),
  rules: {
    // enforce a maximum function length
    // TODO: Remove this one?
    'max-lines-per-function': [
      'warn',
      {
        max: 50,
        skipBlankLines: false,
        skipComments: false,
        // eslint-disable-next-line @typescript-eslint/naming-convention -- `IIFEs` is a key from the plugin
        IIFEs: false,
      },
    ],

    // Warn when modules have too many dependencies (code smell)
    // TODO: Remove this one?
    'import/max-dependencies': ['warn', { max: 8 }],

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

  overrides: [
    {
      files: common.testPaths,
      rules: {
        // Warn when modules have too many dependencies (code smell)
        // Increased the max for test files and test helper files, since tests usually need to import more things
        'import/max-dependencies': ['warn', { max: 8 }],

        // describe blocks count as a function in Mocha tests, and can be insanely long
        'max-lines-per-function': 'off',
      },
    },
  ],
}
