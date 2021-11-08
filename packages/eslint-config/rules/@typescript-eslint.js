/* eslint-disable max-lines, max-len --
 * TODO ironically we violate our own rules lol */
const common = require('./common')

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },

  plugins: ['@typescript-eslint'],
  extends: [
    // Disable core ESLint rules known to be checked by the TypeScript compiler
    'plugin:@typescript-eslint/eslint-recommended',
  ],

  rules: {
    /* SUPPORTED RULES */

    // Require that member overloads be consecutive
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
    '@typescript-eslint/adjacent-overload-signatures': 'error',

    // Requires using either T[] or Array<T> for arrays.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
        readonly: 'array-simple',
      },
    ],

    // Disallows awaiting a value that is not a Thenable
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
    '@typescript-eslint/await-thenable': 'error',

    // Bans // @ts-<directive> comments from being used
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': true,
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 4,
      },
    ],

    // Bans // tslint:<rule-flag> comments from being used (ban-tslint-comment)
    // https://github.com/typescript-eslint/typescript-eslint/blob/v3.2.0/packages/eslint-plugin/docs/rules/ban-tslint-comment.md
    '@typescript-eslint/ban-tslint-comment': 'error',

    // This rule bans specific types and can suggest alternatives. It does not ban the corresponding runtime objects from being
    // used. It includes a default set of types that are probably mistakes, like using 'String' instead of 'string'.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
    '@typescript-eslint/ban-types': 'error',

    // Ensures that literals on classes are exposed in a consistent style.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/class-literal-property-style.md
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],

    // This rule aims to standardize the use of type assertion style across the codebase.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
    // TODO: Make this more strict?
    '@typescript-eslint/consistent-type-assertions': [
      'warn',
      { assertionStyle: 'never' },
    ],

    // Consistent with object type definitions using either interface or type
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // Require explicit return types on functions and class methods
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: false,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],

    // Require explicit accessibility modifiers on class properties and methods.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      {
        // TODO: Should this be 'no-public'?
        accessibility: 'explicit',
      },
    ],

    // Require explicit return and argument types on exported functions' and classes' public class methods.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        // TODO: Should this be true?
        allowDirectConstAssertionInArrowFunctions: false,
        allowedNames: [],
        shouldTrackReferences: true,
      },
    ],

    // Require a consistent member declaration order
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
    '@typescript-eslint/member-ordering': 'warn',

    // Enforces using a particular method signature syntax.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
    // I actually prefer 'method' style, but 'property' works better with TypeScript strict mode.
    '@typescript-eslint/method-signature-style': ['error', 'property'],

    // Enforces naming conventions for everything across a codebase.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },

      // unused variables must have a leading underscore
      {
        selector: 'variable',
        modifiers: ['unused'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'require',
        trailingUnderscore: 'allow',
      },

      // allow more flexibility with global vars
      {
        selector: 'variable',
        modifiers: ['const', 'global'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },

      // used variables must not have a leadning underscore
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'allow',
      },

      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      // Enforce that boolean variables are prefixed with an allowed verb.
      {
        selector: 'variable',
        types: ['boolean'],
        // This isn't really PascalCase, because the prefix gets removed.
        // So something like "isValidPayID" would get the prefix stripped
        // and "ValidPayID" is in PascalCase.
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'does', 'will'],
      },
      // Enforce that type parameters (generics) are prefixed with T
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T'],
      },
      // Enforce that enums are singular, and do not end with 's' (for type theory reasons)
      {
        selector: 'enum',
        format: ['PascalCase'],
        filter: {
          regex: 'Status$',
          match: false,
        },
        custom: {
          regex: 's$',
          match: false,
        },
      },
      // Enforce that enumMembers are PascalCase
      {
        selector: 'enumMember',
        format: ['PascalCase', 'UPPER_CASE'],
      },
      // static readonly properties should look like constants
      {
        selector: 'property',
        modifiers: ['static', 'readonly'],
        format: ['UPPER_CASE'],
      },
      // private properties should have leading underscores
      {
        selector: 'property',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      // normal properties should just be camelCase
      {
        selector: 'property',
        format: ['camelCase'],
      },
    ],

    // Requires that .toString() is only called on objects which provide useful information when stringified.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-base-to-string.md
    '@typescript-eslint/no-base-to-string': 'error',

    // Disallow non-null assertion in locations that may be confusing
    // https://github.com/typescript-eslint/typescript-eslint/blob/v3.2.0/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',

    // Disallow the delete operator with computed key expressions (obj['a'] instead of obj.a)
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
    '@typescript-eslint/no-dynamic-delete': 'error',

    // Disallow the declaration of empty interfaces
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: false,
      },
    ],

    // Disallow usage of the any type
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
    // TODO: Make this less strict, using the default recommended settings? Or enable fix to unknown? and ignoreRestArgs?
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        fixToUnknown: false,
        ignoreRestArgs: false,
      },
    ],

    // Disallow extra non-null assertion.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
    '@typescript-eslint/no-extra-non-null-assertion': 'error',

    // Forbids the use of classes as namespaces.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowConstructorOnly: false,
        allowEmpty: false,
        allowStaticOnly: false,
        allowWithDecorator: false,
      },
    ],

    // Requires Promise-like values to be handled appropriately.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreVoid: true,
        ignoreIIFE: true,
      },
    ],

    // Disallow iterating over an array with a for-in loop
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-for-in-array.md
    '@typescript-eslint/no-for-in-array': 'error',

    // Disallow the use of eval()-like methods.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
    '@typescript-eslint/no-implied-eval': 'error',

    // Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: false,
        ignoreProperties: false,
      },
    ],

    // Disallows usage of void type outside of generic or return types
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
    '@typescript-eslint/no-invalid-void-type': [
      'error',
      {
        allowInGenericTypeArguments: true,
      },
    ],

    // Enforce valid definition of `new` and `constructor`
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-new.md
    '@typescript-eslint/no-misused-new': 'error',

    // Avoid using promises in places not designed to handle them
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksConditionals: true,
        checksVoidReturn: true,
      },
    ],

    // Disallow the use of custom TypeScript modules and namespaces
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: false,
        allowDefinitionFiles: true,
      },
    ],

    // Disallows using a non-null assertion after an optional chain expression. It's just incorrect to do so.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // Disallows non-null assertions using the ! postfix operator (Cancels the benefits of strict mode)
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Disallow the use of parameter properties in class constructors.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
    '@typescript-eslint/no-parameter-properties': 'warn',

    // Disallows invocation of require()
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
    '@typescript-eslint/no-require-imports': 'error',

    // Disallow aliasing this
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: false,
        allowedNames: [],
      },
    ],

    // Disallow throwing literals as exceptions.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
    '@typescript-eslint/no-throw-literal': 'error',

    // Disallow the use of type aliases for some scenarios
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
    '@typescript-eslint/no-type-alias': [
      'warn',
      {
        allowAliases: 'always',
        allowCallbacks: 'never',
        allowConditionalTypes: 'always',
        allowConstructors: 'never',
        allowGenerics: 'always',
        allowLiterals: 'in-unions-and-intersections',
        allowMappedTypes: 'always',
        allowTupleTypes: 'always',
      },
    ],

    // Flags unnecessary equality comparisons against boolean literals.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': [
      'error',
      {
        allowComparingNullableBooleansToTrue: false,
        allowComparingNullableBooleansToFalse: true,
      },
    ],

    // Prevents conditionals where the type is always truthy or always falsy.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      {
        allowConstantLoopConditions: false,
      },
    ],

    // Warns when a namespace qualifier is unnecessary.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
    '@typescript-eslint/no-unnecessary-qualifier': 'error',

    // Enforces that type arguments will not be used if not required.
    // Generic types / type parameters in TypeScript can specify a default type/value.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',

    // Warns if a type assertion does not change the type of an expression
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
    '@typescript-eslint/no-unnecessary-type-assertion': [
      'error',
      { typesToIgnore: [] },
    ],

    // Disallows assigning any to variables and properties
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
    // TODO: ERROR?
    '@typescript-eslint/no-unsafe-assignment': 'error',

    // Disallows calling (function calls) on an `any` type value.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
    // TODO: ERROR?
    '@typescript-eslint/no-unsafe-call': 'error',

    // Disallows member access on an `any` type value.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
    // TODO: ERROR?
    '@typescript-eslint/no-unsafe-member-access': 'error',

    // Disallows returning an `any` type value from a function.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md
    // TODO: ERROR?
    '@typescript-eslint/no-unsafe-return': 'error',

    // Disallow unused variables and arguments (experimental, uses TypeScript type information.)
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars-experimental.md
    // TODO: Should we use this or the base /no-unused-vars?
    '@typescript-eslint/no-unused-vars-experimental': [
      'warn',
      {
        ignoredNamesRegex: '^_',
        ignoreArgsIfArgsAfterAreUsed: false,
      },
    ],

    // Disallows the use of require statements except in import statements
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
    '@typescript-eslint/no-var-requires': 'error',

    // Prefer usage of as const over literal type.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-as-const.md
    '@typescript-eslint/prefer-as-const': 'warn',

    // Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
    '@typescript-eslint/prefer-for-of': 'error',

    // Enforce includes method over indexOf method
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-includes.md
    '@typescript-eslint/prefer-includes': 'error',

    // Require that all enum members be literal values to prevent unintended enum member name shadow issues
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.md
    '@typescript-eslint/prefer-literal-enum-member': 'error',

    // Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
    '@typescript-eslint/prefer-namespace-keyword': 'error',

    // Enforce the usage of the nullish coalescing operator instead of logical chaining.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
    '@typescript-eslint/prefer-nullish-coalescing': [
      'warn',
      {
        ignoreConditionalTests: true,
        ignoreMixedLogicalExpressions: true,
      },
    ],

    // Prefer using concise optional chain expressions instead of chained logical ands.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
    '@typescript-eslint/prefer-optional-chain': 'error',

    // Requires that private members are marked as readonly if they're never modified outside of the constructor.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
    '@typescript-eslint/prefer-readonly': [
      'warn',
      {
        onlyInlineLambdas: false,
      },
    ],

    // Prefer using type parameter when calling Array#reduce instead of casting
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',

    // Enforce that RegExp#exec is used instead of String#match if no global flag is provided
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
    '@typescript-eslint/prefer-regexp-exec': 'error',

    // Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',

    // Recommends using // @ts-expect-error over // @ts-ignore
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
    '@typescript-eslint/prefer-ts-expect-error': 'error',

    // Requires any function or method that returns a Promise to be marked async.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
    '@typescript-eslint/promise-function-async': [
      'error',
      {
        allowAny: false,
        allowedPromiseNames: ['Thenable'],
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true,
      },
    ],

    // Requires Array#sort calls to always provide a compareFunction.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
    '@typescript-eslint/require-array-sort-compare': [
      'warn',
      {
        ignoreStringArrays: false,
      },
    ],

    // When adding two variables, operands must both be of type number or of type string.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      { checkCompoundAssignments: true },
    ],

    // Enforce template literal expressions to be of string type.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        // Allow numbers and booleans in template literal expressions
        allowNumber: true,
        allowBoolean: true,
        allowAny: false,
        allowNullish: false,
      },
    ],

    // Exhaustiveness checking in switch with union type.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
    '@typescript-eslint/switch-exhaustiveness-check': 'error',

    // Sets preference level for triple slash directives versus ES6-style import declarations
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md
    '@typescript-eslint/triple-slash-reference': [
      'error',
      { path: 'never', types: 'never', lib: 'never' },
    ],

    // Enforces unbound methods are called with their expected scope
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true,
      },
    ],

    // Warns for any two overloads that could be unified into one by using a union or an optional/rest parameter
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
    '@typescript-eslint/unified-signatures': 'error',

    /* EXTENSION RULES */

    // Enforce default parameters to be last.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'error',

    // Enforce dot notation whenever possible
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': [
      'error',
      { allowKeywords: true, allowPrivateClassPropertyAccess: true },
    ],

    // Require or disallow an empty line between class members
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterOverload: true,
        exceptAfterSingleLine: true,
      },
    ],

    // Disallow generic Array constructors
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',

    // Disallow duplicate class members
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': 'error',

    // Disallow empty functions
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
    // TODO: Go through other options: https://github.com/eslint/eslint/blob/master/docs/rules/no-empty-function.md#options
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: [],
      },
    ],

    // Disallow this keywords outside of classes or class-like objects
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': 'error',

    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'error',

    // Disallow magic numbers.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      {
        ignore: [
          // Basic numbers
          -1, 0, 1, 2,

          // Often need to convert milliseconds to/from seconds.
          1000,
        ],

        // TODO: Should ignore array indexes be true?
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false,

        // TS-specific options
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignoreEnums: true,
      },
    ],

    // This rule aims to eliminate unused expressions which have no effect on the state of the program.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: false,
        allowTernary: false,
        allowTaggedTemplates: false,
      },
    ],

    // Variables that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring.
    // Such variables take up space in the code and can lead to confusion by readers.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        // Allow unused parameters that start with an underscore.
        // This is the convention in TypeScript, to opt out of the "noUnusedParameters" compiler check.
        // This makes refactoring and building easier, as you can define stub functions that don't use all their arguments.
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
        // Allow unused rest/destructuring parameters, since that's an easy way to remove properties from an object.
        ignoreRestSiblings: true,
        // Validate catch block arguments
        caughtErrors: 'all',
        // caughtErrorsIgnorePattern: '^ignore',
      },
    ],

    // Disallow the use of variables before they are defined.
    // For functions in particular, I generally like to define helper functions at the bottom of a file.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        enums: true,
        typedefs: true,
      },
    ],

    // ES2015 provides a default class constructor if one is not specified. As such, it is unnecessary to provide an empty
    // constructor or one that simply delegates into its parent class.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',

    // Enforce the consistent use of either backticks, double, or single quotes
    // Usually, you don’t need this rule at all with Prettier. But there are two cases where it could be useful:
    // - To enforce the use of backticks rather than single or double quotes for strings.
    // - To forbid backticks where regular strings could have been used.
    // https://eslint.org/docs/rules/quotes
    quotes: 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],

    // Enforces consistent returning of awaited values.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
    // TODO: Go back to in-try-catch default?
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],

    /* DISABLED RULES */
    // These rules never need to be enabled when using Prettier
    '@typescript-eslint/brace-style': 'off',
    '@typescript-eslint/comma-spacing': 'off',
    '@typescript-eslint/func-call-spacing': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/keyword-spacing': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/type-annotation-spacing': 'off',

    // Requires type annotations to exist.
    // Note: requiring type annotations unnecessarily can be cumbersome to maintain and generally reduces code readability.
    // TypeScript is often better at inferring types than easily written type annotations would allow.
    // Instead of enabling typedef, it is generally recommended to use the --noImplicitAny and/or --strictPropertyInitialization compiler
    // options to enforce type annotations only when useful.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
    '@typescript-eslint/typedef': 'off',

    // require or disallow initialization in variable declarations
    // Like I say in eslint-core/variables.js, I can't think of when you would _ever_ want this rule.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md
    'init-declarations': 'off',
    '@typescript-eslint/init-declarations': 'off',

    // Use function types instead of interfaces with call signatures.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
    '@typescript-eslint/prefer-function-type': 'off',

    // Requires that function parameters are typed as readonly to prevent accidental mutation of inputs.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
    // TODO: I'd like to enable this, but it seems pretty broken
    '@typescript-eslint/prefer-readonly-parameter-types': [
      'off',
      {
        checkParameterProperties: true,
      },
    ],

    // Disallow async functions which have no await expression
    // According to Airbnb, this is a horrible rule that should never be used
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',

    // Restricts the types allowed in boolean expressions (ternary, if statements, &&, ||, ...)
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
    // TODO: This rule may be worth re-visiting now that @typescript-eslint v3.0.0 has completely reworked it
    '@typescript-eslint/strict-boolean-expressions': [
      'off',
      {
        allowNullable: true,
        allowSafe: true,
        ignoreRhs: true,
      },
    ],
  },

  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
      },
    },
    {
      files: ['config.ts'],
      rules: {
        // Our config file often has "magic numbers" as default port numbers or other things
        '@typescript-eslint/no-magic-numbers': 'off',
      },
    },
    {
      files: common.testPaths,
      rules: {
        // No need to handle promise exceptions in test blocks, since they'll just be handled anyways.
        // TODO:(hbergren) Is this true?
        '@typescript-eslint/no-floating-promises': 'off',

        // In Mocha, you can use `this.timeout()` to set a custom timeout for a specific test
        '@typescript-eslint/no-invalid-this': 'off',

        // We use non-null assertions liberally in tests to allow TypeScript to build
        '@typescript-eslint/no-non-null-assertion': 'off',

        // We purposefully break some TypeScript assumptions in various tests (like giving `null` to a database access function)
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': true,
            'ts-nocheck': true,
            'ts-check': false,
            minimumDescriptionLength: 4,
          },
        ],

        // Overly annoying in test
        '@typescript-eslint/no-magic-numbers': 'off',
      },
    },
    // Exceptions because of rippled's gRPC stuff.
    {
      files: ['**/XRP/**/*.ts'],
      rules: {
        // rippled uses casing to distinguish calculated vs real property names.
        // Thus, we need to allow PascalCase property names for some scenarios.
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },

          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },

          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          // Enforce that boolean variables are prefixed with an allowed verb.
          {
            selector: 'variable',
            types: ['boolean'],
            // This isn't really PascalCase, because the prefix gets removed.
            // So something like "isValidPayID" would get the prefix stripped
            // and "ValidPayID" is in PascalCase.
            format: ['PascalCase'],
            prefix: [
              'is',
              'was',
              'should',
              'has',
              'can',
              'did',
              'does',
              'will',
            ],
          },
          // Enforce that type parameters (generics) are prefixed with T
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T'],
          },
          // Enforce that enums are singular, and do not end with 's' (for type theory reasons)
          {
            selector: 'enum',
            format: ['PascalCase'],
            filter: {
              regex: 'Status$',
              match: false,
            },
            custom: {
              regex: 's$',
              match: false,
            },
          },
          // Enforce that enumMembers are PascalCase
          {
            selector: 'enumMember',
            format: ['PascalCase', 'UPPER_CASE'],
          },
          {
            selector: 'property',
            format: ['camelCase', 'PascalCase'],
          },
        ],
      },
    },
  ],
}
