const nodePlugin = require('eslint-plugin-n')

const common = require('./common')

module.exports = [
  nodePlugin.configs['flat/recommended'],
  {
    settings: {
      node: {
        tryExtensions: ['.js', '.ts', '.json', '.node'],
      },
    },

    plugins: { node: nodePlugin },

    rules: {
      /* POSSIBLE ERRORS */

      // Require error handling in callbacks
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/handle-callback-err.md
      'node/handle-callback-err': ['error', '^(error|.+Error)$'],

      // Ensure Node.js-style error-first callback pattern is followed
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-callback-literal.md
      'node/no-callback-literal': 'error',

      // Disallow the assignment to exports
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-exports-assign.md
      'node/no-exports-assign': 'error',

      // Disallow import declarations which import extraneous modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-extraneous-import.md
      'node/no-extraneous-import': 'error',

      // Disallow require() expressions which import extraneous modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-extraneous-require.md
      'node/no-extraneous-require': 'error',

      // Disallow import declarations which import non-existent modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-import.md
      'node/no-missing-import': [
        2,
        {
          tryExtensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],

      // Disallow require() expressions which import non-existent modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-require.md
      'node/no-missing-require': 'error',

      // Disallow new operators with calls to require
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-new-require.md
      'node/no-new-require': 'error',

      // Disallow string concatenation with __dirname and __filename
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-path-concat.md
      'node/no-path-concat': 'error',

      // Disallow the use of process.exit()
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-exit.md
      'no-process-exit': 'off',
      'node/no-process-exit': 'error',

      // Disallow bin files that npm ignores
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-bin.md
      'node/no-unpublished-bin': 'error',

      // Disallow import declarations which import private modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-import.md
      'node/no-unpublished-import': 'error',

      // Disallow require() expressions which import private modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-require.md
      'node/no-unpublished-require': 'error',

      // Disallow unsupported ECMAScript built-ins on the specified version
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-builtins.md
      'node/no-unsupported-features/es-builtins': [
        'error',
        {
          version: '>=12.0.0',
          ignores: [],
        },
      ],

      // Disallow unsupported Node.js built-in APIs on the specified version
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/node-builtins.md
      'node/no-unsupported-features/node-builtins': [
        'error',
        {
          version: '>=12.0.0',
          ignores: [],
        },
      ],

      // Make process.exit() expressions the same code path as throw
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md
      'node/process-exit-as-throw': 'error',

      // Suggest correct usage of shebang
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/shebang.md
      'node/shebang': 'error',

      /* BEST PRACTICES */

      // Disallow deprecated APIs
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md
      'node/no-deprecated-api': [
        'error',
        {
          version: '>=12.0.0',
          ignoreModuleItems: [],
          ignoreGlobalItems: [],
        },
      ],

      /* STYLISTIC ISSUES */
      // Require return statements after callbacks
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/callback-return.md
      'node/callback-return': 'error',

      // Enforce either module.exports or exports
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/exports-style.md
      'node/exports-style': [
        'error',
        'module.exports',
        {
          allowBatchAssign: false,
        },
      ],

      // Enforce the style of file extensions in import declarations
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md
      'node/file-extension-in-import': [
        'error',
        'always',
        {
          '.js': 'never',
          '.jsx': 'never',
          '.ts': 'never',
          '.tsx': 'never',
        },
      ],

      // Require require() calls to be placed at top-level module scope
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/global-require.md
      'node/global-require': 'error',

      // Disallow require calls to be mixed with regular variable declarations
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-mixed-requires.md
      'node/no-mixed-requires': ['error', { grouping: true, allowCall: false }],

      // Disallow the use of process.env
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-env.md
      'node/no-process-env': 'error',

      // Disallow synchronous methods
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-sync.md
      'node/no-sync': ['error', { allowAtRootLevel: false }],

      // Enforce either Buffer or require("buffer").Buffer
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md
      'node/prefer-global/buffer': ['error', 'always'],

      // Enforce either console or require("console")
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/console.md
      'node/prefer-global/console': ['error', 'always'],

      // Enforce either process or require("process")
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md
      'node/prefer-global/process': ['error', 'always'],

      // Enforce either TextDecoder or require("util").TextDecoder
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-decoder.md
      'node/prefer-global/text-decoder': ['error', 'always'],

      // Enforce either TextEncoder or require("util").TextEncoder
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-encoder.md
      'node/prefer-global/text-encoder': ['error', 'always'],

      // Enforce either URLSearchParams or require("url").URLSearchParams
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url-search-params.md
      'node/prefer-global/url-search-params': ['error', 'always'],

      // Enforce either URL or require("url").URL
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url.md
      'node/prefer-global/url': ['error', 'always'],

      // Enforce require("dns").promises
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-promises/dns.md
      'node/prefer-promises/dns': 'error',

      // Enforce require("fs").promises
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-promises/fs.md
      'node/prefer-promises/fs': 'error',

      /* DISABLED RULES */

      // Disallow specified modules when loaded by import declarations
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-restricted-import.md
      'node/no-restricted-import': 'off',

      // Disallow specified modules when loaded by require
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-restricted-require.md
      'node/no-restricted-require': 'off',

      // Disallow unsupported ECMAScript syntax on the specified version
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
      // There is no way to ignore import/export statements right now,
      // which we use everywhere because... TypeScript
      'node/no-unsupported-features/es-syntax': [
        'off',
        {
          version: '>=12.0.0',
          ignores: [],
        },
      ],
    },
  },
  {
    files: ['config.ts'],
    rules: {
      // We use process.env in our config files
      'node/no-process-env': 'off',
    },
  },
  {
    files: common.testPaths,
    rules: {
      // We import "unpublished" dependencies in test files (dev dependencies)
      'node/no-unpublished-import': 'off',
      'node/no-unpublished-require': 'off',
    },
  },
]
