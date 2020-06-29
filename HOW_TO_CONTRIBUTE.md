## Contributor Guide

This is intended to help you make a contribution to Foo-foo-mq that is likely to land.
It includes basic instructions for getting the project running locally,
ensuring CI will pass, and reducing the chances that you will be asked to make changes by a maintainer
or have the PR closed without comment for failing simple criteria.

A lot of the criteria here is to make it much easier for maintainers to accept or reject PRs without having to do additional work.
It's also intended to save people time and effort in advance if they're not interested in meeting the criteria required to submit an acceptable PR.

### Setup

The current dev environment for Foo-foo-mq is:

 * Node 10+
 * Docker (to run RabbitMQ in a container for integration tests)
 * [nvm] (recommended)

It is recommended that you not use a RabbitMQ server running outside Docker
as failing foo-foo-mq integration tests may make a mess that you'll be stuck cleaning up. :cry:
It is much easier to just remove the Docker container and start over.

### NVM

"[nvm] is a version manager for node.js."
It is low maintenance way to ensure all contributors use the same version of node for development.

The current minimum required version of node is specified in the [.nvmrc](.nvmrc) file.

Assuming you have nvm installed, run the commands `nvm install` and `nvm use`
to ensure you are on the right version of node before beginning development.


#### Included Docker Container

The repo includes a Dockerfile as well as npm commands to build, start and stop and remove the container:

 * `npm run run-container` - creates a container named `foofoomq` for tests
 * `npm run start-container` - starts the container if it was stopped
 * `npm run stop-container` - stops the container only
 * `npm run remove-container` - stops and removes the container entirely

### A Note About Features or Big Refactors

There have been some occasions where a PR has conflicted with ongoing work, clashed with stated goals of the project
or been a well-intended but undesired technology change.

The maintainers understand that a lot of work goes into making a PR to someone else's project
and would like to avoid having to close a PR and leave folks who'd like to contribute feeling as though their time and effort was not appreciated.

Therefore, please open an issue or contact a maintainer before undertaking large scale effort along these lines.

### Commit Style

`foo-foo-mq` uses [conventional commits] so that releases can be generated much more quickly
(this includes automated generation of the CHANGELOG going forward).

PRs with commits that do not follow this style will be asked to fix their commit log.
PRs that do not conform and are not fixed will eventually just be closed.

To make things easier, this repo is  [![commitizen friendly]](http://commitizen.github.io/cz-cli/)

 Simply run `npm run commit` and it will prompt you through creating your commit message in the correct format.

### Running Tests & Coverage

The expectation is for all PRs to include test coverage such that there is no drop in coverage.
PRs that do not include changes to the spec folder are unlikely to be considered.
A maintainer may ask you to add coverage.
PRs that sit for long periods of time without tests are likely to be closed.

To see the coverage before submitting a PR, you can run `npm run coverage` to get a full coverage report.

#### New Features

New features without both behavior and integration tests will not be accepted.
The expectation is that features have tests that demonstrate your addition
and will behave according to design during success and failure modes.

#### Bug Fixes

Bug fixes without additional tests are less likely to be accepted.
The expectation is that if you are changing a behavior,
you include a test to demonstrate that the correction addresses the behavior you are changing.

This is very important as Foo-foo-mq has changed drastically over the years,
and, without good tests in place, regressions are likely to creep in.
Please help ensure that your fixes stay fixed :smile:

### Style & Linting

Running `npm test`, `npm run lint` and `npm run lint-fix` are all methods to check/correct style/linting problems.
The CI system also runs these and will fail a PR that violates the any rules.

PRs that break or change style rules will be ignored, and if not repaired, they will be rejected.

Foo-foo-mq now uses semistandard (standard + semicolons).
This is not implying it is a perfect format.
Rather it is a low maintenance way to have tooling and automation around ensuring a *consistent* style stay in place across all PRs.


[nvm]: https://github.com/nvm-sh/nvm
[conventional commits]: https://conventionalcommits.org/
[Commitizen friendly]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
