module.exports = {
  parserOptions: {
    // Allow the use of imports / ES modules
    sourceType: 'module',
    ecmaFeatures: {
      // Enable global strict mode
      impliedStrict: true,
    },
  },

  // Specify global variables that are predefined
  env: {
    // Enable node global variables & Node.js scoping
    node: true,
    // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
    es2020: true,
  },

  extends: ['airbnb/base'].concat(
    [
      './rules/eslint-core/errors',
      './rules/eslint-core/best-practices',
      './rules/eslint-core/strict',
      './rules/eslint-core/variables',
      './rules/eslint-core/style',
      './rules/eslint-core/es6',
      './rules/eslint-comments',
      './rules/@typescript-eslint',
      './rules/consistent-default-export-name',
      './rules/jsdoc',
      './rules/tsdoc',
      './rules/node',
      './rules/import',
      './rules/array-func',
      './rules/prettier',
    ].map(require.resolve),
  ),
  rules: {},

  reportUnusedDisableDirectives: true,
}
