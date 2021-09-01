const common = require('./common')

module.exports = {
  env: {
    node: true, // Enable node global variables & Node.js scoping
    es2020: true, // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
  },
  parserOptions: {
    sourceType: 'module',
  },

  // Allows running prettier as an ESLint rule, and reporting differences as individual linting issues
  plugins: ['prettier'],

  // TODO: Add prettier/@typescript-eslint or others?
  // https://github.com/prettier/eslint-config-prettier#installation
  extends: [
    // Disable reporting on rules that Prettier will auto-fix
    'prettier',
  ],

  // These rules are disabled by default, but can be enabled as long as you have read documentation (which I have).
  rules: {
    // Rule for Prettier plugin to error on Prettier errors
    'prettier/prettier': 'error',

    // Require Following Curly Brace Convention
    // https://eslint.org/docs/rules/curly
    curly: ['error', 'all'],

    // require empty lines around comments
    // https://eslint.org/docs/rules/lines-around-comment
    // TODO: I'd like to enable this, but we probably need a TS-enabled version:
    // https://github.com/typescript-eslint/typescript-eslint/issues/1933
    'lines-around-comment': [
      'off',
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
        allowClassStart: true,
        allowClassEnd: true,
      },
    ],

    // Disallow arrow functions where they could be confused with comparisons
    // https://eslint.org/docs/rules/no-confusing-arrow
    'no-confusing-arrow': ['error', { allowParens: false }],

    // Some style guides don't allow the use of tab characters at all, including within comments.
    // https://eslint.org/docs/rules/no-tabs
    'no-tabs': 'warn',

    // Usually, Prettier takes care of following a maximum line length automatically.
    // However, there are cases where Prettier can’t do anything, such as for long strings, regular expressions and comments.
    // If you’d like to enforce an even stricter maximum line length policy than Prettier can provide automatically, you can enable this rule.
    // Just remember to keep max-len’s options and Prettier’s printWidth option in sync.
    // TODO: Make this an error?
    // https://eslint.org/docs/rules/max-len
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        // I like the idea of comments being 1.5 * code,
        // but in practice, I had a lot of comments that were ~126 or 127 lines,
        // and making them shorter didn't actually look like an improvement.
        comments: 130,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],

    /* DISABLED RULES */

    /* 'arrow-body-style' and 'prefer-arrow-callback' might cause problems if using eslint-plugin-prettier and --fix. */
    // Require braces in arrow function body
    // https://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': 'off',

    // Require using arrow functions for callbacks
    // https://eslint.org/docs/rules/prefer-arrow-callback
    // 'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
    'prefer-arrow-callback': 'off',

    // Disallow mixes of different operators
    // var foo = a && b || c || d;    /*BAD */
    // var foo = (a && b) || c || d;  /*GOOD*/
    // var foo = a && (b || c || d);  /*GOOD*/
    // However, Prettier removes unnecessary parentheses, so it doesn't work well with this rule.
    // https://eslint.org/docs/rules/no-mixed-operators
    'no-mixed-operators': 'off',

    // disallow confusing multiline expressions
    // If you do enable this rule, you have to run ESLint and Prettier as two separate steps (and ESLint first) in order to get any value out of it.
    // Otherwise Prettier might reformat your code in such a way that ESLint never gets a chance to report anything.
    // https://eslint.org/docs/rules/no-unexpected-multiline
    'no-unexpected-multiline': 'off',

    // Disallow Use of the Comma Operator
    // The no-sequences rule allows comma operators if the expression sequence is explicitly wrapped in parentheses.
    // Since Prettier automatically wraps them in parentheses, you might never see any warnings from ESLint about comma operators.
    // https://eslint.org/docs/rules/no-sequences
    'no-sequences': 'off',
  },

  overrides: [
    {
      files: common.testPaths,
      rules: {
        // In test files, we often have line comments in the middle of a pipeline of assertions/expectations
        // So, disable requiring an empty line before line comments in test files, so as to not "break" the pipeline.
        // https://eslint.org/docs/rules/lines-around-comment
        'lines-around-comment': [
          'error',
          {
            beforeBlockComment: true,
            afterBlockComment: false,
            beforeLineComment: false,
            afterLineComment: false,
            allowBlockStart: true,
            allowBlockEnd: true,
            allowObjectStart: true,
            allowObjectEnd: true,
            allowArrayStart: true,
            allowArrayEnd: true,
            allowClassStart: true,
            allowClassEnd: true,
          },
        ],
      },
    },
  ],
}
