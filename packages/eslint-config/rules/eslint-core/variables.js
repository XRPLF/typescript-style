const confusingBrowserGlobals = require('confusing-browser-globals')

module.exports = [
  {
    rules: {
      // disallow deletion of variables
      // https://eslint.org/docs/rules/no-delete-var
      'no-delete-var': 'error',

      // disallow labels that share a name with a variable
      // https://eslint.org/docs/rules/no-label-var
      'no-label-var': 'error',

      // disallow specific globals
      // https://eslint.org/docs/rules/no-restricted-globals
      'no-restricted-globals': ['error', 'isFinite', 'isNaN'].concat(
        confusingBrowserGlobals,
      ),

      // disallow declaration of variables already declared in the outer scope
      // https://eslint.org/docs/rules/no-shadow
      'no-shadow': ['error', { builtinGlobals: true, hoist: 'functions' }],

      // disallow shadowing of names such as arguments
      // https://eslint.org/docs/rules/no-shadow-restricted-names
      'no-shadow-restricted-names': 'error',

      // disallow use of undeclared variables unless mentioned in a /*global */ block
      // https://eslint.org/docs/rules/no-undef
      // Checked by TypeScript in --strict mode: https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/eslint-recommended.ts
      'no-undef': ['error', { typeof: true }],

      // disallow use of undefined when initializing variables
      // https://eslint.org/docs/rules/no-undef-init
      'no-undef-init': 'error',

      // disallow declaration of variables that are not used in the code.
      // This is disabled & supplemented by `@typescript-eslint`.
      // https://eslint.org/docs/rules/no-unused-vars
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],

      // disallow use of variables before they are defined
      // This is disabled & supplemented by `@typescript-eslint`.
      // https://eslint.org/docs/rules/no-use-before-define
      'no-use-before-define': ['error', { functions: false }],

      /* DISABLED RULES */
      // enforce or disallow variable initializations at definition
      // I can't think of when you would _ever_ want to use this rule.
      // https://eslint.org/docs/rules/init-declarations
      'init-declarations': 'off',

      // disallow use of undefined variable
      // https://eslint.org/docs/rules/no-undefined
      // (Handled by no-global-assign and no-shadow-restricted-names)
      'no-undefined': 'off',
    },
  },
]
