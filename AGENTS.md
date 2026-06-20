# AGENTS.md
## 1. Project Overview

This repository is a production-grade software project.

Before making changes:

* Read this file carefully.
* Prefer small, focused changes.
* Preserve existing architecture and conventions.
* Do not introduce new dependencies, frameworks, or major patterns unless explicitly requested.

## 2. Tech Stack

Update this section for the project.

* Language: JavaScript
* Runtime: Node.js
* Framework: React with Vite
* Package manager: npm
* Database: none
* Testing: Node-based verification scripts in `scripts/`
* Linting / formatting: ESLint
* Deployment: Firebase Hosting static site

## 3. Repository Structure

```text
.
├── src/                  # Main application code
├── docs/                 # Documentation
├── scripts/              # Utility scripts
├── content/              # Source/reference content
├── public/               # Static assets
└── package.json
```

Important directories:

* `src/`: production code
* `docs/`: project documentation
* `scripts/`: Node verification and automation scripts
* `content/`: source/reference content for future content workflows

## 4. Commands

Use the project’s package manager.

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run lint
npm run lint

# Run type check
# No typecheck script exists in this JavaScript project.

# Build
npm run build
```

If a command fails because it does not exist, inspect the project config and use the closest available command.

## 5. Coding Standards

General rules:

* Keep changes minimal and targeted.
* Prefer readability over cleverness.
* Follow existing naming, file organization, and code style.
* Avoid broad refactors unless explicitly requested.
* Do not mix unrelated changes in one task.
* Add comments only when they explain non-obvious decisions.

TypeScript / JavaScript:

* Prefer explicit types for public APIs.
* Avoid `any` unless there is a clear reason.
* Prefer pure functions where practical.
* Keep components and functions small.
* Reuse existing utilities before creating new ones.

React / UI:

* Follow existing component patterns.
* Keep UI state local unless shared state is necessary.
* Preserve accessibility semantics.
* Avoid unnecessary re-renders and premature abstraction.

Backend / API:

* Validate inputs at boundaries.
* Handle errors explicitly.
* Avoid leaking internal error details to users.
* Keep database access patterns consistent with the existing codebase.

## 6. Testing Guidelines

When changing behavior:

* Add or update tests.
* Prefer tests that verify user-visible behavior.
* Cover edge cases and failure paths when relevant.
* Do not remove tests unless they are obsolete and the reason is clear.

Before completing a task, run the most relevant checks:

```bash
npm run lint
npm test
npm run build
```

If full test suites are expensive, run the smallest relevant subset first and explain what was run.

## 7. Git / Change Management

When editing:

* Do not rewrite unrelated files.
* Do not reformat entire files unless requested.
* Do not change lockfiles unless dependencies actually changed.
* Do not modify generated files unless the source change requires it.
* Keep diffs easy to review.

Commit style, if asked to commit:

* Use concise, descriptive commit messages.
* Prefer conventional style when already used.

Examples:

```text
fix: handle empty search results
feat: add user profile settings
refactor: simplify auth middleware
test: cover payment retry behavior
```

## 8. Security Rules

Never:

* Commit secrets, API keys, tokens, private keys, or credentials.
* Log sensitive user data.
* Disable authentication, authorization, CSRF, validation, or rate limiting without explicit instruction.
* Introduce unsafe shell execution or SQL injection risks.
* Add dependencies with known security issues when avoidable.

Always:

* Use environment variables for secrets.
* Validate and sanitize external input.
* Preserve existing security controls.
* Treat user data as private.

## 9. Dependency Policy

Before adding a dependency:

* Check whether the project already has a suitable utility.
* Prefer standard library or existing dependencies.
* Add a new dependency only when it materially improves maintainability.
* Explain why the dependency is needed.

Do not upgrade major versions unless explicitly requested.

## 10. Documentation

Update documentation when:

* Public APIs change.
* Setup steps change.
* Commands change.
* Behavior changes in a way users or developers need to know.

Prefer concise docs with examples.

## 11. Task Workflow for Codex

For each task:

1. Understand the request.
2. Inspect relevant files before editing.
3. Identify the smallest safe change.
4. Make the change.
5. Run relevant checks.
6. Summarize:

   * What changed
   * Why it changed
   * What was tested
   * Any remaining risks or follow-ups

If the request is ambiguous:

* Make a reasonable assumption.
* State the assumption briefly.
* Continue with the safest useful implementation.

## 12. When Not to Change Code

Do not make code changes when:

* The task only asks for explanation or investigation.
* The requested change would be destructive.
* The change requires secrets or access not available.
* The implementation would be speculative without enough context.

In those cases, explain findings and suggest the next concrete step.

## 13. Project-Specific Rules

Add rules that are unique to this repository.

Examples:

* All API routes must use `src/lib/api/handler.ts`.
* All database queries must go through `src/server/db`.
* UI components must use the design system in `src/components/ui`.
* Do not edit files in `generated/` directly.
* Use server actions only for mutations.
* Prefer Zod schemas for request validation.

## 14. Definition of Done

A task is done when:

* The requested behavior is implemented.
* Relevant tests pass.
* Lint/type checks pass, or failures are explained.
* The diff is minimal and reviewable.
* No unrelated files were changed.
* The final response clearly explains the change.
