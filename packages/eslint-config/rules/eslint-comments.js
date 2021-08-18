module.exports = {
  env: {
    // Enable node global variables & Node.js scoping
    node: true,
    // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
    es2020: true,
  },
  parserOptions: {
    sourceType: 'module',
  },

  plugins: ['eslint-comments'],
  rules: {
    /* BEST PRACTICES */

    // Require a eslint-enable comment for every eslint-disable comment
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/disable-enable-pair.html
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],

    // Disallow a eslint-enable comment for multiple eslint-disable comments
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-aggregating-enable.html
    // TODO: Disable this rule?
    'eslint-comments/no-aggregating-enable': 'error',

    // Disallow duplicate eslint-disable comments
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-duplicate-disable.html
    'eslint-comments/no-duplicate-disable': 'error',

    // Disallow eslint-disable comments without rule names
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unlimited-disable.html
    'eslint-comments/no-unlimited-disable': 'error',

    // Disallow unused eslint-disable comments
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html
    'eslint-comments/no-unused-disable': 'error',

    // Disallow unused eslint-enable comments
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-unused-enable.html
    'eslint-comments/no-unused-enable': 'error',

    /* STYLISTIC ISSUES */

    // Disallow ESLint directive-comments
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-use.html
    'eslint-comments/no-use': [
      'error',
      {
        allow: ['eslint-enable', 'eslint-disable', 'eslint-disable-next-line'],
      },
    ],

    // Require include descriptions in ESLint directive-comments
    'eslint-comments/require-description': [
      'error',
      { ignore: ['eslint-enable'] },
    ],

    /* DISABLED RULES */

    // Disallow eslint-disable comments about specific rules
    // https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/no-restricted-disable.html
    // This rule could be useful if we wanted to make it impossible to disable certain rules
    'eslint-comments/no-restricted-disable': 'off',
  },

  overrides: [],
}
