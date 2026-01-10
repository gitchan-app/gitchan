# Building GitChan

This guide explains how to build GitChan for different platforms.

## Prerequisites

Before building, ensure you have the following installed:

- **Node.js**: >= 24
- **pnpm**: >= 10.27.0
- **Git**: For cloning the repository

### Platform-Specific Requirements

#### macOS
- Xcode Command Line Tools: `xcode-select --install`
- For code signing: Apple Developer account and valid certificates

#### Windows
- Visual Studio Build Tools (for native modules)
- Windows SDK

#### Linux
- Build essentials: `sudo apt install build-essential`
- Additional dependencies for Electron: 
  ```bash
  sudo apt install libgtk-3-dev libnotify-dev libnss3 libxss1 libasound2
  ```

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/gitchan-app/gitchan.git
cd gitchan

# Install dependencies
pnpm install

# Build all components
pnpm build

# Package for your platform
pnpm package:macos   # macOS
pnpm package:win     # Windows
pnpm package:linux   # Linux
```

---

## Development Mode

For development with hot-reload:

```bash
# Terminal 1: Build and watch for changes
pnpm watch

# Terminal 2: Start the application
pnpm start
```

The `watch` command will automatically rebuild when you modify source files.

---

## Production Build

### Step 1: Build the Application

```bash
pnpm build
```

This compiles:
- Main process (`build/main.js`)
- Preload scripts (`build/preload.js`, `build/mascot-preload.js`)
- Renderer process (`build/renderer/`)

### Step 2: Package for Distribution

#### macOS

```bash
pnpm package:macos
```

Output files in `dist/`:
- `GitChan-{version}.dmg` - Disk image installer
- `GitChan-{version}-mac.zip` - Zipped app bundle
- `mac/GitChan.app` - Application bundle

**Code Signing (Optional)**

For distribution outside the Mac App Store, set environment variables:

```bash
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your_password
export APPLE_ID=your@email.com
export APPLE_APP_SPECIFIC_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

#### Windows

```bash
pnpm package:win
```

Output files in `dist/`:
- `GitChan Setup {version}.exe` - NSIS installer
- `GitChan-{version}-win.zip` - Portable version

**Code Signing (Optional)**

For signed Windows builds:

```bash
export WIN_CSC_LINK=/path/to/certificate.pfx
export WIN_CSC_KEY_PASSWORD=your_password
```

#### Linux

```bash
pnpm package:linux
```

Output files in `dist/`:
- `GitChan-{version}.AppImage` - Universal Linux executable
- `gitchan_{version}_amd64.deb` - Debian/Ubuntu package
- `gitchan-{version}.x86_64.rpm` - Fedora/RHEL package
- `gitchan-{version}.tar.gz` - Tarball

---

## Cross-Platform Building

### Building Windows from macOS

```bash
# Install Wine (optional, for some features)
brew install --cask wine-stable

# Build Windows version
pnpm package:win
```

### Building Linux from macOS

```bash
pnpm package:linux
```

### Building macOS from Other Platforms

Building macOS apps from Windows/Linux is **not recommended** due to:
- Code signing requirements
- macOS-specific frameworks
- Notarization requirements

---

## Build Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all components for production |
| `pnpm build:main` | Build main process only |
| `pnpm build:preload` | Build preload scripts only |
| `pnpm build:renderer` | Build renderer process only |
| `pnpm watch` | Build and watch for changes |
| `pnpm package:macos` | Package for macOS |
| `pnpm package:win` | Package for Windows |
| `pnpm package:linux` | Package for Linux |

---

## Build Configuration

Build configuration is located in:
- `config/electron-builder.js` - Electron Builder configuration
- `config/webpack.config.*.ts` - Webpack configurations

### Customizing the Build

To modify build settings, edit `config/electron-builder.js`:

```javascript
module.exports = {
  appId: 'com.electron.gitchan',
  productName: 'GitChan',
  // ... other settings
};
```

---

## Troubleshooting

### Common Issues

#### "Cannot find module" errors

```bash
# Clean and reinstall dependencies
pnpm clean
pnpm install
```

#### Native module compilation errors

```bash
# Rebuild native modules
pnpm rebuild
```

#### macOS: "App is damaged" warning

This occurs when the app is not signed. Either:
1. Sign the app with a valid certificate
2. Run: `xattr -cr /path/to/GitChan.app`

#### Windows: SmartScreen warning

This occurs with unsigned apps. Either:
1. Sign the app with a valid EV certificate
2. Users can click "More info" → "Run anyway"

#### Linux: AppImage won't run

```bash
chmod +x GitChan-*.AppImage
./GitChan-*.AppImage
```

### Build Logs

For verbose build output:

```bash
DEBUG=electron-builder pnpm package:macos
```

---

## CI/CD Integration

Example GitHub Actions workflow for automated builds:

```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, windows-latest, ubuntu-latest]

    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 10

      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm build
      - run: pnpm package:${{ matrix.os == 'macos-latest' && 'macos' || matrix.os == 'windows-latest' && 'win' || 'linux' }}

      - uses: actions/upload-artifact@v4
        with:
          name: dist-${{ matrix.os }}
          path: dist/*
```

---

## Release Checklist

Before releasing a new version:

1. Update version in `package.json`
2. Update `CHANGELOG.md` (if exists)
3. Run tests: `pnpm test`
4. Run linting: `pnpm lint:check`
5. Build and test on all target platforms
6. Create a git tag: `git tag v{version}`
7. Push tag: `git push origin v{version}`

---

## Additional Resources

- [Electron Builder Documentation](https://www.electron.build/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Code Signing Guide](https://www.electron.build/code-signing)
