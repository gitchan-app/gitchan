import path from 'node:path';

import { BrowserWindow, ipcMain, screen } from 'electron';

import { EVENTS } from '../shared/events';

const BASE_MASCOT_WIDTH = 200;
const BASE_MASCOT_HEIGHT = 450;

let mascotWindow: BrowserWindow | null = null;
let currentWindowScale = 100;

export function createMascotWindow(): BrowserWindow {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().workAreaSize;

  const width = BASE_MASCOT_WIDTH;
  const height = BASE_MASCOT_HEIGHT;

  mascotWindow = new BrowserWindow({
    width,
    height,
    x: screenWidth - width - 20,
    y: screenHeight - height - 20,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'mascot-preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load the mascot HTML
  mascotWindow.loadFile(path.join(__dirname, 'mascot.html'));

  // Open DevTools for debugging (development only)
  if (process.env.NODE_ENV === 'development') {
    mascotWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // Make the window draggable by setting it as movable
  mascotWindow.setIgnoreMouseEvents(false);

  // Keep mascot always on top
  mascotWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  mascotWindow.on('closed', () => {
    mascotWindow = null;
  });

  return mascotWindow;
}

export function getMascotWindow(): BrowserWindow | null {
  return mascotWindow;
}

export function sendToMascot(channel: string, ...args: unknown[]): void {
  if (mascotWindow && !mascotWindow.isDestroyed()) {
    mascotWindow.webContents.send(channel, ...args);
  }
}

export function setupMascotEvents(): void {
  // Handle mascot animation changes
  ipcMain.on(EVENTS.MASCOT_SET_ANIMATION, (_, animation: string) => {
    sendToMascot('set-animation', animation);
  });

  // Handle mascot visibility toggle
  ipcMain.on(EVENTS.MASCOT_TOGGLE_VISIBILITY, () => {
    if (mascotWindow) {
      if (mascotWindow.isVisible()) {
        mascotWindow.hide();
      } else {
        mascotWindow.show();
      }
    }
  });

  // Handle mascot model change
  ipcMain.on(EVENTS.MASCOT_CHANGE_MODEL, (_, modelId: string) => {
    sendToMascot('change-model', modelId);
  });

  // Handle mascot scale change
  ipcMain.on(EVENTS.MASCOT_SET_SCALE, (_, scale: number) => {
    sendToMascot('set-scale', scale);
  });

  // Handle mascot badge Y position change
  ipcMain.on(EVENTS.MASCOT_SET_BADGE_Y, (_, y: number) => {
    sendToMascot('set-badge-y', y);
  });

  // Handle mascot window scale change
  ipcMain.on(EVENTS.MASCOT_SET_WINDOW_SCALE, (_, scale: number) => {
    setMascotWindowScale(scale);
  });
}

// Set mascot window scale (50-200%)
export function setMascotWindowScale(scale: number): void {
  if (!mascotWindow || mascotWindow.isDestroyed()) {
    return;
  }

  currentWindowScale = Math.max(50, Math.min(200, scale));
  const newWidth = Math.round(BASE_MASCOT_WIDTH * (currentWindowScale / 100));
  const newHeight = Math.round(BASE_MASCOT_HEIGHT * (currentWindowScale / 100));

  // Get current position
  const [currentX, currentY] = mascotWindow.getPosition();
  const [oldWidth, oldHeight] = mascotWindow.getSize();

  // Calculate new position to keep bottom-right corner in place
  const newX = currentX + oldWidth - newWidth;
  const newY = currentY + oldHeight - newHeight;

  mascotWindow.setSize(newWidth, newHeight);
  mascotWindow.setPosition(newX, newY);

  // Notify mascot.html to resize canvas
  sendToMascot('set-window-scale', {
    width: newWidth,
    height: newHeight,
    scale: currentWindowScale,
  });
}

// Change mascot model
export function changeMascotModel(modelId: string): void {
  sendToMascot('change-model', modelId);
}

// Notify mascot of new notifications
export function notifyMascot(
  type: string,
  message: string,
  count: number,
): void {
  sendToMascot('new-notification', { type, message, count });
}
