const commentsConfig = require('@eslint-community/eslint-plugin-eslint-comments/configs')

module.exports = [
  commentsConfig.recommended,
  {
    rules: {
      /* BEST PRACTICES */

      // Require a eslint-enable comment for every eslint-disable comment
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/disable-enable-pair.html
      '@eslint-community/eslint-comments/disable-enable-pair': [
        'error',
        { allowWholeFile: true },
      ],

      // Disallow a eslint-enable comment for multiple eslint-disable comments
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-aggregating-enable.html
      // TODO: Disable this rule?
      '@eslint-community/eslint-comments/no-aggregating-enable': 'error',

      // Disallow duplicate eslint-disable comments
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-duplicate-disable.html
      '@eslint-community/eslint-comments/no-duplicate-disable': 'error',

      // Disallow eslint-disable comments without rule names
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-unlimited-disable.html
      '@eslint-community/eslint-comments/no-unlimited-disable': 'error',

      // Disallow unused eslint-disable comments
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html
      '@eslint-community/eslint-comments/no-unused-disable': 'error',

      // Disallow unused eslint-enable comments
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-unused-enable.html
      '@eslint-community/eslint-comments/no-unused-enable': 'error',

      /* STYLISTIC ISSUES */

      // Disallow ESLint directive-comments
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-use.html
      '@eslint-community/eslint-comments/no-use': [
        'error',
        {
          allow: [
            'eslint-enable',
            'eslint-disable',
            'eslint-disable-next-line',
          ],
        },
      ],

      // Require include descriptions in ESLint directive-comments
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/require-description.html
      '@eslint-community/eslint-comments/require-description': [
        'error',
        { ignore: ['eslint-enable'] },
      ],

      /* DISABLED RULES */

      // Disallow eslint-disable comments about specific rules
      // https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-restricted-disable.html
      // This rule could be useful if we wanted to make it impossible to disable certain rules
      '@eslint-community/eslint-comments/no-restricted-disable': 'off',
    },
  },
]
