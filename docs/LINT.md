# Lint & Test Guide

GitChan uses [Biome](https://biomejs.dev/) for linting and formatting, and [Jest](https://jestjs.io/) for testing.

## Linting

```shell
# Check linting and formatting (read-only)
pnpm lint:check

# Auto-fix linting and formatting issues
pnpm lint
```

## Testing

```shell
# Run all tests
pnpm test

# Run tests with coverage
pnpm test --coverage

# Run tests in watch mode
pnpm test --watch

# Update snapshots after UI changes
pnpm test -u

# Run specific test file
pnpm test src/renderer/utils/links.test.ts

# Run tests matching a pattern
pnpm test --testNamePattern="should render"
```

## TypeScript Check

```shell
# Check TypeScript without emitting files
pnpm tsc --noEmit
```

## Pre-commit Hook

Husky runs `lint-staged` automatically on commit:
- All files: `biome check --fix`
- JS/TS files: Related tests are run automatically

## CI Workflow

GitHub Actions runs the following on every push:
1. `pnpm lint:check` - Linting
2. `pnpm tsc --noEmit` - TypeScript check
3. `pnpm test --coverage` - Tests with coverage
