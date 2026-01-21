<div align="center">
  <img src="assets/images/gitchan.png" alt="GitChan" width="128">
  <p>デスクトップで GitHub 通知を受け取るかわいい Live2D マスコット</p>
  <p>
    <a href="https://gitchan-app.github.io/gitchan/"><img src="https://img.shields.io/badge/Website-gitchan--app.github.io-purple" alt="Website"></a>
    <a href="https://github.com/gitify-app/gitify"><img src="https://img.shields.io/badge/based%20on-Gitify-blue" alt="Based on Gitify"></a>
    <img src="https://img.shields.io/github/v/release/gitchan-app/gitchan" alt="Release">
    <img src="https://img.shields.io/github/license/gitchan-app/gitchan" alt="License">
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue" alt="Platform">
  </p>
</div>

---

**個人利用および非商用利用は無料です。** 商用利用には Live2D ライセンスが必要です。詳細は[ライセンス](#ライセンス)をご覧ください。

GitChan は [Gitify](https://github.com/gitify-app/gitify) のフォークで、Live2D キャラクターサポートを追加し、GitHub 通知体験をより楽しくします。

![GitChan Preview](docs/preview.png)

---

## ダウンロード

| プラットフォーム | ダウンロード |
|----------|----------|
| macOS | [GitChan-0.0.3-universal.dmg](https://github.com/gitchan-app/gitchan/releases/download/v0.0.3/GitChan-0.0.3-universal.dmg) |
| Windows | [GitChan-Setup-0.0.3.exe](https://github.com/gitchan-app/gitchan/releases/download/v0.0.3/GitChan-Setup-0.0.3.exe) |
| Linux | [GitChan-0.0.3.AppImage](https://github.com/gitchan-app/gitchan/releases/download/v0.0.3/GitChan-0.0.3.AppImage) |

すべてのバージョンは[リリースページ](https://github.com/gitchan-app/gitchan/releases)からダウンロードできます。

---

## 目次

- [ダウンロード](#ダウンロード)
- [機能](#機能)
- [インストール時の注意事項](#インストール時の注意事項)
- [開発環境のセットアップ](#開発環境のセットアップ)
- [実行方法](#実行方法)
- [使い方](#使い方)
- [Gitify からの変更点](#gitify-からの変更点)
- [技術とライブラリ](#技術とライブラリ)
- [ライセンス](#ライセンス)
- [クレジットと帰属](#クレジットと帰属)
- [コントリビュート](#コントリビュート)

---

## 機能

- **Live2D マスコットキャラクター**: 7種類の Live2D キャラクターから選択可能
  - ひより - 元気な女子高生
  - はる - 落ち着いた女性キャラクター
  - マオ - 神秘的な魔法使い
  - なとり - フレンドリーな男性キャラクター
  - マーク - ユーモラスな男性キャラクター
  - ライス - クールな魔法使い
  - わんこ - 忠実な子犬
- **リアルタイム GitHub 通知**: レビュー、メンション、承認などのデスクトップ通知を受信
- **マスコット設定のカスタマイズ**:
  - キャラクター選択
  - マスコットサイズ調整（50-150%）
  - ウィンドウサイズ調整（50-200%）
  - バッジ位置調整（20-200px）
- **カスタム通知サウンド**: 通知タイプごとに異なるサウンド
- **クロスプラットフォーム対応**: macOS、Windows、Linux で動作

---

## インストール時の注意事項

### macOS

「アプリを開けません」または「一般的にダウンロードされていません」という警告が表示された場合：

1. **システム設定** → **プライバシーとセキュリティ** に移動
2. **このまま開く** をクリック

またはターミナルで以下を実行：
```bash
xattr -cr /Applications/GitChan.app
```

### Windows

**ブラウザのダウンロード警告（Edge/Chrome）：**

Edge で「一般的にダウンロードされていません」という警告が表示された場合：
1. ダウンロードの横にある **⋯**（三点リーダー）をクリック
2. **保持** → **保持する** をクリック

**SmartScreen 警告（インストーラー実行後）：**

「Windows によって PC が保護されました」と表示された場合：
1. **詳細情報** をクリック
2. **実行** をクリック

---

## 開発環境のセットアップ

### 前提条件

- Node.js >= 24
- pnpm >= 10.27.0

### クローンとインストール

```bash
git clone https://github.com/gitchan-app/gitchan.git
cd gitchan
pnpm install
```

---

## 実行方法

### 開発モード

```bash
# ビルドして変更を監視
pnpm watch

# 別のターミナルでアプリケーションを起動
pnpm start
```

### プロダクションビルド

```bash
# すべてのコンポーネントをビルド
pnpm build

# プラットフォーム用にパッケージ化
pnpm package:macos   # macOS 用
pnpm package:win     # Windows 用
pnpm package:linux   # Linux 用
```

### テスト

```bash
pnpm test
```

### リンティング

```bash
pnpm lint        # リンティング問題を修正
pnpm lint:check  # リンティング問題をチェック
```

### バージョン管理

GitChan はバージョン管理に `npm version` を使用します。これにより `package.json` が自動的に更新され、git タグが作成されます。

```bash
pnpm release:patch   # バグ修正 (0.1.0 → 0.1.1)
pnpm release:minor   # 新機能 (0.1.0 → 0.2.0)
pnpm release:major   # 破壊的変更 (0.1.0 → 1.0.0)
```

各コマンドは以下を実行します：

1. `package.json` のバージョンを更新
2. メッセージ `Release vX.X.X` で git コミットを作成
3. git タグ `vX.X.X` を作成

---

## 使い方

1. **GitChan を起動**: インストール後、アプリケーションを起動
2. **GitHub でログイン**: OAuth で GitHub アカウントを認証
3. **設定を構成**:
   - 設定に移動して体験をカスタマイズ
   - お気に入りのマスコットキャラクターを選択
   - マスコットサイズとウィンドウサイズを調整
   - 通知設定を構成
4. **通知を受信**: マスコットがアニメーションとサウンドで GitHub イベントを通知

### マスコット操作

- **マスコットをクリック**: タップアニメーションをトリガー
- **マスコットサイズスライダー**: キャラクターサイズを調整（50-150%）
- **ウィンドウサイズスライダー**: マスコットウィンドウサイズを調整（50-200%）
- **バッジ位置スライダー**: 通知バッジの垂直位置を調整（20-200px）

---

## Gitify からの変更点

GitChan は以下の機能と変更で Gitify を拡張しています：

### 新機能

1. **Live2D マスコットシステム**
   - pixi-live2d-display を使用した Live2D キャラクター表示
   - マスコット表示用の透明オーバーレイウィンドウ
   - 7種類のキャラクターモデルをサポート
   - 通知でトリガーされるキャラクターアニメーション

2. **マスコットカスタマイズ**
   - 設定でのキャラクター選択
   - マスコットサイズ調整（スケール 50-150%）
   - ウィンドウサイズ調整（スケール 50-200%）
   - 通知バッジ位置調整（20-200px）

3. **カスタム通知サウンド**
   - 通知タイプごとに異なるサウンド：
     - `review-requested.wav` - レビューリクエスト
     - `mention.wav` - メンションとチームメンション
     - `approved.wav` - 承認リクエスト
     - `default.wav` - その他の通知
   - 調整ボタンによるボリュームコントロール

4. **アップグレードされた SDK サポート**
   - MOC3 v5 モデルサポートのための Live2D Cubism 5 SDK

### 変更されたファイル

- `src/main/mascot.ts` - マスコットウィンドウ管理
- `src/main/mascot.html` - Live2D レンダリングとキャンバス管理
- `src/main/mascot-preload.ts` - マスコットウィンドウ用 IPC ブリッジ
- `src/shared/constants.ts` - マスコットモデル定義
- `src/shared/events.ts` - IPC イベント定義
- `src/renderer/types.ts` - 設定タイプ定義
- `src/renderer/context/defaults.ts` - デフォルト設定値
- `src/renderer/components/settings/SystemSettings.tsx` - 設定 UI
- `src/preload/index.ts` - マスコット API を含むプリロードスクリプト

### 追加されたアセット

- `assets/live2d/` - Live2D モデルファイル（Hiyori、Haru、Mao、Natori、Mark、Rice、Wanko）
- `assets/lib/` - Live2D SDK と依存関係
  - `live2dcubismcore.min.js` - Cubism 5 Core SDK
  - `pixi.v6.min.js` - PixiJS v6
  - `pixi-live2d-display-cubism4.min.js` - Live2D ディスプレイプラグイン
- `assets/sounds/` - カスタム通知サウンドファイル

---

## 技術とライブラリ

### コアフレームワーク

| ライブラリ | バージョン | 説明 |
|---------|---------|-------------|
| [Electron](https://www.electronjs.org/) | 39.2.7 | クロスプラットフォームデスクトップアプリフレームワーク |
| [React](https://react.dev/) | 19.2.3 | UI コンポーネントライブラリ |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | 型安全な JavaScript |

### Live2D 統合

| ライブラリ | バージョン | 説明 |
|---------|---------|-------------|
| [Live2D Cubism SDK](https://www.live2d.com/en/sdk/about/) | 5.x | コア Live2D レンダリングエンジン |
| [PixiJS](https://pixijs.com/) | 6.x | 2D WebGL レンダラー |
| [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) | - | PixiJS 用 Live2D モデルディスプレイ |

### UI コンポーネント

| ライブラリ | バージョン | 説明 |
|---------|---------|-------------|
| [Primer React](https://primer.style/react/) | 38.7.0 | GitHub のデザインシステムコンポーネント |
| [Primer CSS](https://primer.style/css/) | 22.1.0 | GitHub のデザインシステムスタイル |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.18 | ユーティリティファースト CSS フレームワーク |

### ビルドツール

| ライブラリ | バージョン | 説明 |
|---------|---------|-------------|
| [Webpack](https://webpack.js.org/) | 5.104.1 | モジュールバンドラー |
| [Babel](https://babeljs.io/) | 7.28.5 | JavaScript コンパイラ |
| [electron-builder](https://www.electron.build/) | 26.4.0 | Electron アプリパッケージャー |

### テスト

| ライブラリ | バージョン | 説明 |
|---------|---------|-------------|
| [Jest](https://jestjs.io/) | 30.2.0 | テストフレームワーク |
| [Testing Library](https://testing-library.com/) | 16.3.1 | React テストユーティリティ |

---

## ライセンス

このプロジェクトは**デュアルライセンス構造**を使用しています：

### アプリケーションコード - MIT ライセンス

GitChan アプリケーションコード（Live2D コンポーネントを除く）は [MIT ライセンス](LICENSE) の下でライセンスされています。

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

### Live2D コンポーネント - Live2D 独自ライセンス

Live2D Cubism SDK とサンプルモデルは **Live2D の独自ライセンス** に従います：

- **Live2D Cubism SDK**: [Live2D Proprietary Software License Agreement](https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html) に従う
- **サンプルモデル**: [Free Material License Agreement](https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html) に従う

#### 商用利用に関する重要な注意事項

- **個人/非商用利用は無料**: 個人、教育、または非商用目的で GitChan を自由に使用できます
- **商用利用にはライセンスが必要**: GitChan を商用で使用する場合（Live2D が指定するしきい値を超える収益がある場合）、[Live2D Inc.](https://www.live2d.com/) から別途ライセンスを取得する必要があります
- **Live2D SDK ライセンス**: 商用アプリケーションは Live2D のライセンス条項に準拠する必要があります

Live2D ライセンスの詳細については、https://www.live2d.com/en/sdk/license/ をご覧ください。

### 通知サウンド - カスタム/ロイヤリティフリー

`assets/sounds/` 内のすべての通知サウンドファイルは**カスタム作成**および**ロイヤリティフリー**です。これらのサウンドは自由に使用、変更、配布できます。

---

## クレジットと帰属

### Gitify

GitChan は [Gitify](https://github.com/gitify-app/gitify)（オープンソースの GitHub 通知アプリ）をベースにしています。

- **リポジトリ**: https://github.com/gitify-app/gitify
- **ウェブサイト**: https://gitify.io
- **ライセンス**: MIT License
- **著作権**: Gitify Contributors

このような優れた基盤を作成してくださった Gitify チームに心から感謝いたします。

### Live2D Inc.

Live2D 技術とサンプルモデルは [Live2D Inc.](https://www.live2d.com/) によって提供されています。

- **Cubism SDK**: https://www.live2d.com/en/sdk/
- **使用されているサンプルモデル**:
  - Hiyori（フリー素材）
  - Haru（フリー素材）
  - Mao（フリー素材）
  - Natori（フリー素材）
  - Mark（フリー素材）
  - Rice（フリー素材）
  - Wanko（フリー素材）

### pixi-live2d-display

Live2D モデルレンダリングは [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) によって動作しています。

- **リポジトリ**: https://github.com/guansss/pixi-live2d-display
- **作者**: guansss
- **ライセンス**: MIT License

### PixiJS

2D レンダリングは [PixiJS](https://pixijs.com/) によって動作しています。

- **リポジトリ**: https://github.com/pixijs/pixijs
- **ライセンス**: MIT License

### GitHub Primer

UI コンポーネントは [GitHub Primer](https://primer.style/) で構築されています。

- **リポジトリ**: https://github.com/primer
- **ライセンス**: MIT License

---

## コントリビュート

コントリビュートを歓迎します！プルリクエストを送信する前に、コントリビュートガイドラインをお読みください。

1. リポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを開く

---

## サポート

問題が発生した場合や質問がある場合：

- **Issues**: https://github.com/gitchan-app/gitchan/issues
- **Discussions**: https://github.com/gitchan-app/gitchan/discussions

---

Made with ❤️ by the GitChan Team
