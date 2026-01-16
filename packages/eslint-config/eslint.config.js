import baseConfig from './base.js'

export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/unambiguous': 'off',
      'import/no-commonjs': 'off',
      'import/no-unused-modules': 'off',
      // Allow anonymous default exports in ESLint config files
      'import/no-anonymous-default-export': 'off',
    },
  },
  // Override for this package only: ESM requires .js extensions for relative imports
  {
    files: ['*.js', 'rules/**/*.js'],
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          mjs: 'always',
        },
      ],
    },
  },
]
