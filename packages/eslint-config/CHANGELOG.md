# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]
- Migrated ESlint and it's related plugins to their latest major version. [Breaking Change]
- @xrplf/eslint-config version 2.0.0 now exports Flat configs that are equivalent to ^1.0.0 in terms of configuration rules barring some breaking changes there were introduced by ESlint itself, and other ESlint plugins that this shared config exported. See [V2_MIGRATION.md](./V2_MIGRATION.md). [Breaking Change]

## 1.10.1
- @xrplf/eslint-config allows typescript > 5.0.0 as a peer dependency
- @xrplf/eslint-config allows eslint-plugin-jsdoc > 40.0.0 as a peer dependency

## 1.10.1
- @xrplf/eslint-config allows typescript > 5.0.0 as a peer dependency
- @xrplf/eslint-config allows eslint-plugin-jsdoc > 40.0.0 as a peer dependency

## 1.8.0
- @xrplf/eslint-config no longer uses @typescript-eslint/no-unused-vars-experimental

## 1.5.0
- @xrplf/eslint-config lints filenames such that they match their default export
- @xrplf/eslint-config's engines and peer dependencies are looser
- @xrplf/eslint-config allows the `category` doc tag for use with type doc

## 1.3.0
- @xrplf/eslint-config allows peers with typescript 3 or 4
- @xrplf/eslint-config skips blank lines and comments in
  `max-lines` and `max-lines-per-function` rules

## 1.2.2
First version that is correctly tagged with this CHANGELOG. Previous releases
accidentally used a CHANGELOG from a related project and should be ignored.
