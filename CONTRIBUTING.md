# Contributing

## Release process

### Editing the Code

* Your code should pass all the tests on Github.
* Open a PR against `master` and ensure that all CI passes.
* Get a full code review from one of the maintainers.
* Merge your changes.

### Release

1. Ensure that all tests passed on the last CI that ran on `master`.
2. Open a PR to update the CHANGELOG.md if anything needs to be changed. Merge
   this and pull `master` again.
3. Checkout `master` and `git pull`.
4. Run `npx lerna publish` and follow the prompts.
