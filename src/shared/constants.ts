export const APPLICATION = {
  ID: 'com.electron.gitchan',

  NAME: 'GitChan',

  EVENT_PREFIX: 'gitchan:',

  FIRST_RUN_FOLDER: 'gitchan-first-run',

  WEBSITE: 'https://gitchan.io',

  REPO_SLUG: 'gitchan-app/gitchan',

  DEFAULT_KEYBOARD_SHORTCUT: 'CommandOrControl+Shift+G',

  NOTIFICATION_SOUND: 'gitchan-notify.mp3',

  UPDATE_CHECK_INTERVAL_MS: 24 * 60 * 60 * 1000, // 24 hours

  UPDATE_NOT_AVAILABLE_DISPLAY_MS: 60 * 1000, // 60 seconds
};

// Notification type to sound file mapping
export const NOTIFICATION_SOUNDS = {
  review_requested: 'review-requested.wav',
  mention: 'mention.wav',
  team_mention: 'mention.wav',
  approval_requested: 'approved.wav',
  default: 'default.wav',
} as const;

export type NotificationSoundType = keyof typeof NOTIFICATION_SOUNDS;

// Live2D mascot models
export const MASCOT_MODELS = {
  hiyori: { id: 'hiyori', name: 'Hiyori', description: '밝고 활발한 여학생' },
  haru: { id: 'haru', name: 'Haru', description: '차분한 여성 캐릭터' },
  mao: { id: 'mao', name: 'Mao', description: '신비로운 마법사' },
  natori: { id: 'natori', name: 'Natori', description: '친근한 남성 캐릭터' },
  mark: { id: 'mark', name: 'Mark', description: '유쾌한 남성 캐릭터' },
  rice: { id: 'rice', name: 'Rice', description: '쿨한 마법사' },
  wanko: { id: 'wanko', name: 'Wanko', description: '충성스러운 강아지' },
} as const;

export type MascotModelId = keyof typeof MASCOT_MODELS;
export const DEFAULT_MASCOT_MODEL: MascotModelId = 'hiyori';
