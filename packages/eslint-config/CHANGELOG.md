# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

This project DOES NOT adhere to Semantic Versioning. New rules may be added in minor versions that cause previously passing code to fail linting. That is working as intended, since the benefits of stricter rules that automatically get introduced when using Dependabot usually outweigh the inconvenience of infrequently having to update code to follow a stricter standard (or adding a `/*eslint-disable*/` comment).

## [Unreleased]

## 0.11.0 - July 28, 2020

Moved `eslint-plugin-mocha` and the `chai-as-promised` plugin into an [independent configuration](https://github.com/xpring-eng/eslint-config-mocha).

This is necessary so that consumers of this config are not locked in to Mocha, and have the flexibility to choose Jest (or any other testing library) as they see fit.

## 0.10.0 - July 21, 2020

- Change `max-statements` restriction from `10` to `15`.
  - Turns out that you can write totally reasonable functions with more than 10 statements.
- Allow `.json` file extension when `import`ing a JSON file
  - Turns out TypeScript needs the `.json` file extension to do the import.
- Upgrade peer dependencies
  - ESLint 7.5.0
    - Better optional chaining
  - `@typescript-eslint`
    - Support short-circuiting assignment operators
    - Support type annotations on catch clauses

## 0.9.2 - July 9, 2020

- Allow `was` as a prefix for boolean variables

## 0.9.1 - July 8, 2020

- Update `typescript-eslint` and `eslint-plugin-jsdoc`.
- Add an new rule in the latest version of `typescript-eslint` for literal enum members.

## 0.9.0 - June 29, 2020

- Add `chai-as-promised` plugin to avoid bad tests.

## 0.8.0 - June 23, 2020

- Add `eslint-plugin-array-func` to provide rules for best practices with `.map().filter().reduce()` style operations.

## 0.7.2 - June 22, 2020

- Upgrade `eslint` to `7.3.0`, and add two new rules:
  - `no-promise-executor-return`
  - `no-unreachable-loop`
- Upgrade `@typescript-eslint` to `3.4.0`:
  - Add `@typescript-eslint/no-loss-of-precision` rule that allows `123_456` numerical separators.
- Upgrade `eslint-plugin-jsdoc` to `28.0.0`
- Add Dependabot configuration to only bug me weekly

## 0.7.1 - June 18, 2020

Upgrade `eslint-plugin-jsdoc`, and require a new rule `require-throws`, which requires documenting all functions that `throw` an error.

## 0.7.0 - June 8, 2020

Upgrade `@typescript-eslint` to `3.2.0`.

Adds new rules and options from `@typescript-eslint-v3.2.0`, as well as adding `does` as a valid prefix for boolean variables.

## 0.6.3 - June 8, 2020

- Disable some rules specifically for `*.test.ts` files

- Allow an "unscoped `this`" keyword, as Mocha lets you do `this.timeout(num)` to set a test-specific timeout.
- Allow using the `var!` syntax to make non-null assertions in test files, so we don't have to deal with the `null | undefined` case in test files when we _know_ the result will be valid.

## 0.6.2 - June 8, 2020

- Upgrade `eslint-plugin-import` to one that officially supports ESLint v7.

## 0.6.1 - June 2, 2020

- Upgrade `eslint-plugin-jsdoc` to `v27.0.0`, to enforce not using hyphens between a `@returns` tag and its description.

## 0.6.0 - June 2, 2020

Add `eslint-plugin-jsdoc` as a peer dependency, to enforce JSDoc comments for functions and classes.

## 0.5.2 - June 1, 2020

- Require `@typescript-eslint: v3.1.0`, which improves some rules detection capabilities, and allows requiring descriptions for `@ts-*` comments.
- Require `eslint-plugin-mocha: v7.0.1`, which fixes a bug in `max-top-level-suites`, so the rule actually works.

This may result in new linting violations.

## 0.5.1 - May 28, 2020

Add `eslint-plugin-eslint-comments` as a peer dependency.

## 0.5.0 - May 28, 2020

Add `eslint-plugin-eslint-comments` to our linting configuration.

Adds various rules around `/* eslint */` style comments, the most useful of which is requiring that `/* eslint-disable */` comments have comments explaining why you need to disable something.

## 0.4.0 - May 28, 2020

- Add `eslint-plugin-node` to our linting configuration

ESLint v7 deprecated all their Node.js-specific rules, and their recommendation is to use `eslint-plugin-node` instead.

## 0.3.2 - May 27, 2020

- Add an exception to our `naming-convention` rule

`rippled` uses casing of object property names to indicate whether a property is calculated or "real". So, we need to allow `PascalCase` property names when we use `gRPC`. The way this is currently implemented is an override for all `*.ts` files that live in a `/XRP/` directory.

## 0.3.1 - May 26, 2020

- Change config for `@typescript-eslint/array-type`
  - Use `Array<T>` for complex types like unions / intersections

## 0.3.0 - May 26, 2020

- Upgrade `@typescript-eslint` to 3.0.1
  - Update corresponding rules and options
- Fix bug introduced by using StrictPascalCase for enum members
- Change severity of TS rules to match `@typescript-eslint` recommendations

## 0.2.3 - May 21, 2020

- Bump `eslint-plugin-tsdoc` from 0.2.4 to 0.2.5
  - Add support for the `@see` tag!
- Increase cyclomatic `complexity` threshold from 8 to 10
  - Seems to be the typical standard

## 0.2.2 - May 19, 2020

- Upgrade to `@typescript-eslint v2.34.0`
- Disallow `snake_case` property names
- Add rule for `lines-between-class-members`
- Disallow `@ts-ignore` comments in test files.

## 0.2.1 - May 18, 2020

- Allow `@types/**/*.d.ts` files to exist without warning.
- Upgrade `eslint-plugin-mocha` to 7.0.0

## 0.2.0 - May 11, 2020

- Bump required version of ESLint to 7.0.0
- Add new rules and options from ESLint 7.0.0
  - `default-case-last`
  - `no-void`
  - `no-useless-backreference`
  - `no-restricted-exports`

## 0.1.2 - May 8, 2020

- Disable `@ts-*` comment errors for `*.test.ts` files, where it's reasonable to pass null on purpose
- Allow src/index.ts to export things that are not used
  - needed for libraries we build that exports functionality.
- Report on unused ESLint disable directives
- Fix bug in boolean variable naming-convention

## 0.1.1 - May 5, 2020

Literally no changes, just redeployed to NPM.

## 0.1.0 - May 5, 2020

### Features

- Add rule definitions for the core ESLint rules
- Add rule definitions for the `@typescript-eslint` plugin
- Add rule definitions for the `import` plugin
- Add rule definitions for the `mocha` plugin
- Add rule definitions for the `prettier` plugin
- Add rule definitions for the `tsdoc` plugin
- Add `eslint-config-base/loose` that loosens some of the various rules defined in the base ruleset
