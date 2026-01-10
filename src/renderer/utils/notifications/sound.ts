import type { Percentage, Reason } from '../../types';

const MINIMUM_VOLUME_PERCENTAGE = 0 as Percentage;
const MAXIMUM_VOLUME_PERCENTAGE = 100 as Percentage;
const VOLUME_STEP = 10 as Percentage;

export async function raiseSoundNotification(volume: Percentage) {
  const path = await window.gitify.notificationSoundPath();

  const audio = new Audio(path);
  audio.volume = volumePercentageToLevel(volume);
  audio.play();
}

/**
 * Play notification sound based on notification type
 * First plays the base notification sound, then plays type-specific sound
 */
export async function raiseSoundNotificationByType(
  volume: Percentage,
  type: Reason,
) {
  const volumeLevel = volumePercentageToLevel(volume);

  // Play base notification sound first
  const basePath = await window.gitify.notificationSoundPath();
  const baseAudio = new Audio(basePath);
  baseAudio.volume = volumeLevel;

  // Play type-specific sound after base sound ends
  baseAudio.onended = async () => {
    const typePath = await window.gitify.notificationSoundPathByType(type);
    const typeAudio = new Audio(typePath);
    typeAudio.volume = volumeLevel;
    typeAudio.play();
  };

  baseAudio.play();
}

/**
 * Convert volume percentage (0-100) to level (0.0-1.0)
 */
export function volumePercentageToLevel(percentage: Percentage): number {
  return percentage / 100;
}

/**
 * Returns true if can decrease volume percentage further
 */
export function canDecreaseVolume(volumePercentage: Percentage) {
  return volumePercentage - VOLUME_STEP >= MINIMUM_VOLUME_PERCENTAGE;
}

/**
 * Returns true if can increase volume percentage further
 */
export function canIncreaseVolume(volumePercentage: Percentage) {
  return volumePercentage + VOLUME_STEP <= MAXIMUM_VOLUME_PERCENTAGE;
}

/**
 * Decrease volume by step amount
 */
export function decreaseVolume(volume: Percentage) {
  if (canDecreaseVolume(volume)) {
    return volume - VOLUME_STEP;
  }

  return MINIMUM_VOLUME_PERCENTAGE;
}

/**
 * Increase volume by step amount
 */
export function increaseVolume(volume: Percentage) {
  if (canIncreaseVolume(volume)) {
    return volume + VOLUME_STEP;
  }

  return MAXIMUM_VOLUME_PERCENTAGE;
}
