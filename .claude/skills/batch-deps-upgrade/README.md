# Batch Dependency Upgrade

Batches all open Dependabot PRs in `XRPLF/typescript-style` into a single upgrade PR, plus any further upgrades needed to resolve the open Semgrep JIRA tickets (children of epic [DGE-3869](https://ripplelabs.atlassian.net/browse/DGE-3869) that mention `typescript-style`) that a package upgrade can fix.

Only Semgrep tickets about a vulnerable dependency are in scope. A ticket with no fix version takes its fix version from the advisory: it's upgraded like any other ticket, closed as No-op when the package is gone or already patched, and left open for a human when no fixed release exists or the advisory has no usable affected range.

The two inputs are independent: every in-scope ticket gets fixed whether or not a Dependabot PR proposes that upgrade — where none does, the batch PR adds it.

Peer ranges are always written as `^X.0.0` so consumers can resolve anywhere in the major, and each peer major gets a `[Breaking Change]` CHANGELOG entry (the next release is then a major).

## The two commands

Run at different times:

| Command | When | What it touches |
| --- | --- | --- |
| `/batch-deps-upgrade` | building the batch | working tree and local files only |
| `/batch-deps-upgrade close` | after the batch upgrade PR is merged | JIRA tickets and Dependabot PRs |

## Prerequisites

- `gh auth login` — needed to list (and later close) Dependabot PRs.
- Atlassian MCP connected (required) — needed to read the Semgrep tickets and later transition and comment on them. The skill stops if it is not available.

## `/batch-deps-upgrade` — build the batch

From the repo root, start a new Claude Code session and run:

```
/batch-deps-upgrade
```

It discovers the open Dependabot PRs and Semgrep tickets, applies the upgrades on a `deps/batch-deps-upgrade-YYYY-QN` branch, validates, and writes `code-changes.md`, `pr-description.md` and `close-list.md` (all git-ignored) plus a commit message. It does not commit and writes nothing outside the repo.

Then, by hand:

1. Review the changes and generated files.
2. Stage and commit using the suggested commit message. The generated markdown files are git-ignored and stay local.
3. Push and open a PR using the generated PR description. Its "Superseded Dependabot PRs" and "Semgrep tickets" sections are the durable record of what gets closed later.
4. Get the PR reviewed and merged.

## `/batch-deps-upgrade close` — close what the batch superseded

Once the batch PR is merged, run this from the same working tree if you still have it — it reads `close-list.md`, falling back to the merged PR body if that file is gone:

```
/batch-deps-upgrade close
```

It refuses to act unless the batch PR is merged, re-verifies every item against `origin/master`'s lockfile, then transitions the resolved Semgrep tickets to Done with a comment linking the batch PR, closes the superseded Dependabot PRs with a comment, and reports anything it skipped. Skipped Dependabot PRs are left open so Dependabot keeps rebasing them. Human-authored dependency PRs are never closed automatically.

Afterwards, read the "Left open" section of `close-list.md` — each entry is a fix that didn't land, with its reason (blocked by a transitive parent, blocked by another package's peer range, or failed validation). All of these need a human-authored PR.
