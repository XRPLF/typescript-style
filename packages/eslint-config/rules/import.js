const common = require('./common')
const importPlugin = require('eslint-plugin-import')
const globals = require('globals')

const baseConfig = {
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

  rules: {
    /* STATIC ANALYSIS */

    // Ensures an imported module can be resolved to a module on the local filesystem,
    // as defined by standard Node require.resolve behavior.
    // https://github.com/benmosher/eslint-plugin-import/blob/3aefa79f167b998485733a1d7f9ba53b8d5bcc80/docs/rules/no-unresolved.md
    'import/no-unresolved': ['error', { commonjs: true }],

    // Forbid import of modules using absolute paths
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
    'import/no-absolute-path': 'error',

    // Forbid require() calls with expressions
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-dynamic-require.md
    'import/no-dynamic-require': 'error',

    // Forbid Webpack loader syntax in imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md
    'import/no-webpack-loader-syntax': 'error',

    // Forbid a module from importing itself
    // https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/no-self-import.md
    'import/no-self-import': 'error',

    // Forbid cyclical dependencies between modules
    // https://github.com/benmosher/eslint-plugin-import/blob/d81f48a2506182738409805f5272eff4d77c9348/docs/rules/no-cycle.md
    'import/no-cycle': 'error',

    // Ensures that there are no useless path segments
    // https://github.com/benmosher/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/no-useless-path-segments.md
    'import/no-useless-path-segments': 'error',

    // Reports modules without any exports, or with unused exports
    // https://github.com/benmosher/eslint-plugin-import/blob/f63dd261809de6883b13b6b5b960e6d7f42a7813/docs/rules/no-unused-modules.md
    'import/no-unused-modules': [
      'warn',
      {
        missingExports: true,
        unusedExports: true,
      },
    ],

    /* HELPFUL WARNINGS */

    // Reports funny business with exports, like repeated exports of names or defaults.
    // https://github.com/benmosher/eslint-plugin-import/blob/3aefa79f167b998485733a1d7f9ba53b8d5bcc80/docs/rules/export.md
    'import/export': 'error',

    // Reports use of an exported name as the locally imported name of a default export.
    // https://github.com/benmosher/eslint-plugin-import/blob/3aefa79f167b998485733a1d7f9ba53b8d5bcc80/docs/rules/no-named-as-default.md
    'import/no-named-as-default': 'error',

    // disallow use of jsdoc-marked-deprecated imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-deprecated.md
    'import/no-deprecated': 'warn',

    // Forbid the use of extraneous packages
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': 'error',

    // Forbid mutable exports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
    'import/no-mutable-exports': 'error',

    /* MODULE SYSTEMS */

    // Warn if a module could be mistakenly parsed as a script by a consumer leveraging Unambiguous JavaScript Grammar
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/unambiguous.md
    'import/unambiguous': 'error',

    // disallow require()
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-commonjs.md
    'import/no-commonjs': 'error',

    // disallow AMD require/define
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-amd.md
    'import/no-amd': 'error',

    /* STYLE GUIDE */

    // disallow non-import statements appearing before import statements
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    'import/first': 'error',

    // Reports if a resolved path is imported more than once.
    // https://github.com/benmosher/eslint-plugin-import/blob/3aefa79f167b998485733a1d7f9ba53b8d5bcc80/docs/rules/no-duplicates.md
    'import/no-duplicates': ['error', { considerQueryString: true }],

    // Ensure consistent use of file extension within the import path
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],

    // ensure absolute imports are above relative imports and that unassigned imports are ignored
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Require newlines after the last import/require in a group
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
    'import/newline-after-import': ['error', { count: 1 }],

    // Require modules with a single export to use a default export
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'error',

    // Don't warn when modules have too many dependencies
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/max-dependencies.md
    'import/max-dependencies': 'off',

    // Prevent unassigned imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-unassigned-import.md
    // importing for side effects is perfectly acceptable, if you need side effects.
    'import/no-unassigned-import': [
      'warn',
      {
        allow: ['**/*.css', '**/*.scss'],
      },
    ],

    // Prevent importing the default as if it were named
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-default.md
    'import/no-named-default': 'error',

    // Reports if a module's default export is unnamed
    // https://github.com/benmosher/eslint-plugin-import/blob/d9b712ac7fd1fddc391f7b234827925c160d956f/docs/rules/no-anonymous-default-export.md
    'import/no-anonymous-default-export': [
      'error',
      {
        allowArray: false,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowLiteral: false,
        allowObject: false,
      },
    ],

    // dynamic imports require a leading comment with a webpackChunkName
    // https://github.com/benmosher/eslint-plugin-import/blob/ebafcbf59ec9f653b2ac2a0156ca3bcba0a7cf57/docs/rules/dynamic-import-chunkname.md
    'import/dynamic-import-chunkname': 'warn',

    /* DISABLED RULES */

    // These rules are checked by TypeScript as part of standard type-checking
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
    'import/named': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default-member': 'off',

    // Enforces that all exports are declared at the bottom of the file
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/exports-last.md
    'import/exports-last': 'off',

    // Reports when named exports are not grouped together in a single export declaration
    // or when multiple assignments to CommonJS module.exports or exports object are present
    // in a single file.
    // https://github.com/benmosher/eslint-plugin-import/blob/44a038c06487964394b1e15b64f3bd34e5d40cde/docs/rules/group-exports.md
    'import/group-exports': 'off',

    // Prohibit default exports. Mostly an inverse of prefer-default-export.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-default-export.md
    'import/no-default-export': 'off',

    // Note: This is a TERRIBLE rule.
    // Prohibit named exports. Mostly an inverse of no-default-export.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-export.md
    'import/no-named-export': 'off',

    // Note: This is a TERRIBLE rule.
    // Use this rule to prevent importing the submodules of other modules.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-internal-modules.md
    'import/no-internal-modules': 'off',

    // Note: Decent rule, but some JS libraries require using a wildcard import.
    // Enforce a convention of not using namespace (a.k.a. "wildcard" *) imports.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-namespace.md
    'import/no-namespace': 'off',

    // Forbid the use of Node.js builtin modules. Can be useful for client-side web
    // projects that do not have access to those modules.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-nodejs-modules.md
    'import/no-nodejs-modules': 'off',

    // Use this rule to prevent imports to folders in relative parent paths.
    // This rule is useful for enforcing tree-like folder structures instead of complex graph-like folder structures.
    // While this restriction might be a departure from Node's default resolution style,
    // it can lead large, complex codebases to be easier to maintain.
    // If you've ever had debates over "where to put files" this rule is for you.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-relative-parent-imports.md
    // TODO: Enable this rule later to `warn`?
    'import/no-relative-parent-imports': 'off',

    // Some projects contain files which are not always meant to be executed in the same environment.
    // For example consider a web application that contains specific code for the server and
    // some specific code for the browser/client.
    // In this case you don’t want to import server-only files in your client code.
    // In order to prevent such scenarios this rule allows you to define restricted zones where
    // you can forbid files from imported if they match a specific path.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-restricted-paths.md
    'import/no-restricted-paths': 'off',
  },
}

const overrides = [
  {
    files: ['src/index.ts'],
    rules: {
      // In SDKs, we export stuff that isn't used by the library itself,
      // for consumption in other libraries/apps.
      'import/no-unused-modules': 'off',
    },
  },
  {
    files: common.testPaths,
    rules: {
      // Our Mocha test files never export anything.
      'import/no-unused-modules': 'off',

      // Importing mocha is a side-effecting import
      'import/no-unassigned-import': ['error', { allow: ['mocha'] }],
    },
  },
  {
    files: common.typeDeclarationPaths,
    rules: {
      // Declaration files could allegedly be parsed as a valid script according to eslint-plugin-import.
      'import/unambiguous': 'off',

      // Declaration files are often used in SDKs for consumption by
      // external users.
      'import/no-unused-modules': 'off',
    },
  },
]

module.exports = [importPlugin.flatConfigs.typescript, baseConfig, ...overrides]
