/**
 * @type {import('electron-builder').Configuration}
 */
const config = {
  productName: 'GitChan',
  appId: 'com.electron.gitchan',
  copyright: 'Copyright © 2025 GitChan',
  asar: true,
  files: [
    'assets/images/*',
    'assets/sounds/*',
    'assets/live2d/**/*',
    'assets/lib/*',
    'build/**/*',
    'LICENSE',
    'node_modules/**/*',
    'package.json',
  ],
  electronLanguages: ['en'],
  protocols: [
    {
      name: 'GitChan',
      schemes: ['gitchan', 'gitchan-dev'],
    },
  ],
  mac: {
    category: 'public.app-category.developer-tools',
    icon: 'assets/images/app-icon.icns',
    identity: 'Adam Setch (5KD23H9729)',
    type: 'distribution',
    notarize: false, // Handle notarization in afterSign.js
    target: {
      target: 'default',
      arch: ['universal'],
    },
    hardenedRuntime: true,
    entitlements: 'assets/entitlements.mac.plist',
    entitlementsInherit: 'assets/entitlements.mac.plist',
    gatekeeperAssess: false,
  },
  dmg: {
    icon: 'assets/images/app-icon.icns',
    sign: false,
  },
  win: {
    target: 'nsis',
    icon: 'assets/images/app-icon.ico',
  },
  nsis: {
    oneClick: false,
  },
  linux: {
    target: ['AppImage', 'deb', 'rpm'],
    category: 'Development',
    maintainer: 'GitChan',
  },
  publish: {
    provider: 'github',
    owner: 'gitchan-app',
    repo: 'gitchan',
  },
  afterSign: 'scripts/afterSign.js',
  afterPack: 'scripts/afterPack.js',
};

module.exports = config;
