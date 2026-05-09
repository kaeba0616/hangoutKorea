import type { ChatListItemData } from '@/components/chat/ChatListItem';

export type ChatMessage = {
  id: string;
  from: 'me' | 'them';
  text: string;
  time: string;
  type?: 'text' | 'appointment';
  appointment?: {
    title: string;
    date: string;
    time: string;
    place: string;
  };
};

export const ACTIVE_CHATS: ChatListItemData[] = [
  {
    id: '1',
    name: 'William Johnson',
    preview: '오늘 온라인 카드 맞춤은 어떨까요?',
    time: '오후 2:30',
    unread: 1200,
    avatarColor: '#7B9EF2',
    initial: 'W',
  },
  {
    id: '2',
    name: '강민찬',
    preview: '어디든 데려가주세요! 약속 잡으면 좋아요',
    time: '오전 10:55',
    avatarColor: '#F2A07B',
    initial: '강',
  },
  {
    id: '3',
    name: '최지수, 어쥬미',
    preview: '몇 시에 출발?',
    time: '오전 10:30',
    unread: 34,
    avatarColor: '#A6D26A',
    initial: '최',
  },
  {
    id: '4',
    name: '김건재',
    preview: '벙구에서 4시 어때요?',
    time: '어제',
    unread: 3,
    avatarColor: '#9B7BC4',
    initial: '김',
  },
];

export const SCHEDULED_CHATS: ChatListItemData[] = [
  {
    id: '5',
    name: 'Emily Scott',
    preview: '안녕하세요!',
    time: '어제',
    unread: 2,
    avatarColor: '#E07BC4',
    initial: 'E',
  },
  {
    id: '6',
    name: 'Andrew Hill',
    preview: 'Hi',
    time: '어제',
    unread: 1,
    avatarColor: '#7BC4E0',
    initial: 'A',
  },
];

export const CHAT_NAMES: Record<string, string> = {
  '1': 'William Johnson',
  '2': '강민찬',
  '3': '최지수, 어쥬미',
  '4': '김건재',
  '5': 'Sarah',
  '6': 'Andrew Hill',
};

export const getChatName = (id: string | null | undefined): string =>
  (id && CHAT_NAMES[id]) || 'Sarah';

export const SARAH_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    from: 'them',
    text: '안녕하세요! 다음 주에 서울로 방문할 예정인데요. 강남 갈 만 한 곳 추천해주실 수 있나요?',
    time: '오전 10:24',
  },
  {
    id: '2',
    from: 'me',
    text: "Sure, I'll go with you! Is there anything you want to see in Gangnam?",
    time: '오전 10:30',
  },
  {
    id: '3',
    from: 'them',
    text: '음....',
    time: '오전 10:31',
  },
  {
    id: '4',
    from: 'me',
    type: 'appointment',
    text: '',
    time: '오전 10:33',
    appointment: {
      title: '벙커 약속을 만들었어요.',
      date: '2026.12.01 (월)',
      time: '13:00',
      place: '강남역 8번 출구',
    },
  },
  {
    id: '5',
    from: 'them',
    text: '안전한 만남을 위한 안내\n위 사진은 단순으로 모인다와 안전 가이드를 준수해야 합니다.\n맺는 약속은 다른 사용자도 직접 가다 문화에 맞춰 안전하길 바라요.',
    time: '오전 10:35',
  },
];

export const getChatMessages = (id: string | null | undefined): ChatMessage[] => {
  if (id === '5' || id === 'sarah') return SARAH_MESSAGES;
  return [];
};
