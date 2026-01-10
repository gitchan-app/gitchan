# GitChan Contributing Guide

Hi! We're really excited that you're interested in contributing to GitChan! Before submitting your contribution, please read through the following guide.

### Installation

To get started, you'll need to clone the repository and install the dependencies.

```shell
pnpm install
```

### Development

> [!TIP]
> _Optional: If you prefer to use your own OAuth credentials, you can do so by passing them as environment variables when bundling the app._
> ```shell
> OAUTH_CLIENT_ID="123" OAUTH_CLIENT_SECRET="456789" pnpm build
> ```

Copy the `.env.template` to `.env` and update `GITHUB_TOKEN` with a GitHub Personal Access Token. This is used for fetching the latest GitHub GraphQL API schema for `graphql-codegen`.
```shell
GITHUB_TOKEN=<some personal access token>
```

To watch for changes (`webpack`) in the `src` directory:

```shell
pnpm watch
```

To run the **electron app**:

```shell
pnpm start
```

To reload the app with the changes that `pnpm watch` has detected, you can use the `CmdOrCtrl+R` shortcut.

### Tests

There are 2 checks:
1. linter & formatter with [biome][biome-website]
2. unit tests with [jest][jest-website]

```shell
# Run biome to check linting and formatting
pnpm lint:check

# Run unit tests with coverage
pnpm test

# Update jest snapshots
pnpm test -u
```

### Releases

The release process is automated using GitHub Actions.

1. Verify that all features you want targeted in the release have been merged to `main`.
2. Use one of the version scripts to bump and tag:

   ```shell
   pnpm release:patch  # 0.0.1 -> 0.0.2
   pnpm release:minor  # 0.0.1 -> 0.1.0
   pnpm release:major  # 0.0.1 -> 1.0.0
   ```

3. Push the tag to trigger the release workflow:

   ```shell
   git push origin main --tags
   ```

4. GitHub Actions will automatically build and publish releases for macOS, Windows, and Linux.

### Design Guidelines

1. Use sentence case where possible
2. Use GitHub's [Octicons][github-octicons] for iconography

<!-- LINK LABELS -->
[biome-website]: https://biomejs.dev/
[github-octicons]: https://primer.style/foundations/icons
[jest-website]: https://jestjs.io/
