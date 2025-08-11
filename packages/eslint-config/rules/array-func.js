const { FlatCompat } = require('@eslint/eslintrc')
const arrayFunc = require('eslint-plugin-array-func')

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

module.exports = compat.config(arrayFunc.configs.all)
