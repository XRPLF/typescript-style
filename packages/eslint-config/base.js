import eslint from '@eslint/js'
import globals from 'globals'

import typescriptEslint from './rules/@typescript-eslint.js'
import arrayFunc from './rules/array-func.js'
import comments from './rules/eslint-comments.js'
import bestPractices from './rules/eslint-core/best-practices.js'
import errors from './rules/eslint-core/errors.js'
import es6 from './rules/eslint-core/es6.js'
import strict from './rules/eslint-core/strict.js'
import style from './rules/eslint-core/style.js'
import variables from './rules/eslint-core/variables.js'
import importRules from './rules/import.js'
import jsdoc from './rules/jsdoc.js'
import node from './rules/node.js'
import prettier from './rules/prettier.js'
import tsdoc from './rules/tsdoc.js'

export default [
  eslint.configs.recommended,
  ...errors,
  ...bestPractices,
  ...strict,
  ...variables,
  ...style,
  ...es6,
  ...comments,
  ...typescriptEslint,
  ...jsdoc,
  ...tsdoc,
  ...node,
  ...importRules,
  ...arrayFunc,
  ...prettier,
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.es2020,
      },

      parserOptions: {
        ecmaFeatures: {
          // Enable global strict mode
          impliedStrict: true,
        },
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
      reportUnusedInlineConfigs: 'warn',
    },
  },
]
