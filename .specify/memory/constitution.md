<!--
Sync Impact Report
- Version change: template (unversioned) -> 1.0.0
- Modified principles: Converted generic principle placeholders into focused sections for a static web app (Purpose, Scope, Deliverables, Page basics, Build & Deploy, Quality, Security, Commits/PRs, Agent rules)
- Added sections: Minimal deliverables, Required page basics, Agent behavior rules
- Removed sections: Generic principle placeholders
- Templates requiring updates: 
  - .specify/templates/plan-template.md ✅ updated reference to Constitution Check (aligned)
  - .specify/templates/spec-template.md ⚠ pending (no mandatory changes required)
  - .specify/templates/tasks-template.md ⚠ pending (no mandatory changes required)
- Follow-up TODOs: RATIFICATION_DATE intentionally deferred
-->

# workshop-spec-kit Constitution

## Core Principles

### Purpose
This repository provides a lightweight workshop-spec-kit for creating static web
applications and interactive workshop materials. The Constitution captures the
minimum governance for delivering accessible, responsive, and maintainable
static sites generated from this template.

### Scope
Applies to all content and source under this repository that contributes to the
static web application (HTML, CSS, JS, assets, build scripts, and docs).
It does NOT govern external services, third-party hosting accounts, or private
secrets stored outside the repository.

### Minimal deliverables
The project MUST produce the following files at minimum when delivering a site:

- index.html
- README.md (project quickstart + build/deploy steps)
- /assets/* (images, fonts, icons as needed)
- styles.css (or styles/ directory with entry stylesheet)
- scripts.js (or scripts/ directory with entry script)
- /_headers or netlify.toml (optional hosting config) or equivalent
- LICENSE

Rationale: these files represent a self-contained static site that can be
previewed and deployed from the repository root.

### Required page basics
Pages MUST include the following basics:

- meta tags: viewport, charset, description, and title
- semantic structure: header, main, nav (if applicable), footer, and landmarks
- accessibility: proper alt text for images, labels for form controls,
  logical tab order, and ARIA roles only when necessary
- responsiveness: layout adapts to mobile and desktop breakpoints
- performance: avoid blocking large assets; prefer optimized images

Rationale: These items ensure the site is accessible, discoverable, and
usable across devices.

### Build & deploy guidance
- Provide a single documented build command (npm/yarn script or static build
  step) in README.md.
- Build artifacts MUST be produced under a documented directory (e.g., `dist/`)
  or be directly deployable from the repository root for simple hosts.
- Include minimal hosting config (Netlify, GitHub Pages, Vercel) examples in
  README.md to allow quick deployment.

Rationale: Clear build and deploy steps reduce onboarding friction.

### Quality checks
- Provide basic linting or formatting guidance (e.g., a reference to an .eslintrc,
  stylelint, Prettier, or a command in README). If the project includes JS/CSS,
  include lint scripts where reasonable.
- Recommend a CI workflow that at minimum installs dependencies and runs a
  build and (if present) any tests. A sample GitHub Actions workflow is
  encouraged but not required.

Rationale: Automated checks prevent regressions and keep the project
maintainable.

### Security & privacy rules
- NO secrets or credentials may be committed to the repository. Secrets MUST be
  stored in environment variables or a secrets manager outside the repo.
- Sanitize any user-provided content before including it in the site build.
- Avoid including third-party analytics or trackers without documenting and
  providing an opt-out for workshop participants.

Rationale: Protect user privacy and reduce accidental credential exposure.

### Commit & PR guidelines
- Use clear, concise commit messages. Prefer imperative style: `feat:`,
  `fix:`, `docs:`, `chore:` prefixes are encouraged.
- Each PR MUST have a short description of the change, a link to related
  issue/spec (if any), and list of manual steps to validate the change.
- Small, focused PRs are preferred. Large cross-cutting changes SHOULD be
  split into smaller PRs when practical.

Rationale: Consistent commits and PRs speed review and traceability.

### Agent behavior rules
Agents (automations or AI assistants) interacting with this repository
MUST follow these constraints:

- Make minimal, reversible changes: prefer creating new files or small edits
  rather than large unreviewed refactors.
- Do not inject secrets, credentials, or external account configuration.
- If the required scope or intent is unclear, the agent MUST ask a
  clarifying question before making substantive changes.
- Prefer suggestions and patches that are safe to apply and easy for a human
  reviewer to inspect.

Rationale: Keep automation safe, reviewable, and non-destructive.

## Governance
The Constitution is the authoritative guidance for repository-level practices.
Amendments require a documented PR describing the change, a brief rationale,
and at least one approving maintainer review.

- Versioning policy: MAJOR.MINOR.PATCH
  - MAJOR: incompatible governance changes (remove/rename principles)
  - MINOR: add a principle or materially expand guidance
  - PATCH: wording fixes, typos, clarifications

- Ratification: TODO(RATIFICATION_DATE): Original adoption date unknown.
- Last amended: 2026-01-06
- Version: 1.0.0

**Amendment procedure**: propose change → open PR with description → at least
one maintainer approval → merge. For MAJOR changes include a migration note.

**Compliance review**: PRs touching site structure, build, or security MUST
include a short checklist referencing this Constitution and indicate PASS/FAIL
for each relevant item.


<!-- End of constitution -->
