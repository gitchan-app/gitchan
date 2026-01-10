<div align="center">
  <img src="assets/images/gitchan.png" alt="GitChan" width="128">
  <p>귀여운 Live2D 마스코트와 함께하는 GitHub 알림 데스크톱 앱</p>
  <p>
    <a href="https://github.com/gitify-app/gitify"><img src="https://img.shields.io/badge/based%20on-Gitify-blue" alt="Based on Gitify"></a>
    <img src="https://img.shields.io/github/v/release/gitchan-app/gitchan" alt="Release">
    <img src="https://img.shields.io/github/license/gitchan-app/gitchan" alt="License">
    <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-blue" alt="Platform">
  </p>
</div>

---

**개인 및 비상업적 사용은 무료입니다.** 상업적 사용은 Live2D 라이선스가 필요합니다. 자세한 내용은 [라이선스](#라이선스)를 참조하세요.

GitChan은 [Gitify](https://github.com/gitify-app/gitify)를 기반으로 Live2D 캐릭터 지원을 추가하여 GitHub 알림 경험을 더욱 즐겁게 만들어주는 앱입니다.

![GitChan Preview](docs/preview.png)

---

## 다운로드

| 플랫폼 | 다운로드 |
|--------|----------|
| macOS | [GitChan-0.0.2-universal.dmg](https://github.com/gitchan-app/gitchan/releases/download/v0.0.2/GitChan-0.0.2-universal.dmg) |
| Windows | [GitChan-Setup-0.0.2.exe](https://github.com/gitchan-app/gitchan/releases/download/v0.0.2/GitChan-Setup-0.0.2.exe) |
| Linux | [GitChan-0.0.2.AppImage](https://github.com/gitchan-app/gitchan/releases/download/v0.0.2/GitChan-0.0.2.AppImage) |

모든 버전은 [Releases](https://github.com/gitchan-app/gitchan/releases) 페이지에서 확인하세요.

---

## 목차

- [다운로드](#다운로드)
- [기능](#기능)
- [설치](#설치)
- [실행 방법](#실행-방법)
- [사용 방법](#사용-방법)
- [Gitify에서 수정된 내용](#gitify에서-수정된-내용)
- [사용 기술 및 라이브러리](#사용-기술-및-라이브러리)
- [라이선스](#라이선스)
- [크레딧 및 출처](#크레딧-및-출처)
- [기여하기](#기여하기)

---

## 기능

- **Live2D 마스코트 캐릭터**: 7가지 Live2D 캐릭터 중 선택 가능
  - Hiyori - 밝고 활발한 여학생
  - Haru - 차분한 여성 캐릭터
  - Mao - 신비로운 마법사
  - Natori - 친근한 남성 캐릭터
  - Mark - 유쾌한 남성 캐릭터
  - Rice - 쿨한 마법사
  - Wanko - 충성스러운 강아지
- **실시간 GitHub 알림**: 리뷰, 멘션, 승인 등의 데스크톱 알림 수신
- **마스코트 커스터마이징**:
  - 캐릭터 선택
  - 마스코트 크기 조절 (50-150%)
  - 창 크기 조절 (50-200%)
  - 배지 위치 조절 (20-200px)
- **커스텀 알림 사운드**: 알림 유형별 다른 사운드
- **크로스 플랫폼 지원**: macOS, Windows, Linux에서 동작

---

## 설치

### 사전 요구사항

- Node.js >= 24
- pnpm >= 10.27.0

### 클론 및 설치

```bash
git clone https://github.com/gitchan-app/gitchan.git
cd gitchan
pnpm install
```

---

## 실행 방법

### 개발 모드

```bash
# 빌드 및 변경 감시
pnpm watch

# 다른 터미널에서 앱 실행
pnpm start
```

### 프로덕션 빌드

```bash
# 모든 컴포넌트 빌드
pnpm build

# 플랫폼별 패키징
pnpm package:macos   # macOS용
pnpm package:win     # Windows용
pnpm package:linux   # Linux용
```

### 테스트

```bash
pnpm test
```

### 린트

```bash
pnpm lint        # 린트 문제 수정
pnpm lint:check  # 린트 문제 확인
```

### 버전 관리

GitChan은 `npm version`을 사용하여 버전을 관리합니다. 이 명령어는 자동으로 `package.json`을 업데이트하고 git 태그를 생성합니다.

```bash
pnpm release:patch   # 버그 수정 (0.1.0 → 0.1.1)
pnpm release:minor   # 새 기능 추가 (0.1.0 → 0.2.0)
pnpm release:major   # 호환성 깨지는 변경 (0.1.0 → 1.0.0)
```

각 명령어는 다음을 수행합니다:

1. `package.json`의 버전 업데이트
2. `Release vX.X.X` 메시지로 git 커밋 생성
3. `vX.X.X` git 태그 생성

---

## 사용 방법

1. **GitChan 실행**: 설치 후 앱을 실행합니다
2. **GitHub 로그인**: OAuth를 통해 GitHub 계정으로 인증합니다
3. **설정 구성**:
   - 설정으로 이동하여 원하는 대로 커스터마이징합니다
   - 좋아하는 마스코트 캐릭터를 선택합니다
   - 마스코트 크기와 창 크기를 조절합니다
   - 알림 설정을 구성합니다
4. **알림 수신**: 마스코트가 애니메이션과 사운드로 GitHub 이벤트를 알려줍니다

### 마스코트 조작

- **마스코트 클릭**: 탭 애니메이션 실행
- **마스코트 크기 슬라이더**: 캐릭터 크기 조절 (50-150%)
- **창 크기 슬라이더**: 마스코트 창 크기 조절 (50-200%)
- **배지 위치 슬라이더**: 알림 배지 세로 위치 조절 (20-200px)

---

## Gitify에서 수정된 내용

GitChan은 Gitify에 다음과 같은 기능과 수정사항을 추가했습니다:

### 새로운 기능

1. **Live2D 마스코트 시스템**
   - pixi-live2d-display를 사용한 Live2D 캐릭터 표시
   - 마스코트 표시를 위한 투명 오버레이 창
   - 7가지 캐릭터 모델 지원
   - 알림에 따른 캐릭터 애니메이션

2. **마스코트 커스터마이징**
   - 설정에서 캐릭터 선택
   - 마스코트 크기 조절 (50-150%)
   - 창 크기 조절 (50-200%)
   - 알림 배지 위치 조절 (20-200px)

3. **커스텀 알림 사운드**
   - 알림 유형별 다른 사운드:
     - `review-requested.wav` - 리뷰 요청
     - `mention.wav` - 멘션 및 팀 멘션
     - `approved.wav` - 승인 요청
     - `default.wav` - 기타 알림
   - 볼륨 조절 버튼

4. **업그레이드된 SDK 지원**
   - MOC3 v5 모델 지원을 위한 Live2D Cubism 5 SDK

### 수정된 파일

- `src/main/mascot.ts` - 마스코트 창 관리
- `src/main/mascot.html` - Live2D 렌더링 및 캔버스 관리
- `src/main/mascot-preload.ts` - 마스코트 창 IPC 브릿지
- `src/shared/constants.ts` - 마스코트 모델 정의
- `src/shared/events.ts` - IPC 이벤트 정의
- `src/renderer/types.ts` - 설정 타입 정의
- `src/renderer/context/defaults.ts` - 기본 설정값
- `src/renderer/components/settings/SystemSettings.tsx` - 설정 UI
- `src/preload/index.ts` - 마스코트 API가 포함된 프리로드 스크립트

### 추가된 에셋

- `assets/live2d/` - Live2D 모델 파일 (Hiyori, Haru, Mao, Natori, Mark, Rice, Wanko)
- `assets/lib/` - Live2D SDK 및 의존성
  - `live2dcubismcore.min.js` - Cubism 5 Core SDK
  - `pixi.v6.min.js` - PixiJS v6
  - `pixi-live2d-display-cubism4.min.js` - Live2D 표시 플러그인
- `assets/sounds/` - 커스텀 알림 사운드 파일

---

## 사용 기술 및 라이브러리

### 핵심 프레임워크

| 라이브러리 | 버전 | 설명 |
|------------|------|------|
| [Electron](https://www.electronjs.org/) | 39.2.7 | 크로스 플랫폼 데스크톱 앱 프레임워크 |
| [React](https://react.dev/) | 19.2.3 | UI 컴포넌트 라이브러리 |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | 타입 안전 JavaScript |

### Live2D 통합

| 라이브러리 | 버전 | 설명 |
|------------|------|------|
| [Live2D Cubism SDK](https://www.live2d.com/en/sdk/about/) | 5.x | Live2D 핵심 렌더링 엔진 |
| [PixiJS](https://pixijs.com/) | 6.x | 2D WebGL 렌더러 |
| [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display) | - | PixiJS용 Live2D 모델 표시 |

### UI 컴포넌트

| 라이브러리 | 버전 | 설명 |
|------------|------|------|
| [Primer React](https://primer.style/react/) | 38.7.0 | GitHub 디자인 시스템 컴포넌트 |
| [Primer CSS](https://primer.style/css/) | 22.1.0 | GitHub 디자인 시스템 스타일 |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.18 | 유틸리티 우선 CSS 프레임워크 |

### 빌드 도구

| 라이브러리 | 버전 | 설명 |
|------------|------|------|
| [Webpack](https://webpack.js.org/) | 5.104.1 | 모듈 번들러 |
| [Babel](https://babeljs.io/) | 7.28.5 | JavaScript 컴파일러 |
| [electron-builder](https://www.electron.build/) | 26.4.0 | Electron 앱 패키저 |

### 테스트

| 라이브러리 | 버전 | 설명 |
|------------|------|------|
| [Jest](https://jestjs.io/) | 30.2.0 | 테스트 프레임워크 |
| [Testing Library](https://testing-library.com/) | 16.3.1 | React 테스트 유틸리티 |

---

## 라이선스

이 프로젝트는 **이중 라이선스 구조**를 사용합니다:

### 앱 코드 - MIT 라이선스

GitChan 앱 코드(Live2D 컴포넌트 제외)는 [MIT 라이선스](LICENSE)로 제공됩니다.

```text
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

### Live2D 컴포넌트 - Live2D 독점 라이선스

Live2D Cubism SDK와 샘플 모델은 **Live2D의 독점 라이선스**가 적용됩니다:

- **Live2D Cubism SDK**: [Live2D 독점 소프트웨어 라이선스 계약](https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html) 적용
- **샘플 모델**: [무료 소재 라이선스 계약](https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html) 적용

#### 상업적 사용에 대한 중요 안내

- **개인/비상업적 사용 무료**: GitChan을 개인, 교육, 비상업적 목적으로 자유롭게 사용할 수 있습니다
- **상업적 사용은 라이선스 필요**: GitChan을 상업적으로 사용하려면(Live2D가 정한 수익 기준 초과 시) [Live2D Inc.](https://www.live2d.com/)에서 별도 라이선스를 취득해야 합니다
- **Live2D SDK 라이선스**: 상업적 앱은 Live2D 라이선스 조건을 준수해야 합니다

Live2D 라이선스에 대한 자세한 정보: <https://www.live2d.com/en/sdk/license/>

### 알림 사운드 - 커스텀/로열티 프리

`assets/sounds/`의 모든 알림 사운드 파일은 **커스텀 제작**되었으며 **로열티 프리**입니다. 자유롭게 사용, 수정, 배포할 수 있습니다.

---

## 크레딧 및 출처

### Gitify

GitChan은 오픈소스 GitHub 알림 앱인 [Gitify](https://github.com/gitify-app/gitify)를 기반으로 합니다.

- **저장소**: <https://github.com/gitify-app/gitify>
- **웹사이트**: <https://gitify.io>
- **라이선스**: MIT License
- **저작권**: Gitify Contributors

훌륭한 기반을 만들어주신 Gitify 팀에 진심으로 감사드립니다.

### Live2D Inc

Live2D 기술과 샘플 모델은 [Live2D Inc.](https://www.live2d.com/)에서 제공합니다.

- **Cubism SDK**: <https://www.live2d.com/en/sdk/>
- **사용된 샘플 모델**:
  - Hiyori (무료 소재)
  - Haru (무료 소재)
  - Mao (무료 소재)
  - Natori (무료 소재)
  - Mark (무료 소재)
  - Rice (무료 소재)
  - Wanko (무료 소재)

### pixi-live2d-display

Live2D 모델 렌더링은 [pixi-live2d-display](https://github.com/guansss/pixi-live2d-display)를 사용합니다.

- **저장소**: <https://github.com/guansss/pixi-live2d-display>
- **제작자**: guansss
- **라이선스**: MIT License

### PixiJS

2D 렌더링은 [PixiJS](https://pixijs.com/)를 사용합니다.

- **저장소**: <https://github.com/pixijs/pixijs>
- **라이선스**: MIT License

### GitHub Primer

UI 컴포넌트는 [GitHub Primer](https://primer.style/)로 구축되었습니다.

- **저장소**: <https://github.com/primer>
- **라이선스**: MIT License

---

## 기여하기

기여를 환영합니다! Pull Request를 제출하기 전에 기여 가이드라인을 읽어주세요.

1. 저장소를 Fork합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

---

## 지원

문제가 발생하거나 질문이 있으시면:

- **Issues**: <https://github.com/gitchan-app/gitchan/issues>
- **Discussions**: <https://github.com/gitchan-app/gitchan/discussions>

---

GitChan Team이 ❤️를 담아 만들었습니다
