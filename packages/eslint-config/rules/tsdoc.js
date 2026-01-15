import tsdocPlugin from 'eslint-plugin-tsdoc'

export default [
  {
    plugins: {
      tsdoc: tsdocPlugin,
    },

    rules: {
      'tsdoc/syntax': 'warn',
    },
  },
]
