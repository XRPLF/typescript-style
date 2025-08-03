const arrayFunc = require('eslint-plugin-array-func').default
const globals = require('globals')

module.exports = [
  arrayFunc.configs.all,
  {
    languageOptions: {
      sourceType: 'module',
      // Set the ecmaVersion parser option to ES2020
      ecmaVersion: 2020,
      globals: {
        // Enable ECMAScript 2020 globals, node global variables & Node.js scoping
        ...globals.node,
        ...globals.es2020,
      },
    },
  },
]
