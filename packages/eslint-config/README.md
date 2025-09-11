# `@xrplf/eslint-config`

[![npm version](https://img.shields.io/npm/v/@xrplf/eslint-config.svg)](https://www.npmjs.com/package/@xrplf/eslint-config)
[![Downloads/month](https://img.shields.io/npm/dm/@xrplf/eslint-config.svg)](http://www.npmtrends.com/@xrplf/eslint-config)

A super-strict TypeScript linting configuration for enforcing best practices.

### Installation - eslint-config version >= 2.0.0

First, install the needed development dependencies:

```sh
# Ensure TypeScript and the TS ESLint packages are installed
npm install --save-dev typescript typescript-eslint
# Ensure ESLint & Prettier are installed
npm install --save-dev eslint prettier
# Install plugins used by @xrplf/eslint-config
npm install --save-dev @eslint/js @eslint-community/eslint-plugin-eslint-comments eslint-config-prettier eslint-plugin-array-func eslint-plugin-import eslint-plugin-jsdoc eslint-plugin-n eslint-plugin-prettier eslint-plugin-tsdoc globals prettier @eslint/eslintrc eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y

# Install the Xpring ESLint config
npm install --save-dev @xrplf/eslint-config
```

### Usage - (Flat config)

Then, configure your ESLint to use the Xpring configuration. An example ESLint configuration (eslint.config.js) is
provided
below:

```js
const globals = require('globals')
const eslintConfig = require('@xrplf/eslint-config/base')
const tseslint = require('typescript-eslint')

module.exports = [
    {
      ignores: [
        '**/node_modules/',
        '**/dist/',
        '**/build/',
        // Other directories/files to ignore for linting can be added here
      ],
    },
    ...eslintConfig, // Use @xrplf/eslint-config/base config.
    {
      languageOptions: {
        sourceType: 'module', // Allow the use of imports / ES modules
        ecmaVersion: 2020, // Indicates the ECMAScript version of the code being linted, determining both the syntax and the available global variables

        // Make ESLint compatible with TypeScript
        parser: tseslint.parser,
        parserOptions: {
          // Enable linting rules with type information from our tsconfig
          tsconfigRootDir: __dirname,
          project: [
            './tsconfig.eslint.json',
          ],
          ecmaFeatures: {
            impliedStrict: true, // Enable global strict mode
          },
        },
        // Specify global variables that are predefined
        globals: {
          ...globals.node,
          ...globals.es2020,
        },
      },

      // Specify additional plugins to use.
      plugins: {},

      // Rules additional rules to override.
      rules: {},
    },
    {
      // Specify overrides for specific files or directories
    }
]
```

### Installation - eslint-config version ^1.0.0

First, install the needed development dependencies:

```sh
# Ensure TypeScript and the TS ESLint parser are installed
npm install --save-dev typescript @typescript-eslint/parser
# Ensure ESLint & Prettier are installed
npm install --save-dev eslint prettier
# Install plugins used by @xrplf/eslint-config
npm install --save-dev @typescript-eslint/eslint-plugin eslint-plugin-import eslint-plugin-prettier eslint-plugin-jsdoc eslint-plugin-tsdoc eslint-plugin-array-func eslint-plugin-eslint-comments eslint-plugin-node

# Install the Xpring ESLint config
npm install --save-dev @xrplf/eslint-config
```

### Usage - (legacy config format)

Then, configure your ESLint to use the Xpring configuration. An example ESLint configuration is provided below:

```js
module.exports = {
  root: true,

  // Make ESLint compatible with TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Enable linting rules with type information from our tsconfig
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],

    // Allow the use of imports / ES modules
    sourceType: 'module',

    ecmaFeatures: {
      // Enable global strict mode
      impliedStrict: true,
    },
  },

  // Specify global variables that are predefined
  env: {
    node: true, // Enable node global variables & Node.js scoping
    es2020: true, // Add all ECMAScript 2020 globals and automatically set the ecmaVersion parser option to ES2020
  },

  plugins: [],
  extends: ['@xrplf'],
  rules: {},
  overrides: [],
}
```

### Recommended Configs

We provide four different configurations.

1) The main configuration is strict and assumes that the project you're
linting uses React. This is `@xrplf/eslint-config`, or `@xrplf` for short.

2) If you're not using React but still want strict checking you can use
`@xrplf/eslint-config/base`.

3) If you need a looser rule set for the purpose of transitioning onto the
strict rules and are using React you can use `@xrplf/eslint-config/loose`.

4) Finally, if you need the looser rule set and are not using react you can
use `@xrplf/eslint-config/loose-base`.

#### Loose Config

The looser configuration differs in the following ways:

- Longer line length limitation for functions
- More parameters allowed per function
- The very strict `no-unsafe-*` rules from `@typescript-eslint` are disabled
- Type assertions are allowed
