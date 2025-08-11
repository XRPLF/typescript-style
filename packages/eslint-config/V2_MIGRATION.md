# eslint-config Version 1 to Version 2 Migration Guide
This shared config is migrated to adhere to Flat configs that were first introduced in [v8.21.0](https://eslint.org/blog/2022/08/eslint-v8.21.0-released/) of ESlint. This means that v2.0.0 of eslint-config now exports flat configs that are equivalent to ^1.0.0 in terms of configuration rules barring some breaking changes there were introduced by ESlint itself, and other ESlint plugins that this share config exported. Below are the list of breaking changes and the steps that you need to follow to use eslint-config@2.0.0.

 1. You might want to check out the official blog posts about Flat configs, its [migration guide](https://eslint.org/docs/latest/use/configure/migration-guide), [official docs](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new).

 -  [https://eslint.org/blog/2022/08/new-config-system-part-1/](https://eslint.org/blog/2022/08/new-config-system-part-1/)
 - [https://eslint.org/blog/2022/08/new-config-system-part-2/](https://eslint.org/blog/2022/08/new-config-system-part-2/)
- [https://eslint.org/blog/2022/08/new-config-system-part-3/](https://eslint.org/blog/2022/08/new-config-system-part-3/)

 2. Upgrade your `devDependencies`  to conform to the semver version of  `peerDependencies` listed in `package.json` file of this project. `npm` should automatically give which `devDependencies` are not upgraded to the versions mentioned in `peerDependencies` of this project when you first update `@xrplf/eslint-config to 2.0.0` execute `npm i` command.


 3. Step #2 will upgrade ESlint, and other plugins (for instance `eslint-plugin-jsdoc`, `eslint-plugin-array-func`  etc) to their latest major version. In addition to that, some of the eslint plugins/configs were not being maintained for very long time, and some of them did not export Flat configs out of the box, so, we have replaced those plugins/configs with the ones that are being actively maintained and have Flat config support. Below are the list of breaking changes that you need to incorporate:

	 - `@typescript-eslint/ban-types` has been split into [`@typescript-eslint/no-empty-object-type`, `@typescript-eslint/no-unsafe-function-type` and `@typescript-eslint/no-wrapper-object-types`]. See [here](https://typescript-eslint.io/rules/ban-types/).
	 - `@typescript-eslint/no-throw-literal` has been replaced by `@typescript-eslint/only-throw-error`.
	 - In `@typescript-eslint/restrict-plus-operands` checkCompoundAssignments is replaced by  skipCompoundAssignments. See [here](https://typescript-eslint.io/blog/announcing-typescript-eslint-v6/#rule-breaking-changes).
	 - Removed `@typescript-eslint/lines-between-class-members`.
	 - `eslint-plugin-eslint-comments` is not being maintained anymore and is replaced by it's community fork `@eslint-community/eslint-plugin-eslint-comments`. See [here](https://eslint-community.github.io/eslint-plugin-eslint-comments/).
	 - `jsdoc/newline-after-description` is been removed and replaced by `jsdoc/tag-lines`.
	 - `eslint-plugin-node` is not being maintained anymore and is replaced by its fork [eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-n). `node/no-missing-import` and `node/file-extension-in-import` have been turned off since, `import/no-unresolved` and `import/extensions` rules handles these respectively.
	 - Removed version override from `node/no-unsupported-features/es-builtins`, `node/no-unsupported-features/node-builtins`, `node/no-deprecated-api`, `node/no-unsupported-features/es-syntax` to let ESlint automatically pick it from `engines` field in package.json file of the project.
	 - `airbnb` config is replaced by `js/recommended` config from `@eslint/js` package since airbnb package is not being maintained and does not export Flat configs.
	 - React specific rules that were used from `airbnb/hooks` are now replaced by recommended configs exported from these plugins `eslint-plugin-react`, `eslint-plugin-react-hooks` and `eslint-plugin-jsx-a11y`.
