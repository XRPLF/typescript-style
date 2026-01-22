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
    },
  },
  // Overrides for this package only
  {
    files: ['*.js', 'rules/**/*.js'],
    rules: {
      // ESM requires .js extensions for relative imports
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'always',
          mjs: 'always',
        },
      ],
      // Allow anonymous default exports in ESLint config files
      'import/no-anonymous-default-export': 'off',
    },
  },
]
