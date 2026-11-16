---
name: batch-deps-upgrade
description: Batch all open Dependabot dependency upgrade PRs in XRPLF/typescript-style into a single PR, plus any further upgrades needed to resolve open Semgrep JIRA tickets (under epic DGE-3869) that a package upgrade can fix; after merge, close the superseded Dependabot PRs and the resolved tickets
disable-model-invocation: true
---

Batch all open Dependabot dependency upgrade PRs into a single PR for `XRPLF/typescript-style`, **plus any further upgrades needed to resolve the open Semgrep JIRA tickets that a package upgrade can fix**.

**Scope — only tickets about a vulnerable dependency:** ones naming the package, with or without a fix version. Code and configuration findings are out of scope.

Within that scope, the two inputs are independent. Every in-scope ticket gets fixed whether or not a Dependabot PR happens to propose that upgrade. Where no open Dependabot PR covers an impacted package, this PR adds the upgrade itself.

**Two modes — decide which before doing anything else.** The invocation argument arrives as `ARGUMENTS`:

- **empty** (`/batch-deps-upgrade`) — run Steps 1-4, then **stop**. Do not continue into "Closing run" even though it appears further down; this mode writes nothing to JIRA or GitHub, only the working tree and local files.
- **`close`** (`/batch-deps-upgrade close`) — run **only** "Closing run" at the bottom. No discovery, no branch, no install, no lint. Normally used after the batch PR merges.
- **anything else** — stop and ask which was meant. Do not guess.

Requires `gh auth login` (if `gh` is not on `PATH`, try `/opt/homebrew/bin/gh`) and the Atlassian MCP. **Both are mandatory, in both modes.** Before doing anything else, confirm the Atlassian MCP is connected and authenticated (e.g. a cheap call such as listing accessible resources). If it is missing or unauthenticated, stop immediately and tell the user to connect it — do not fall back to a Dependabot-only run, since the batch would then miss ticket-driven upgrades and the closing run could close PRs without closing the matching tickets.

**Registry — always the public npm registry.** This is a public repo and `package-lock.json` must only reference `https://registry.npmjs.org/`. A user's `~/.npmrc` may point `registry=` at an internal mirror (e.g. Artifactory), and npm stamps that host into every `resolved` URL it writes. So pass `--registry=https://registry.npmjs.org/` on **every** npm command that resolves or fetches packages: `npm ci`, `npm install`, `npm update`, `npm view`, `npm ls`, `npm explain` and `npm audit`. Do not edit `~/.npmrc`. After any command that writes `package-lock.json`, check that every `resolved` URL points to the public registry:

```
jq -r '.packages[] | .resolved // empty' package-lock.json | grep -v '^https://registry.npmjs.org/' | grep -v '^packages/'
```

It must print nothing; workspace links (`packages/…`) are the only allowed exception. If anything else appears, a command ran without `--registry`: re-run it with the flag. Never hand-edit the URLs.

**Node version — match CI.** Use the version `actions/setup-node` pins in `.github/workflows/test.yml` (read it, don't assume). Every "under Node CI" below means that version.

## Step 1: Discover

Run:

```
gh pr list --repo XRPLF/typescript-style --author app/dependabot --state open --limit 500 --json number,title,headRefName,body,url
```

Only Dependabot-authored PRs are batched. Human-authored dependency PRs (e.g. a hand-written "Axios upgrade") are **never closed by this skill**; list them separately in the report as "Possibly superseded — human PR, close manually" when the batch covers the same package.

Parse each PR to extract package names and versions. Dependabot PRs come in two formats:

- **Single-package PRs**: title is `Bump <pkg> from <old> to <new>` — parse from the title.
- **Grouped PRs**: title is like `Bump the npm_and_yarn group across 1 directory with N updates` — parse from the markdown table at the top of the body (`| Package | From | To |`). The package cell is a markdown link; take the link text. Cross-check the row count against `N` in the title.

If any PR can't be parsed from either title or body, flag it for manual review. A grouped PR is closable only when **every** one of its rows ends Upgraded or No-op; if any row is Skipped, the whole grouped PR stays open.

Also fetch the Semgrep tickets per **Where the list comes from** under "Semgrep tickets" below, and add them to the same table. Report the combined table (source, package, from, asked for) to the user before proceeding.

## Step 2: Apply

1. Fetch and create a branch from `origin/master`: `deps/batch-deps-upgrade-YYYY-QN` (current year and quarter). If `.claude/skills/batch-deps-upgrade/` is not yet on `master` (first run, the skill still lives on a feature branch), branch from the current `HEAD` instead and say so in the report. Then run `npm ci --registry=https://registry.npmjs.org/` (Node CI) so `node_modules` matches the lockfile — a stale `node_modules` makes `npm ls` lie and can make lint fail on an untouched `master` (observed: `A config object is using the "parserOptions" key` from outdated plugins). `npm ci` installs exactly what the lockfile says, so it is not the "regenerate from scratch" forbidden in step 6.
2. Classify each package by **where it is declared**, because that decides what an upgrade is allowed to touch:
   - **Transitive** (only in `package-lock.json`): `npm update <pkg> --registry=https://registry.npmjs.org/` to move within the parents' declared ranges.
   - **Root devDependency** (`lerna`): update the range in the root `package.json`.
   - **eslint-config `dependencies` / `devDependencies`** (`confusing-browser-globals`, `eslint-find-rules`): update the range in `packages/eslint-config/package.json`.
   - **eslint-config `peerDependencies`**: see **Peer dependencies** below.
3. Check for **external peer dependency conflicts** before upgrading. Our own peer ranges are ours to change (see below), so they never block an upgrade. What blocks one is another package's peer range that we cannot change: e.g. a new `eslint-plugin-jsdoc` major that requires `eslint@^10` while `typescript-eslint` or `eslint-plugin-react` still only support `eslint@^9`. Check with `npm view <pkg>@<target> peerDependencies` against the other peers' supported ranges. Mark those Skipped (peer dep conflict: <details>).
4. Never add `overrides` or widen a parent's declared range to force a resolution — that risks breaking a parent which never declared support for the new version.
5. When an install can't reach its target, find the parent blocking it. If that parent is a **direct** dep we declare (in practice almost always `lerna`), bumping *it* is an ordinary upgrade rather than an override — try that, even across a major, and let Step 3 validate. Nothing else will surface it: a security ticket names the vulnerable package, never the parent pinning it, and Dependabot may have no PR open for it. `lerna` is known to pin `tar`, `js-yaml` and others exactly. Mark Skipped only when the blocker is transitive, or when bumping it fails validation. Check `lerna`'s own `engines.node` before taking a major — it must still support the Node version CI pins. If it does not, raising CI's Node is a decision for the user (it may also mean raising `@xrplf/eslint-config`'s `engines`, a breaking change): mark Skipped and say which Node version would unblock it.
6. Run `npm install --registry=https://registry.npmjs.org/` to update `package-lock.json`. **Do NOT delete `package-lock.json` or `node_modules` and regenerate from scratch** unless the user asks — that changes hoisting and resolution for packages nobody asked to move. Then run `npm ci --registry=https://registry.npmjs.org/` to prove the lockfile is self-consistent, exactly as CI will, and run the registry check from **Registry** above.
7. Diff `package.json` files and `package-lock.json` against `origin/master` to classify each Dependabot PR row **and each Semgrep ticket** as:
   - Upgraded: version changed and now meets the target
   - No-op: version was already at/above the target on `master`, or the package is no longer installed

   For tickets, see **Picking the target and matching results** under "Semgrep tickets" below — several tickets can share one install, and the match is per ticket.
8. If any change alters what consumers of `@xrplf/eslint-config` or `@xrplf/prettier-config` see (peer ranges, `dependencies`, `engines`, rule behaviour), add an entry under `## [Unreleased]` in that package's `CHANGELOG.md`, marking breaking changes with `[Breaking Change]` as the existing entries do. Lockfile-only and root-devDependency changes need no CHANGELOG entry.
9. Verify completeness: every PR row and every ticket from Step 1 must have a status (Upgraded, No-op, or Skipped). If any is unaccounted for, stop and report it before proceeding.

### Peer dependencies

`packages/eslint-config/package.json` `peerDependencies` is the contract with every consuming repo (xrpl.js, etc.): consumers install these packages themselves, in these ranges. This batch runs quarterly, and taking a new major of a peer is expected and allowed in any quarter — it simply makes the next `@xrplf/eslint-config` release a major one.

- **Within the current range** (e.g. `eslint-plugin-jsdoc` 52.0.1 → 52.4.0 under `^52.0.0`): `npm update <pkg> --registry=https://registry.npmjs.org/`. Lockfile only; no range change, no CHANGELOG entry.
- **New major** (e.g. `globals@17` vs `^16.0.0`, `eslint-plugin-jsdoc@61` vs `^52.0.0`), asked for by a Dependabot PR or a Semgrep ticket: take it. Set the peer range to the new major, then `npm install --registry=https://registry.npmjs.org/` so this repo's lockfile resolves it, and let Step 3 validate.
- **Range format — always `^X.0.0`.** Every peer range this skill writes is a caret on the major with a zero floor (`^61.0.0`, never `^61.2.3`), even when a ticket's fix version is `61.2.3`. That gives consumers the whole major to resolve within; they pick up the patched release through their own lockfile. Record the real fix version in the CHANGELOG entry and the PR tables so consumers know what to update to. Replace the old major rather than adding an alternative (`^61.0.0`, not `^52.0.0 || ^61.0.0`) — our rule files only need to work against one major. Leave ranges this batch does not touch as they are.
- **CHANGELOG** — add one `[Breaking Change]` line per peer major under `## [Unreleased]` in `packages/eslint-config/CHANGELOG.md`: `Upgrades peer dependency \`<pkg>\` from ^<old>.0.0 to ^<new>.0.0.`, plus a sentence on any rule renames, removals or behaviour changes consumers will see (see Step 3). Do not bump `version` in `package.json` — that happens at release time via `npx lerna publish`.
- Flag every peer major in the PR overview: it determines that the next release is a major.

## Step 3: Validate

Under Node CI, run in order:

1. `npm ci --registry=https://registry.npmjs.org/`, then the registry check from **Registry** above (must print nothing)
2. `npm run lint` — `packages/eslint-config` lints itself with its own `base.js` config, so this loads every peer plugin and parser and exercises the rules end to end.

If any step fails, **attempt to fix the breaking change before rolling back**. Common patterns in this repo:

- **Plugin renamed or removed a rule** (`Definition for rule '…' was not found`): update the rule name in `packages/eslint-config/rules/*.js` following the plugin's migration guide, and note it in the CHANGELOG — consumers will see it.
- **Plugin changed rule options schema** (`Configuration for rule '…' is invalid`): adjust the options to the new schema with equivalent behaviour.
- **New rule in a `recommended` preset now flags this package's own files**: fix the code if trivial, otherwise turn the rule off in the package-local `eslint.config.js` override only — never in the shared rule files without a CHANGELOG entry.
- **ESM-only dependency**: the package is already ESM (`"type": "module"`); use `import` rather than `require`.

Only roll back and mark as Skipped if:

- The fix would require redesigning our style rules rather than adapting them (e.g. a plugin dropped a rule the config is built around with no replacement) — that needs a human decision
- The upgrade is blocked by an external peer dependency constraint you cannot update

If a failure persists after investigation and you cannot identify a fix, roll back that upgrade and mark it Skipped. Re-run validation until green.

## Step 4: Generate Outputs

Do NOT commit or create a PR. Instead, generate the following outputs for the human to use. All three files are git-ignored.

**Formatting for every generated markdown file:** one line per paragraph and one line per list item — never hard-wrap prose mid-sentence. Blank line between blocks, no trailing whitespace.

1. **Code changes note** — `.claude/skills/batch-deps-upgrade/code-changes.md` documenting every change other than `package.json`/`package-lock.json` versions (rule files, eslint.config.js, CHANGELOG), explaining what broke, why, and the minimal fix applied. Write "None" if there were none.

2. **Commit message** — output a concise commit message the human can copy-paste. Format: `chore(deps): quarterly batch dependency upgrade YYYY-QN` followed by a brief summary of upgrades, peer majors, skips, and parent bumps.

3. **PR description** — `.claude/skills/batch-deps-upgrade/pr-description.md`. The repo has no PR template; use these sections:
   - `## High Level Overview of Change` — what was batched; that this is maintenance; whether consumers are affected or the change is dev-tooling/lockfile only. If any peer range moved to a new major, list each (`<pkg>`: `^old.0.0` → `^new.0.0`) and state that the next `@xrplf/eslint-config` release must be a major. Call out separately any **major** bump taken to unblock a ticket (e.g. `lerna`) — no PR or ticket asked for it, so a reviewer will not be expecting it.
   - `## Superseded Dependabot PRs` — table: PR (linked), Package, From, Asked for, Resolved, Status, MajorVersionUpgrade. One row per package, so a grouped PR gets one row per package it lists.
     - `From` is the version on `master`; `Asked for` is what the PR proposed or the ticket requires (`≥ x.y.z`, taken from the advisory when the ticket gives none — one per vulnerable major line; for such a ticket with no upgrade target, the advisory's affected range when it is No-op or has no fixed release, or `unknown` when the advisory gives no usable range); `Resolved` is what the lockfile actually holds after the batch. Keep them in separate columns: the three routinely differ.
     - Status values: Upgraded, No-op (reason), Skipped (peer dep conflict / CI failure: error) — a status and its reason, never a version number.
     - MajorVersionUpgrade: `No` if the major did not change. Otherwise `Yes` plus a link for each major crossed, e.g. 7.x → 9.x yields `Yes ([v8](url), [v9](url))`, pointing at release notes or the CHANGELOG. Verify each link returns HTTP 200 (`curl -sL -o /dev/null -w "%{http_code}" <url>`); fall back to CHANGELOG.md or the closest valid tag.
   - `## Semgrep tickets` — same columns, the first headed `Ticket` (linked to `https://ripplelabs.atlassian.net/browse/<KEY>`). Because `close-list.md` is not committed, this table is the closing run's fallback.
   - `## Additional upgrades` — ticket-driven or parent upgrades no Dependabot PR proposed, naming the motivating ticket. They are additions, not supersessions.
   - `## Closing` with two paragraphs:
     1. "After merging, run `/batch-deps-upgrade close` to close the superseded Dependabot PRs and the resolved Semgrep tickets." followed by the list of closable PRs (#X, #Y) and tickets.
     2. "The following were Skipped and remain open: #A (package-a), DGE-123 (package-b), …" — annotated with package and reason.
   - `## Test Plan` — the Step 3 commands run, the Node/npm versions, and their results.

4. **Close list** — `.claude/skills/batch-deps-upgrade/close-list.md`, the input to the closing run.

   1. **Close** — every closable ticket and PR, one per line, one shape for both:

      ```
      <ticket-key or #pr> | <package> | installed <resolved> (<asked for>) | Comment: "<text>"
      ```

      A grouped PR gets one line per package, all sharing the same `#pr` key; the closing run closes it only if every line for that key verifies.

      The third field must carry the **resolved** version, not the proposed one — that is what the closing run checks against `master`.

      A ticket whose fix version came from its advisory carries the advisory's affected range instead, so the closing run checks every installed line — and `not installed` when the package is gone: `installed 3.0.3 (outside < 3.0.3)`, `installed 5.7.2, 6.3.1 (outside < 5.7.2, 6.0.0–<6.3.1)`, `not installed (≤ 2.88.2)`.

      Every comment must reference the batch PR, which does not exist yet. Write that reference as the literal token `<PR>`; the closing run substitutes the merged PR's URL. Use a full URL rather than `#1234`, which JIRA renders as plain text.
   2. **Left open** — every Skipped item with its reason. Each is a security fix or upgrade that did not land.

Finish the run with a short report: the status table, Node/npm used, validation results, and paths to the three files. Then stop.

## Semgrep tickets

Treat each in-scope ticket as one more row in Step 1's table: a package plus a target version, carried through Steps 1-4 and classified Upgraded / No-op / Skipped like any Dependabot PR. Only the differences are below.

### Where the list comes from (Step 1)

Fetch open tickets via the Atlassian MCP (`searchJiraIssuesUsingJql`, cloud `ripplelabs.atlassian.net`):

```
parent = DGE-3869 AND project = DGE
AND status IN ("To Do", "in review", Blocked, "In Progress")
AND created >= "2022-01-01"
AND textfields ~ "typescript-style"
ORDER BY rank
```

Fetch summary, status and description for each. Keep only tickets that are actually about this repo — a full-text match on `typescript-style` can also hit tickets that merely mention it; drop any whose repository is clearly another one, and list them in the report as "excluded (other repo)".

**Take the package name from the summary, not the description** — a description may list several packages sharing one advisory, so it picks the wrong one. Take the fix version, severity and CVE/GHSA link from the description; if it gives no fix version, see the next paragraph. Wording varies, so read for intent rather than matching labels literally.

Keep every ticket that names a vulnerable package. Drop tickets that name no vulnerable package, such as code and configuration findings. A package ticket with no fix version is still a row: take the fix version from its advisory (the GHSA link) instead — for each installed major line inside the affected range, the first patched version on that line, or on a higher major if that line has none — and handle it like any other ticket. It is satisfied only when every installed version falls outside the advisory's affected range: No-op if that was already true on `master` or the package is no longer installed, Upgraded if the batch made it true. Mark it Skipped only when the advisory has no patched version at all ("no fixed release exists") or has no usable range ("flag for manual review") — both need a human decision. If tickets came back but none could be parsed, that is a parsing failure — stop. If the query returned nothing, or nothing was in scope, record zero and carry on with the Dependabot batch.

### Picking the target and matching results (Step 2)

Where a ticket and a PR both want the same install, the target is the **highest** version either wants. Three matching rules — get them wrong and you close tickets whose vulnerability is still installed:

- Compare with semver, never as strings — lexically `"7.5.9" > "7.5.21"`.
- Check the install the ticket means. One package can resolve at several versions at once (`brace-expansion` 1.x and 2.x, `js-yaml` 3.x and 4.x), so "any install ≥ target" can answer yes off an unrelated major line. Use `npm ls <pkg> --all` and match the install on the ticket's own major line. If that line is gone because the package moved to a **higher** major, the ticket is satisfied — provided the advisory's affected range does not extend into the new major.
- Match per ticket, not per package. Tickets sharing one install can want different versions. Never conclude "we upgraded X, so close the X tickets".

Classify from the Step 2.7 diff, not from which PR did what: a parent bump carries along dependencies it pins exactly, so a ticket can come out Upgraded with no PR naming its package (`lerna` → `nx` → `axios`).

### Non-goal

Never remove a dependency to resolve a finding. A transitive dep leaves only when its parent stops depending on it; a direct dep with no published fix needs whatever imported it rewritten, which belongs in a human-authored PR.

## Closing run (`/batch-deps-upgrade close`)

> **Runs only when `ARGUMENTS` is `close`.** If you reached this section by reading past Step 4 during a default run, stop here — everything below comments on and closes real JIRA tickets and real public PRs.

Runs none of Steps 1-4. That exclusion does **not** cover the per-item check in step 2 below — that one always runs, and it is the safeguard against closing something whose fix was reverted.

1. **Gather inputs.**
   - Read section 1 of `.claude/skills/batch-deps-upgrade/close-list.md`; if it is missing, fall back to the merged PR body's "Superseded Dependabot PRs" and "Semgrep tickets" tables (Upgraded and No-op rows only).
   - Identify the batch PR from an argument, or `gh pr list --repo XRPLF/typescript-style --state merged --search "head:deps/batch-deps-upgrade-" --json number,url,headRefName,mergedAt` (take the most recent). **If it is not merged, stop** — do not close anything for an open or closed-unmerged PR.
   - Replace the `<PR>` token in every comment with the PR's URL. **Check that no comment still contains `<PR>` before posting anything** — if one does, stop.
2. **Verify each item against the current `master`** and skip anything not genuinely satisfied — a reviewer may have reverted an upgrade. `git fetch origin master` and check `origin/master:package-lock.json` (e.g. `git show origin/master:package-lock.json | jq`, matching every `node_modules/**/<pkg>` entry), never the working tree. For a range-based item, verify that every installed version is still outside the range, or the package is still absent. A grouped Dependabot PR passes only if every line for it passes.
3. **Close everything that verified.** Do not ask for approval; the engineer reviewed both lists on the PR, and step 2 is the real check.
   - **JIRA tickets** — query available transitions, take the one to `Done`, transition first, then post the comment. This avoids open-but-commented tickets if the transition fails.
   - **Dependabot PRs** — `gh pr close <n> --repo XRPLF/typescript-style --comment "<comment>"`. Skip any that are already closed or merged, and say so.
4. Report in this shape:

   ```
   Batch PR: <url> (merged <date>), verified against master @ <sha>
   Closed <n> JIRA tickets, <n> Dependabot PRs.

   Skipped — not satisfied on master @ <sha> (<n>):
     <TICKET-KEY>   <pkg> needs <version>, master has <version>
     #<pr-number>   <pkg> <version> never applied (<reason from close-list>)
   ```

   If nothing was skipped, say so rather than omitting the section.
