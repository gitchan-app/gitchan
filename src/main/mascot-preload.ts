import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('gitchanMascot', {
  onNewNotification: (
    callback: (data: { type: string; message: string; count: number }) => void,
  ) => {
    ipcRenderer.on('new-notification', (_, data) => callback(data));
  },
  onSetAnimation: (callback: (animation: string) => void) => {
    ipcRenderer.on('set-animation', (_, animation) => callback(animation));
  },
  onChangeModel: (callback: (modelId: string) => void) => {
    ipcRenderer.on('change-model', (_, modelId) => callback(modelId));
  },
  onSetScale: (callback: (scale: number) => void) => {
    ipcRenderer.on('set-scale', (_, scale) => callback(scale));
  },
  onSetBadgeY: (callback: (y: number) => void) => {
    ipcRenderer.on('set-badge-y', (_, y) => callback(y));
  },
  onSetWindowScale: (
    callback: (data: { width: number; height: number; scale: number }) => void,
  ) => {
    ipcRenderer.on('set-window-scale', (_, data) => callback(data));
  },
  playSound: () => {
    ipcRenderer.send('mascot-play-sound');
  },
});
