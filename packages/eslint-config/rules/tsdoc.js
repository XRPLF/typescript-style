const tsdocPlugin = require('eslint-plugin-tsdoc')

module.exports = [
  {
    plugins: {
      tsdoc: tsdocPlugin,
    },

    rules: {
      'tsdoc/syntax': 'warn',
    },
  },
]
