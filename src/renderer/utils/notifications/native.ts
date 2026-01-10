import { APPLICATION } from '../../../shared/constants';

import type { GitifyNotification } from '../../types';
import { generateGitHubWebUrl } from '../helpers';
import {
  formatCuteNotification,
  formatMultipleNotifications,
} from './cute-messages';

export async function raiseNativeNotification(
  notifications: GitifyNotification[],
) {
  let title: string;
  let body: string;
  let url: string = null;
  let mascotMessage: string;
  let mascotType: string;

  if (notifications.length === 1) {
    const notification = notifications[0];
    title = window.gitify.platform.isWindows()
      ? ''
      : notification.repository.fullName;
    body = notification.subject.title;
    url = await generateGitHubWebUrl(notification);

    // GitChan mascot cute message
    mascotType = notification.reason.code;
    mascotMessage = formatCuteNotification(notification.reason.code);
  } else {
    title = APPLICATION.NAME;
    body = `You have ${notifications.length} notifications`;

    // GitChan mascot cute message for multiple notifications
    mascotType = 'multiple';
    mascotMessage = formatMultipleNotifications(notifications.length);
  }

  // Notify GitChan mascot
  window.gitify.mascot.notify(mascotType, mascotMessage, notifications.length);

  return window.gitify.raiseNativeNotification(title, body, url);
}
