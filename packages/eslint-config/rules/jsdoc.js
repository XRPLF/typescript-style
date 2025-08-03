const jsdocPlugin = require('eslint-plugin-jsdoc')

const common = require('./common')

const baseConfig = {
  languageOptions: {
    sourceType: 'module',
  },

  plugins: {
    jsdoc: jsdocPlugin,
  },

  settings: {
    jsdoc: {
      mode: 'typescript',

      // Settings for which tag names are allowed or preferred if multiple synonyms exist
      tagNamePreference: {
        augments: {
          message:
            '@extends is to be used over @augments as it is more evocative of classes than @augments',
          replacement: 'extends',
        },

        todo: false,

        // These tags are not necessary in TypeScript
        access: false,
        public: false,
        protected: false,
        private: false,
        package: false,
        readonly: false,

        abstract: false,
        async: false,
        implements: false,
        interface: false,
      },

      // Allows elements referenced to be omitted if enabled
      overrideReplacesDocs: true,
      augmentsExtendsReplacesDocs: false,
      implementsReplacesDocs: false,
    },
  },

  rules: {
    // Ensures that (JavaScript) examples within JSDoc adhere to ESLint rules
    // https://github.com/gajus/eslint-plugin-jsdoc#check-examples
    // TODO: There are a bunch more options here, and if we ever start using @example blocks regularly
    // it might be worth defining a set of ESLint rules specifically for examples.
    'jsdoc/check-examples': [
      'warn',
      {
        captionRequired: false,
        // exampleCodeRegex: false,
        // rejectExampleCodeRegex: false,
        paddedIndent: 2,
        reportUnusedDisableDirectives: true,
        allowInlineConfig: true,
      },
    ],

    // Ensures that parameter names in JSDoc match those in the function declaration.
    // https://github.com/gajus/eslint-plugin-jsdoc#check-param-names
    'jsdoc/check-param-names': [
      'error',
      {
        checkRestProperty: true,
        allowExtraTrailingParamDocs: false,
        enableFixer: false,
      },
    ],

    // Ensures that property names in JSDoc are not duplicated on the same block and that nested properties have defined roots.
    // https://github.com/gajus/eslint-plugin-jsdoc#check-property-names
    'jsdoc/check-property-names': [
      'error',
      {
        enableFixer: false,
      },
    ],

    // Reports against Google Closure Compiler syntax.
    // https://github.com/gajus/eslint-plugin-jsdoc#check-syntax
    'jsdoc/check-syntax': 'error',

    // Reports invalid block tag names.
    // https://github.com/gajus/eslint-plugin-jsdoc#check-tag-names
    'jsdoc/check-tag-names': [
      'error',
      {
        // `@category` is used for type doc
        definedTags: ['category'],
      },
    ],

    // This rule checks the values for: [@version, @since, @license, @author]
    // https://github.com/gajus/eslint-plugin-jsdoc#check-values
    'jsdoc/check-values': 'error',

    // Expects certain tags to be empty of any content
    // https://github.com/gajus/eslint-plugin-jsdoc#empty-tags
    'jsdoc/empty-tags': 'error',

    // Enforces a consistent padding of the block description.
    // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/tag-lines.md
    'jsdoc/tag-lines': [
      'error',
      'any',
      {
        startLines: 1,
      },
    ],

    // This rule reports types being used on @param or @returns. (For use with TypeScript)
    // https://github.com/gajus/eslint-plugin-jsdoc#no-types
    'jsdoc/no-types': 'error',

    // Requires that block description, explicit @description, and @param/@returns tag
    // descriptions are written in complete sentences.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-description-complete-sentence
    'jsdoc/require-description-complete-sentence': [
      'error',
      {
        tags: [
          'param',
          'property',
          'returns',
          'see',
          'summary',
          'deprecated',
          'throws',
        ],
        abbreviations: [],
        newlineBeforeCapsAssumesBadSentenceEnd: false,
      },
    ],

    // Requires that all functions have a description.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-description
    'jsdoc/require-description': [
      'warn',
      {
        descriptionStyle: 'body',
        checkConstructors: true,
        checkGetters: true,
        checkSetters: true,
      },
    ],

    // Requires a hyphen before the @param description.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-hyphen-before-param-description
    'jsdoc/require-hyphen-before-param-description': [
      'error',
      'always',
      {
        tags: {
          '*': 'never',
          property: 'always',
        },
      },
    ],

    // Checks for presence of jsdoc comments, on class declarations as well as functions.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-jsdoc
    'jsdoc/require-jsdoc': [
      'warn',
      {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
        checkConstructors: true,
        exemptEmptyConstructors: true,
        exemptEmptyFunctions: true,
        enableFixer: false,
      },
    ],

    // Requires that each @param tag has a description value.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-param-description
    'jsdoc/require-param-description': 'error',

    // Requires that all function parameters have names.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-param-name
    'jsdoc/require-param-name': 'error',

    // Requires that all function parameters are documented.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-param
    'jsdoc/require-param': [
      'error',
      {
        enableFixer: true,
        enableRootFixer: true,
        enableRestElementFixer: true,
        checkRestProperty: true,
        checkDestructured: false,
        checkConstructors: true,
        checkGetters: false,
        checkSetters: false,
      },
    ],

    // Requires that all @typedef and @namespace tags have @property when their type is object
    // https://github.com/gajus/eslint-plugin-jsdoc#require-property
    'jsdoc/require-property': 'error',

    // Requires that each @property tag has a description value.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-property-description
    'jsdoc/require-property-description': 'error',

    // Requires that all function @property tags have names.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-property-name
    'jsdoc/require-property-name': 'error',

    // Requires a return statement in function body if a @returns tag is specified in jsdoc comment.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-returns-check
    'jsdoc/require-returns-check': 'warn',

    // Requires that the @returns tag has a description value.
    // The error will not be reported if the return value is void or undefined.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-returns-description
    'jsdoc/require-returns-description': 'error',

    // Requires returns are documented.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-returns
    'jsdoc/require-returns': [
      'error',
      {
        checkConstructors: false,
        checkGetters: true,
        // Force a @return even if function just returns undefined (useless)
        forceRequireReturn: false,
        forceReturnsWithAsync: false,
      },
    ],

    // Requires throw statements are documented.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-throws
    'jsdoc/require-throws': 'error',

    // Requires all types to be valid JSDoc or Closure compiler types without syntax errors.
    // https://github.com/gajus/eslint-plugin-jsdoc#valid-types
    'jsdoc/valid-types': 'error',

    /* DISABLED RULES */
    // Rules we don't need because of TypeScript
    'jsdoc/check-access': 'off',
    'jsdoc/check-types': 'off',
    'jsdoc/implements-on-classes': 'off',
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-property-type': 'off',
    'jsdoc/require-returns-type': 'off',

    // Rules we don't need because of Prettier
    'jsdoc/check-alignment': 'off',
    'jsdoc/check-indentation': 'off',

    // Misc disabled rules

    // Enforces a regular expression pattern on descriptions.
    // https://github.com/gajus/eslint-plugin-jsdoc#match-description
    // Already taken care of by jsdoc/require-description-complete-sentence
    'jsdoc/match-description': [
      'off',
      {
        matchDescription: '^([A-Z]|[`\\d_])[\\s\\S]*[.?!`]$',
        tags: {
          param: true,
          returns: true,
        },
      },
    ],

    // Requires that all functions have examples.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-example
    'jsdoc/require-example': 'off',

    // Checks that all files have a @file, @fileoverview, or @overview tag.
    // https://github.com/gajus/eslint-plugin-jsdoc#require-file-overview
    'jsdoc/require-file-overview': 'off',
  },
}

const overridesForTests = {
  files: common.testPaths,
  rules: {
    // We don't need JSDoc in test files
    'jsdoc/require-jsdoc': 'off',
  },
}

module.exports = [baseConfig, overridesForTests]
