import type { Reason } from '../../types';

export interface CuteMessage {
  message: string;
  emoji: string;
}

const CUTE_MESSAGES: Record<Reason, CuteMessage> = {
  review_requested: {
    message: 'GitChan이 알려드려요~ 새로운 리뷰 요청이에요!',
    emoji: '✨',
  },
  comment: {
    message: '누군가 코멘트를 남겼어요!',
    emoji: '💬',
  },
  approval_requested: {
    message: '승인 요청이 왔어요~ 확인해주세요!',
    emoji: '📋',
  },
  assign: {
    message: '새로운 작업이 할당됐어요! 화이팅!',
    emoji: '📌',
  },
  author: {
    message: '내가 만든 스레드에 업데이트가 있어요!',
    emoji: '✏️',
  },
  ci_activity: {
    message: 'CI/CD 작업이 완료됐어요!',
    emoji: '🔧',
  },
  invitation: {
    message: '새로운 초대가 왔어요~ 환영해요!',
    emoji: '💌',
  },
  manual: {
    message: '구독 중인 스레드가 업데이트됐어요!',
    emoji: '🔔',
  },
  member_feature_requested: {
    message: '새 기능 요청이 있어요!',
    emoji: '🌟',
  },
  mention: {
    message: '누가 나를 멘션했어요! 확인해볼까요?',
    emoji: '👋',
  },
  security_advisory_credit: {
    message: '보안 기여가 인정받았어요! 대단해요~',
    emoji: '🛡️',
  },
  security_alert: {
    message: '보안 알림이에요! 확인이 필요해요~',
    emoji: '🚨',
  },
  state_change: {
    message: '상태가 변경됐어요!',
    emoji: '🔄',
  },
  subscribed: {
    message: '구독 중인 저장소에 새 소식이에요!',
    emoji: '📢',
  },
  team_mention: {
    message: '우리 팀이 멘션됐어요! 같이 확인해요~',
    emoji: '👥',
  },
};

// Special messages for PR review states
export const PR_CUTE_MESSAGES = {
  approved: {
    message: 'PR 승인됐어요! 축하해요~!',
    emoji: '🎉',
  },
  changes_requested: {
    message: '수정 요청이 있어요~ 조금만 더 힘내요!',
    emoji: '💪',
  },
};

const DEFAULT_MESSAGE: CuteMessage = {
  message: '새로운 알림이 있어요~',
  emoji: '📬',
};

export function getCuteMessage(reason: Reason): CuteMessage {
  return CUTE_MESSAGES[reason] || DEFAULT_MESSAGE;
}

export function formatCuteNotification(reason: Reason): string {
  const cuteMsg = getCuteMessage(reason);
  return `${cuteMsg.message} ${cuteMsg.emoji}`;
}

export function formatMultipleNotifications(count: number): string {
  if (count <= 3) {
    return `${count}개의 알림이 있어요~ 확인해주세요! 💕`;
  }
  if (count <= 10) {
    return `알림이 ${count}개나 쌓였어요! 바쁘시네요~ 😊`;
  }
  return `와~ ${count}개의 알림! 인기 많으시네요~ ✨`;
}
