import { APPLICATION } from './constants';

const P = APPLICATION.EVENT_PREFIX;

export const EVENTS = {
  AUTH_CALLBACK: `${P}auth-callback`,
  QUIT: `${P}quit`,
  WINDOW_SHOW: `${P}window-show`,
  WINDOW_HIDE: `${P}window-hide`,
  VERSION: `${P}version`,
  UPDATE_ICON_COLOR: `${P}update-icon-color`,
  UPDATE_ICON_TITLE: `${P}update-icon-title`,
  USE_ALTERNATE_IDLE_ICON: `${P}use-alternate-idle-icon`,
  USE_UNREAD_ACTIVE_ICON: `${P}use-unread-active-icon`,
  UPDATE_KEYBOARD_SHORTCUT: `${P}update-keyboard-shortcut`,
  UPDATE_AUTO_LAUNCH: `${P}update-auto-launch`,
  SAFE_STORAGE_ENCRYPT: `${P}safe-storage-encrypt`,
  SAFE_STORAGE_DECRYPT: `${P}safe-storage-decrypt`,
  NOTIFICATION_SOUND_PATH: `${P}notification-sound-path`,
  NOTIFICATION_SOUND_PATH_BY_TYPE: `${P}notification-sound-path-by-type`,
  OPEN_EXTERNAL: `${P}open-external`,
  RESET_APP: `${P}reset-app`,
  UPDATE_THEME: `${P}update-theme`,
  TWEMOJI_DIRECTORY: `${P}twemoji-directory`,
  // GitChan Mascot Events
  MASCOT_NEW_NOTIFICATION: `${P}mascot-new-notification`,
  MASCOT_PLAY_SOUND: `${P}mascot-play-sound`,
  MASCOT_TOGGLE_VISIBILITY: `${P}mascot-toggle-visibility`,
  MASCOT_SET_ANIMATION: `${P}mascot-set-animation`,
  MASCOT_CHANGE_MODEL: `${P}mascot-change-model`,
  MASCOT_SET_SCALE: `${P}mascot-set-scale`,
  MASCOT_SET_BADGE_Y: `${P}mascot-set-badge-y`,
  MASCOT_SET_WINDOW_SCALE: `${P}mascot-set-window-scale`,
  MASCOT_GET_MODELS: `${P}mascot-get-models`,
} as const;

export type EventType = (typeof EVENTS)[keyof typeof EVENTS];

export interface IAutoLaunch {
  openAtLogin: boolean;
  openAsHidden: boolean;
}

export interface IKeyboardShortcut {
  enabled: boolean;
  keyboardShortcut: string;
}

export interface IOpenExternal {
  url: string;
  activate: boolean;
}

export interface IMascotNotification {
  type: string;
  message: string;
  count: number;
}

export type EventData =
  | string
  | number
  | boolean
  | IKeyboardShortcut
  | IAutoLaunch
  | IOpenExternal
  | IMascotNotification;
