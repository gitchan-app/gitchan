<div align="center">
  <img src="assets/images/gitchan.png" alt="GitChan" width="128">
  <p>A cute Live2D mascot for GitHub notifications on your desktop</p>
  <p>
    <a href="https://github.com/gitify-app/gitify"><img src="https://img.shields.io/badge/based%20on-Gitify-blue" alt="Based on Gitify"></a>
    <img src="https://img.shields.io/github/v/release/gitchan-app/gitchan" alt="Release">
    <img src="https://img.shields.io/github/license/gitchan-app/gitchan" alt="License">
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue" alt="Platform">
  </p>
</div>

---

**Free for personal and non-commercial use.** Commercial use requires a Live2D license. See [License](#license) for details.

GitChan is a fork of [Gitify](https://github.com/gitify-app/gitify), enhanced with Live2D character support to make your GitHub notification experience more delightful.

![GitChan Preview](docs/preview.png)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [How to Use](#how-to-use)
- [Modifications from Gitify](#modifications-from-gitify)
- [Technologies & Libraries](#technologies--libraries)
- [License](#license)
- [Credits & Attributions](#credits--attributions)
- [Contributing](#contributing)

---

## Features

- **Live2D Mascot Characters**: Choose from 7 different Live2D characters
  - Hiyori - Cheerful schoolgirl
  - Haru - Calm female character
  - Mao - Mysterious wizard
  - Natori - Friendly male character
  - Mark - Humorous male character
  - Rice - Cool wizard
  - Wanko - Loyal puppy
- **Real-time GitHub Notifications**: Receive desktop notifications for reviews, mentions, approvals, and more
- **Customizable Mascot Settings**:
  - Character selection
  - Mascot size adjustment (50-150%)
  - Window size adjustment (50-200%)
  - Badge position adjustment (20-200px)
- **Custom Notification Sounds**: Different sounds for different notification types
- **Cross-platform Support**: Works on macOS, Windows, and Linux

---

## Installation

### Prerequisites

- Node.js >= 24
- pnpm >= 10.27.0

### Clone and Install

```bash
git clone https://github.com/gitchan-app/gitchan.git
cd gitchan
pnpm install
```

---

## How to Run

### Development Mode

```bash
# Build and watch for changes
pnpm watch

# In another terminal, start the application
pnpm start
```

### Production Build

```bash
# Build all components
pnpm build

# Package for your platform
pnpm package:macos   # For macOS
pnpm package:win     # For Windows
pnpm package:linux   # For Linux
```

### Testing

```bash
pnpm test
```

### Linting

```bash
pnpm lint        # Fix linting issues
pnpm lint:check  # Check for linting issues
```

### Version Management

GitChan uses `npm version` for version management. This automatically updates `package.json` and creates a git tag.

```bash
pnpm release:patch   # Bug fixes (0.1.0 → 0.1.1)
pnpm release:minor   # New features (0.1.0 → 0.2.0)
pnpm release:major   # Breaking changes (0.1.0 → 1.0.0)
```

Each command will:

1. Update the version in `package.json`
2. Create a git commit with message `Release vX.X.X`
3. Create a git tag `vX.X.X`

---

## How to Use

1. **Launch GitChan**: After installation, launch the application
2. **Login with GitHub**: Authenticate with your GitHub account via OAuth
3. **Configure Settings**:
   - Go to Settings to customize your experience
   - Select your favorite mascot character
   - Adjust mascot size and window size
   - Configure notification preferences
4. **Receive Notifications**: The mascot will notify you of GitHub events with animations and sounds

### Mascot Controls

- **Click on mascot**: Triggers a tap animation
- **Mascot Size slider**: Adjust the character size (50-150%)
- **Window Size slider**: Adjust the mascot window size (50-200%)
- **Badge Position slider**: Adjust notification badge vertical position (20-200px)

---

## Modifications from Gitify

GitChan extends Gitify with the following features and modifications:

### New Features

1. **Live2D Mascot System**
   - Added Live2D character display using pixi-live2d-display
   - Transparent overlay window for mascot display
   - Support for 7 different character models
   - Character animations triggered by notifications

2. **Mascot Customization**
   - Character selection in settings
   - Mascot size adjustment (scale 50-150%)
   - Window size adjustment (scale 50-200%)
   - Notification badge position adjustment (20-200px)

3. **Custom Notification Sounds**
   - Different sounds for different notification types:
     - `review-requested.wav` - Review requests
     - `mention.wav` - Mentions and team mentions
     - `approved.wav` - Approval requests
     - `default.wav` - Other notifications
   - Volume control with adjustment buttons

4. **Upgraded SDK Support**
   - Live2D Cubism 5 SDK for MOC3 v5 model support

### Modified Files

- `src/main/mascot.ts` - Mascot window management
- `src/main/mascot.html` - Live2D rendering and canvas management
- `src/main/mascot-preload.ts` - IPC bridge for mascot window
- `src/shared/constants.ts` - Mascot model definitions
- `src/shared/events.ts` - IPC event definitions
- `src/renderer/types.ts` - Settings type definitions
- `src/renderer/context/defaults.ts` - Default settings values
- `src/renderer/components/settings/SystemSettings.tsx` - Settings UI
- `src/preload/index.ts` - Preload script with mascot API

### Added Assets

- `assets/live2d/` - Live2D model files (Hiyori, Haru, Mao, Natori, Mark, Rice, Wanko)
- `assets/lib/` - Live2D SDK and dependencies
  - `live2dcubismcore.min.js` - Cubism 5 Core SDK
  - `pixi.v6.min.js` - PixiJS v6
  - `pixi-live2d-display-cubism4.min.js` - Live2D display plugin
- `assets/sounds/` - Custom notification sound files

---

## Technologies & Libraries

### Core Framework

| Library | Version | Description |
|---------|---------|-------------|
| [Electron](https://www.electronjs.org/) | 39.2.7 | Cross-platform desktop app framework |
| [React](https://react.dev/) | 19.2.3 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Type-safe JavaScript |

### Live2D Integration

| Library | Version | Description |
|---------|---------|-------------|
| [Live2D Cubism SDK](https://www.live2d.com/en/sdk/about/) | 5.x | Core Live2D rendering engine |
| [PixiJS](https://pixijs.com/) | 6.x | 2D WebGL renderer |
| [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) | - | Live2D model display for PixiJS |

### UI Components

| Library | Version | Description |
|---------|---------|-------------|
| [Primer React](https://primer.style/react/) | 38.7.0 | GitHub's design system components |
| [Primer CSS](https://primer.style/css/) | 22.1.0 | GitHub's design system styles |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.18 | Utility-first CSS framework |

### Build Tools

| Library | Version | Description |
|---------|---------|-------------|
| [Webpack](https://webpack.js.org/) | 5.104.1 | Module bundler |
| [Babel](https://babeljs.io/) | 7.28.5 | JavaScript compiler |
| [electron-builder](https://www.electron.build/) | 26.4.0 | Electron app packager |

### Testing

| Library | Version | Description |
|---------|---------|-------------|
| [Jest](https://jestjs.io/) | 30.2.0 | Testing framework |
| [Testing Library](https://testing-library.com/) | 16.3.1 | React testing utilities |

---

## License

This project uses a **dual-license structure**:

### Application Code - MIT License

The GitChan application code (excluding Live2D components) is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) GitChan Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

### Live2D Components - Live2D Proprietary License

The Live2D Cubism SDK and sample models are subject to **Live2D's proprietary licenses**:

- **Live2D Cubism SDK**: Subject to the [Live2D Proprietary Software License Agreement](https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html)
- **Sample Models**: Subject to the [Free Material License Agreement](https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html)

#### Important Notes for Commercial Use

- **Free for Personal/Non-commercial Use**: You can use GitChan freely for personal, educational, or non-commercial purposes
- **Commercial Use Requires License**: If you plan to use GitChan commercially (with revenue exceeding the threshold specified by Live2D), you must obtain a separate license from [Live2D Inc.](https://www.live2d.com/)
- **Live2D SDK License**: Commercial applications must comply with Live2D's licensing terms

For more information about Live2D licensing, visit: https://www.live2d.com/en/sdk/license/

### Notification Sounds - Custom/Royalty-Free

All notification sound files in `assets/sounds/` are **custom-created** and **royalty-free**. You may use, modify, and distribute these sounds freely.

---

## Credits & Attributions

### Gitify

GitChan is based on [Gitify](https://github.com/gitify-app/gitify), an open-source GitHub notification app.

- **Repository**: https://github.com/gitify-app/gitify
- **Website**: https://gitify.io
- **License**: MIT License
- **Copyright**: Gitify Contributors

We express our sincere gratitude to the Gitify team for creating such an excellent foundation.

### Live2D Inc.

Live2D technology and sample models are provided by [Live2D Inc.](https://www.live2d.com/)

- **Cubism SDK**: https://www.live2d.com/en/sdk/
- **Sample Models Used**:
  - Hiyori (Free Material)
  - Haru (Free Material)
  - Mao (Free Material)
  - Natori (Free Material)
  - Mark (Free Material)
  - Rice (Free Material)
  - Wanko (Free Material)

### pixi-live2d-display

Live2D model rendering is powered by [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display).

- **Repository**: https://github.com/guansss/pixi-live2d-display
- **Author**: guansss
- **License**: MIT License

### PixiJS

2D rendering is powered by [PixiJS](https://pixijs.com/).

- **Repository**: https://github.com/pixijs/pixijs
- **License**: MIT License

### GitHub Primer

UI components are built with [GitHub Primer](https://primer.style/).

- **Repository**: https://github.com/primer
- **License**: MIT License

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Support

If you encounter any issues or have questions:

- **Issues**: https://github.com/gitchan-app/gitchan/issues
- **Discussions**: https://github.com/gitchan-app/gitchan/discussions

---

Made with ❤️ by the GitChan Team
