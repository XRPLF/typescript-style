const nodePlugin = require('eslint-plugin-n')

const common = require('./common')

module.exports = [
  nodePlugin.configs['flat/recommended'],
  {
    settings: {
      n: {
        tryExtensions: ['.js', '.ts', '.json', '.node'],
      },
    },

    plugins: { n: nodePlugin },

    rules: {
      /* POSSIBLE ERRORS */

      // Require error handling in callbacks
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/handle-callback-err.md
      'n/handle-callback-err': ['error', '^(error|.+Error)$'],

      // Ensure Node.js-style error-first callback pattern is followed
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-callback-literal.md
      'n/no-callback-literal': 'error',

      // Disallow the assignment to exports
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-exports-assign.md
      'n/no-exports-assign': 'error',

      // Disallow import declarations which import extraneous modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-extraneous-import.md
      'n/no-extraneous-import': 'error',

      // Disallow require() expressions which import extraneous modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-extraneous-require.md
      'n/no-extraneous-require': 'error',

      // Disallow require() expressions which import non-existent modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-missing-require.md
      'n/no-missing-require': 'error',

      // Disallow new operators with calls to require
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-new-require.md
      'n/no-new-require': 'error',

      // Disallow string concatenation with __dirname and __filename
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-path-concat.md
      'n/no-path-concat': 'error',

      // Disallow the use of process.exit()
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-exit.md
      'no-process-exit': 'off',
      'n/no-process-exit': 'error',

      // Disallow bin files that npm ignores
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-bin.md
      'n/no-unpublished-bin': 'error',

      // Disallow import declarations which import private modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-import.md
      'n/no-unpublished-import': 'error',

      // Disallow require() expressions which import private modules
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unpublished-require.md
      'n/no-unpublished-require': 'error',

      // Disallow unsupported ECMAScript built-ins on the specified version
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-builtins.md
      'n/no-unsupported-features/es-builtins': [
        'error',
        {
          ignores: [],
        },
      ],

      // Disallow unsupported Node.js built-in APIs on the specified version
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/node-builtins.md
      'n/no-unsupported-features/node-builtins': [
        'error',
        {
          ignores: [],
        },
      ],

      // Make process.exit() expressions the same code path as throw
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/process-exit-as-throw.md
      'n/process-exit-as-throw': 'error',

      // Suggest correct usage of shebang
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/shebang.md
      'n/shebang': 'error',

      /* BEST PRACTICES */

      // Disallow deprecated APIs
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-deprecated-api.md
      'n/no-deprecated-api': [
        'error',
        {
          ignoreModuleItems: [],
          ignoreGlobalItems: [],
        },
      ],

      /* STYLISTIC ISSUES */
      // Require return statements after callbacks
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/callback-return.md
      'n/callback-return': 'error',

      // Enforce either module.exports or exports
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/exports-style.md
      'n/exports-style': [
        'error',
        'module.exports',
        {
          allowBatchAssign: false,
        },
      ],

      // Require require() calls to be placed at top-level module scope
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/global-require.md
      'n/global-require': 'error',

      // Disallow require calls to be mixed with regular variable declarations
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-mixed-requires.md
      'n/no-mixed-requires': ['error', { grouping: true, allowCall: false }],

      // Disallow the use of process.env
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-process-env.md
      'n/no-process-env': 'error',

      // Disallow synchronous methods
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-sync.md
      'n/no-sync': ['error', { allowAtRootLevel: false }],

      // Enforce either Buffer or require("buffer").Buffer
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/buffer.md
      'n/prefer-global/buffer': ['error', 'always'],

      // Enforce either console or require("console")
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/console.md
      'n/prefer-global/console': ['error', 'always'],

      // Enforce either process or require("process")
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/process.md
      'n/prefer-global/process': ['error', 'always'],

      // Enforce either TextDecoder or require("util").TextDecoder
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-decoder.md
      'n/prefer-global/text-decoder': ['error', 'always'],

      // Enforce either TextEncoder or require("util").TextEncoder
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/text-encoder.md
      'n/prefer-global/text-encoder': ['error', 'always'],

      // Enforce either URLSearchParams or require("url").URLSearchParams
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url-search-params.md
      'n/prefer-global/url-search-params': ['error', 'always'],

      // Enforce either URL or require("url").URL
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-global/url.md
      'n/prefer-global/url': ['error', 'always'],

      // Enforce require("dns").promises
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-promises/dns.md
      'n/prefer-promises/dns': 'error',

      // Enforce require("fs").promises
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/prefer-promises/fs.md
      'n/prefer-promises/fs': 'error',

      /* DISABLED RULES */

      // Disallow specified modules when loaded by import declarations
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-restricted-import.md
      'n/no-restricted-import': 'off',

      // Disallow specified modules when loaded by require
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-restricted-require.md
      'n/no-restricted-require': 'off',

      // Disallow unsupported ECMAScript syntax on the specified version
      // https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/no-unsupported-features/es-syntax.md
      // There is no way to ignore import/export statements right now,
      // which we use everywhere because... TypeScript
      'n/no-unsupported-features/es-syntax': [
        'off',
        {
          ignores: [],
        },
      ],
    },
  },
  {
    files: ['config.ts'],
    rules: {
      // We use process.env in our config files
      'n/no-process-env': 'off',
    },
  },
  {
    files: common.testPaths,
    rules: {
      // We import "unpublished" dependencies in test files (dev dependencies)
      'n/no-unpublished-import': 'off',
      'n/no-unpublished-require': 'off',
    },
  },
]
